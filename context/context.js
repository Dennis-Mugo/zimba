import { createContext, useState } from "react";
import { MAPS_API_KEY } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const saveUser = async (obj) => {
    await AsyncStorage.setItem("uid", obj.userId);
    setCurrentUser(obj);
  };
  return (
    <ZimbaContext.Provider value={{ searchPlace, currentUser, saveUser }}>
      {children}
    </ZimbaContext.Provider>
  );
};
