import React from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import CustomColors from '../constants/colors';

const { height, width } = Dimensions.get('window');
const CustomButton = (props) => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{ ...styles.buttonContainer, ...props.conStyle }}
			activeOpacity={0.8}
		>
			<Text style={{ ...styles.buttonText, ...props.style }}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	buttonText: {
		fontSize: 16,
		letterSpacing: 1.5,
		textAlign: 'center',
		color: CustomColors.white,
		fontFamily: 'mooli',
	},
	buttonContainer: {
		backgroundColor: CustomColors.uberDark1,
		height: height / 13,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 24,
		// shadowColor: '#7210ff',
        shadowColor: CustomColors.dark1,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
		width: width / 1.13,
		alignSelf: 'center',
	},
});
