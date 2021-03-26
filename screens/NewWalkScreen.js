import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";
import * as walksActions from "../store/walks-actions";
import ImageSelector from "../components/ImageSelector";

const NewWalkScreen = (props) => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState();
	const [error, setError] = useState();
	const dispatch = useDispatch();

	const imageTakenHandler = (img) => {
		setImage(img);
	};

	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [
				{ text: "Okay" },
			]);
		}
	}, [error]);

	const saveWalkHandler = () => {
		if (title.length <= 0) {
			Alert.alert("Check Title!", "Title cannot be empty!");
			return;
		}
		try {
			dispatch(walksActions.addWalk(title, image));
			props.navigation.goBack();
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					placeholder="Enter the name of your starting place"
					style={styles.textInput}
					initialValue=""
					onChangeText={(value) => setTitle(value)}
				/>
				<ImageSelector onImageTaken={imageTakenHandler} />
				<MainButton
					styleContainer={styles.submitButton}
					styleText={styles.submitText}
					onPress={saveWalkHandler}
				>
					Save Walk
				</MainButton>
			</View>
		</ScrollView>
	);
};

export const screenOptions = {
	headerTitle: "Add New Walk",
};

const styles = StyleSheet.create({
	submitButton: {
		backgroundColor: Colors.primary,
		margin: 20,
	},
	submitText: {
		color: Colors.accent,
		textAlign: "center",
	},
	form: {
		margin: 30,
		flex: 1,
	},
	label: {
		fontSize: 17,
		fontFamily: "open-sans-bold",
		color: Colors.primary,
	},
	textInput: {
		borderBottomColor: "#CCC",
		borderBottomWidth: 1,
		marginBottom: 15,
		padding: 10,
	},
});

export default NewWalkScreen;
