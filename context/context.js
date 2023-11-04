import { createContext, useEffect, useState } from "react";
import { GOOGLE_SIGNIN_CLIENT_ID, MAPS_API_KEY } from "../constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { default as nativeAuth } from "@react-native-firebase/auth";
import { signOut } from "firebase/auth";
import OpenAI from "openai";
import { process } from "../zimba.algo/env";
import { v4 } from "uuid";

export const ZimbaContext = createContext();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const ZimbaProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [conversationList, setConversationList] = useState();
  const botSetting = {
    role: "system",
    content:
      "You are Tiba AI, a health consultant and you should ask a follow-up question when the user prompts. Once the user has responded to the follow-up questions then a diagnosis of possible disease can be made and then give home remedies. Try to generate short reponses.",
  };

  const searchPlace = async () => {
    // let res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-1.3093245,36.8099464&radius=1000&types=hospital&key=${MAPS_API_KEY}`);
    // ChIJNWrg - I4RLxgRgr6k_Dedwog;
    // let res = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJNWrg-I4RLxgRgr6k_Dedwog&key=${MAPS_API_KEY}`
    // );

    res = await res.json();
    console.log("\n\n\n\n");
    console.log(res);
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
    const saveDoc = obj;
    await setDoc(dbRef, saveDoc);
    setCurrentUser(saveDoc);
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

  const generateChatResponse = async (chatObj, conversationId, callBack) => {
    let messageList = conversationList.concat([chatObj]);

    let messageHistory = messageList.map((item) => ({
      role: item.role,
      content: item.content,
    }));
    for (let message of messageHistory) {
      console.log(message);
    }
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [botSetting, ...messageHistory],
    //   stream: true,
    // });

    let completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [botSetting, ...messageHistory],
      }),
    });

    completion = await completion.json();
    let replyObj = completion.choices[0].message;
    replyObj.dateCreated = Date.now().toString();
    replyObj.chatId = v4();

    setConversationList((prev) => [...prev, replyObj]);

    let conversationRef = doc(
      db,
      `users/${currentUser.userId}/conversations/${conversationId}`
    );
    setDoc(conversationRef, {
      dateCreated: Date.now().toString(),
      title: chatObj.content,
    });

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

  return (
    <ZimbaContext.Provider
      value={{
        searchPlace,
        currentUser,
        saveUser,
        saveLogin,
        logOut,
        fetchUser,
        conversationList,
        setConversationList,
        generateChatResponse,
      }}
    >
      {children}
    </ZimbaContext.Provider>
  );
};
