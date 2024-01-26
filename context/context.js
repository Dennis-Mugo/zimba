import { createContext, useEffect, useState } from "react";
import { GOOGLE_SIGNIN_CLIENT_ID, MAPS_API_KEY } from "../constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { default as nativeAuth } from "@react-native-firebase/auth";
import { signOut } from "firebase/auth";
import OpenAI from "openai";
import { process } from "../zimba.algo/env";
import { v4 } from "uuid";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { checkIfLocationRequested } from "../zimba.algo/stories.zimba.algo";

export const ZimbaContext = createContext();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const ZimbaProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [conversationList, setConversationList] = useState();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocationPermission = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("not granted");
      setErrorMsg("Permission to access location was denied");
      return false;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    let permitted = await getLocationPermission();
    if (!permitted) return false;
    let location = await getCurrentPositionAsync({});
    console.log(location);
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  const botSetting = {
    role: "system",
    content:
      "You are Tiba AI, a health consultant and assistant and you should ask a follow-up question when the user prompts. Once the user has responded to the follow-up questions then a diagnosis of possible disease can be made and then give home remedies. Try to generate short reponses.",
  };

  const searchPlaces = async (coordinates) => {
    let { latitude, longitude } = coordinates;
    let res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=pharmacy&key=${MAPS_API_KEY}`
    );

    // ChIJNWrg - I4RLxgRgr6k_Dedwog;
    // let res = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJNWrg-I4RLxgRgr6k_Dedwog&key=${MAPS_API_KEY}`
    // );

    res = await res.json();
    let result = [];
    for await (let place of res.results) {
      // console.log(place.place_id);
      let placeId = place.place_id;
      // console.log("\n\n\n\n");
      let placeDetails = await searchPlace(placeId);
      result.push(placeDetails);
      // console.log(placeDetails);
    }
    console.log(res.results.length);
    return result;
    // await searchPlace("ChIJjzGWo4wQLxgRMzKVhH_w81M");

    // console.log(res);
  };

  const searchPlace = async (placeId) => {
    let res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${MAPS_API_KEY}`
    );

    res = await res.json();
    let obj = {
      url: res.result.url,
      name: res.result.name,
      vicinity: res.result.vicinity,
    };
    return obj;
  };

  const getPlacesToDisplay = (places) => {
    let res = [];
    for (let place of places) {
      if (!place.vicinity.includes("+")) {
        res.push(place);
      }
    }
    return res;
  };

  const formatNearbySearchResponse = (places) => {
    console.log(places);
    let placesToDisplay = getPlacesToDisplay(places);

    let result = "";
    result += "Here you go:\n\n";
    for (let place of placesToDisplay) {
      result += `${place.name} : ${place.vicinity}\n\n`;
    }

    return {
      chatId: v4(),
      content: result,
      role: "assistant",
      dateCreated: Date.now().toString(),
    };
  };

  const fetchUser = async () => {
    let uid = await AsyncStorage.getItem("uid");

    if (uid !== null) {
      const dbRef = doc(db, `users/${uid}`);
      let snap = await getDoc(dbRef);
      if (snap.exists()) {
        let user = snap.data();
        setCurrentUser({ ...user, userId: snap.id });
        return true;
      } else {
        console.log("user does not exist in firestore.");
      }
    } else {
      return false;
    }
  };

  const saveUser = async (userId, obj) => {
    await AsyncStorage.setItem("uid", userId);
    const dbRef = doc(db, `users/${userId}`);
    const document = await getDoc(dbRef);
    if (!document.exists()) {
      setCurrentUser({ ...obj, userId });
      await setDoc(dbRef, obj);
    } else {
      setCurrentUser({ ...document.data(), userId });
    }
  };

  const saveLogin = async (obj) => {
    await AsyncStorage.setItem("uid", obj.userId);
    const dbRef = doc(db, `users/${obj.userId}`);
    let snap = await getDoc(dbRef);
    if (snap.exists()) {
      let user = snap.data();
      setCurrentUser({ ...user, userId: snap.id });
    } else {
      console.log("user does not exist in firestore.");
    }
  };

  const deleteAccount = async () => {
    let dbRef = doc(db, `users/${currentUser.userId}`);
    await deleteDoc(dbRef);
  };

  const logOut = async () => {
    const provider = currentUser.provider;
    if (provider == "none") {
      await signOut(auth);
    } else if (provider == "google") {
      try {
        GoogleSignin.configure({
          webClientId: GOOGLE_SIGNIN_CLIENT_ID,
        });
        await GoogleSignin.revokeAccess();
        await nativeAuth().signOut();
        console.log(currentUser.email, "signed out");
      } catch (error) {
        console.log(error);
      }
    }

    await AsyncStorage.removeItem("uid");
    setCurrentUser(null);
  };

  const getLocationReplyObj = async () => {
    let currentLocation = await getCurrentLocation();
    if (!currentLocation) {
      return {
        content: "You have not granted location permission to Tiba AI",
        dateCreated: Date.now().toString(),
        role: "assistant",
        chatId: v4(),
      };
    }
    let nearbyPlaces = await searchPlaces(currentLocation);
    if (!nearbyPlaces.length) {
      return {
        content: "We could not find what you are looking for",
        dateCreated: Date.now().toString(),
        role: "assistant",
        chatId: v4(),
      };
    }
    replyObj = formatNearbySearchResponse(nearbyPlaces);
    return replyObj;
  };

  const generateChatResponse = async (
    chatObj,
    conversationId,
    isNewConversation
  ) => {
    let replyObj = false;
    let messageList = conversationList.concat([chatObj]);

    let messageHistory = messageList.map((item) => ({
      role: item.role,
      content: item.content,
    }));
    for (let message of messageHistory) {
      // console.log(message);
    }
    //Disabled location feature
    //Start of location feature
    // let locationRequested = await checkIfLocationRequested(chatObj.content);
    // console.log(locationRequested);
    // let [requested, details] = locationRequested.split("|");
    // console.log(locationRequested);
    // if (requested.includes("TRUE")) {
    //   replyObj = await getLocationReplyObj();
    // }
    //End of location feature

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [botSetting, ...messageHistory],
    //   stream: true,
    // });
    if (!replyObj) {
      let completion = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [botSetting, ...messageHistory],
          }),
        }
      );

      completion = await completion.json();
      replyObj = completion.choices[0].message;
      replyObj.dateCreated = Date.now().toString();
      replyObj.chatId = v4();
    }
    setConversationList((prev) => [...prev, replyObj]);

    if (isNewConversation) {
      let conversationRef = doc(
        db,
        `users/${currentUser.userId}/conversations/${conversationId}`
      );
      setDoc(conversationRef, {
        dateCreated: Date.now().toString(),
        title: chatObj.content,
      });
    }
    let chatRef = doc(
      db,
      `users/${currentUser.userId}/conversations/${conversationId}/chats/${chatObj.chatId}`
    );
    delete chatObj.chatId;
    setDoc(chatRef, chatObj);

    chatRef = doc(
      db,
      `users/${currentUser.userId}/conversations/${conversationId}/chats/${replyObj.chatId}`
    );
    delete replyObj.chatId;
    setDoc(chatRef, replyObj);

    // for await (const chunk of completion) {
    //   console.log(chunk.choices[0].delta.content);
    // }
  };

  const saveExtraInfo = async (obj) => {
    let dbRef = doc(db, `users/${currentUser.userId}`);
    await updateDoc(dbRef, obj);
    setCurrentUser({ ...currentUser, ...obj });
  };

  return (
    <ZimbaContext.Provider
      value={{
        searchPlace,
        searchPlaces,
        currentUser,
        saveUser,
        saveLogin,
        logOut,
        fetchUser,
        conversationList,
        setConversationList,
        generateChatResponse,
        saveExtraInfo,
        getCurrentLocation,
        deleteAccount,
      }}
    >
      {children}
    </ZimbaContext.Provider>
  );
};
