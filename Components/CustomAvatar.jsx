import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from "react-native-paper";
import { ZimbaContext } from '../context/context';
import CustomColors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';


const CustomAvatar = ({ type, style, size }) =>{ 
  const navigation = useNavigation();
    const { currentUser } = useContext(ZimbaContext);
    const userInitials = type == 'bot' ? "AI" : currentUser?.email[0].toUpperCase();
 
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate("User")}}>
    <Avatar.Text
          size={size || 30}
          label={userInitials}
          style={{ backgroundColor: type == 'bot' ? CustomColors.dark1 : CustomColors.googleBlue, ...style }}
        />
        </TouchableOpacity> 
)};

export default CustomAvatar;
