import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomColors from "../../constants/colors";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const InfoForm = () => {
  const [age, setAge] = useState("");
  const [conditions, setConditions] = useState("");
  const [conditionsFocused, setConditionsFocused] = useState(false);
  const [ageFocused, setAgeFocused] = useState(false);

  const handleAge = (value) => {
    let res = "";
    let valid = "0123456789";

    for (let val of value) {
      if (valid.includes(val)) {
        res += val;
      }
    }
    setAge(res);
  };

  const handleConditions = (value) => {
    setConditions(value);
  }

  const handleAgeFocus = () => {
    setAgeFocused(true);
  };

  const handleAgeBlur = () => {
    setAgeFocused(false);
  };

  const handleConditionsFocused = () => {
    setConditionsFocused(true);
  }

  const handleConditionsBlur = () => {
    setConditionsFocused(false);
  }

  const handleSubmit = async () => {}

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Give Tiba AI some more info</Text>
      </View>
      <Text style={styles.ageLabel}>How old are you?</Text>
      <View
        style={[
          styles.ageInputWrapper,
          {
            borderBottomColor: ageFocused
              ? CustomColors.googleBlue
              : CustomColors.greyScale400,
          },
        ]}
      >
        <TextInput
          value={age}
          keyboardType="number-pad"
          onChangeText={handleAge}
          style={styles.ageInput}
          onFocus={handleAgeFocus}
          onBlur={handleAgeBlur}
          placeholder="Age e.g 17"
        />
      </View>

      <Text style={styles.conditionsLabel}>Do you have any underlying conditons? If yes, please fill them in</Text>
      <View
        style={[
          styles.conditionsInputWrapper,
          {
            borderBottomColor: conditionsFocused
              ? CustomColors.googleBlue
              : CustomColors.greyScale400,
          },
        ]}
      >
        <TextInput
          value={conditions}
          onChangeText={handleConditions}
          style={styles.conditionsInput}
          multiline
          onFocus={handleConditionsFocused}
          onBlur={handleConditionsBlur}
          placeholder="E.g Diabetes"
        />
        
      </View>
      <Button onPress={handleSubmit} mode="contained" contentStyle={{height: 60}} style={styles.submitBtn}>
            SAVE
        </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    backgroundColor: CustomColors.themeBackground
  },
  title: {
    fontFamily: "nunitoBold",
    fontSize: 18,
  },
  ageLabel: {
    fontFamily: "nunitoSemiBold",
    fontSize: 15,
  },
  conditionsLabel: {
    fontFamily: "nunitoSemiBold",
    fontSize: 15,
    marginTop: 40
  },
  ageInputWrapper: {
    borderBottomWidth: 2,
    marginTop: 10,
  },
  conditionsInputWrapper : {
    borderBottomWidth: 2,
    marginTop: 10,
  },
  ageInput: {
    fontSize: 13,
    fontFamily: "nunitoLight",
  },
  conditionsInput: {
    fontSize: 13,
    fontFamily: "nunitoLight",
  },
  header: {
    paddingVertical: 0.05 * height,
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: CustomColors.googleBlue,
    borderRadius: 30,
    marginTop: 30,
    height: 60,
    justifyContent: "center",
    
    fontSize: 18,
    
  }
});

export default InfoForm;
