import React, { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomColors from "../../constants/colors";
import CustomAvatar from "../../Components/CustomAvatar";
import Divider from "../../Components/Divider";
import { ZimbaContext } from "../../context/context";
import { Icon } from "@rneui/themed";
import CustomButton from "../../Components/CustomButton";

const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }) => {
  const { currentUser, logOut } = useContext(ZimbaContext);
  const [signoutLoading, setSignoutLoading] = useState(false);

  const handleSignout = async () => {
    if (signoutLoading) return;
    setSignoutLoading(true);
    await logOut();
    navigation.replace("AuthNavigator");
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.avatarContainer}>
        <CustomAvatar size={height * 0.15} />
      </View>
      <Divider />
      {currentUser?.displayName && (
        <>
        <View style={styles.listWrapper}>
          <Icon
            type="ionicon"
            name="person"
            color={CustomColors.greyScale600}
            style={styles.detailIcon}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.value}>{currentUser.displayName}</Text>
          </View>
        </View>
        <Divider />
        </>
      )}
      {currentUser?.email && (
        <>
        <View style={styles.listWrapper}>
          <Icon
            type="material-community"
            name="email"
            color={CustomColors.greyScale600}
            style={styles.detailIcon}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.value}>{currentUser.email}</Text>
          </View>
        </View>
        <Divider />
        </>
      )}
      {currentUser?.age && (
        <>
        <View style={styles.listWrapper}>
          <Icon
            type="material-community"
            name="calendar-blank"
            color={CustomColors.greyScale600}
            style={styles.detailIcon}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.title}>Age</Text>
            <Text style={styles.value}>{currentUser.age}</Text>
          </View>
        </View>
        <Divider />
        </>
      )}
      {currentUser?.dateCreated && (
        <>
        <View style={styles.listWrapper}>
          <Icon
            type="material-community"
            name="calendar"
            color={CustomColors.greyScale600}
            style={styles.detailIcon}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.title}>Joined</Text>
            <Text style={styles.value}>{new Date(currentUser.dateCreated).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            })}</Text>
          </View>
        </View>
        <Divider />
        </>
      )}
      <CustomButton title="Sign Out" loading={signoutLoading} onPress={handleSignout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: CustomColors.themeBackground,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    height: 0.3 * height,
    justifyContent: "center",
    alignItems: "center",
  },
  listWrapper: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    marginHorizontal: 15,
  },
  detailWrapper: {},
  title: {
    fontFamily: "nunitoLight",
    fontSize: 15,
  },
  value: {
    fontFamily: "nunitoSemiBold",
    fontSize: 15,
  },
});

export default Profile;
