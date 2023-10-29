import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from "react-native-paper";
import { ZimbaContext } from '../context/context';
import CustomColors from '../constants/colors';


const CustomAvatar = ({ type, style }) =>{ 
    const { currentUser } = useContext(ZimbaContext);
    const userInitials = type == 'bot' ? "AI" : currentUser?.email[0].toUpperCase();
 
    return (
    <Avatar.Text
          size={30}
          label={userInitials}
          style={{ backgroundColor: type == 'bot' ? CustomColors.dark1 : CustomColors.googleBlue, ...style }}
        />
)};

export default CustomAvatar;
