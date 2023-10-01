import { createContext, useEffect, useState } from "react";
import { MAPS_API_KEY } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";

export const ZimbaContext = createContext();

export const ZimbaProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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

  const saveUser = async (obj) => {
    await AsyncStorage.setItem("uid", obj.userId);
    const dbRef = doc(db, `users/${obj.userId}`);
    const saveDoc = {
      email: obj.email,
      dateCreated: Date.now(),
      userId: obj.userId,
    };
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
    await signOut(auth);
    await AsyncStorage.removeItem("uid");
    setCurrentUser(null);
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
      }}
    >
      {children}
    </ZimbaContext.Provider>
  );
};
