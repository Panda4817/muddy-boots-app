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
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";
import * as walksActions from "../store/walks-actions";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from '../components/LocationSelector';
import HeaderButton from '../components/HeaderButton';

const NewWalkScreen = (props) => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState();
	const [location, setLocation] = useState()
	const [error, setError] = useState();
	const dispatch = useDispatch();

	const imageTakenHandler = (img) => {
		setImage(img);
	};

	const locationChosenHandler = (loc) => {
		setLocation(loc);
	}
	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [
				{ text: "Okay" },
			]);
		}
	}, [error]);

	
	

	const saveWalkHandler = () => {
		if (title.length <= 0 || !image || !location) {
			Alert.alert("Check fields!", "Title cannot be empty! Must choose an image and a start location!");
			return;
		}
		try {
			dispatch(walksActions.addWalk(title, image, location));
			props.navigation.goBack();
		} catch (err) {
			setError(err.message);
		}
	};
	useEffect(() => {
		props.navigation.setOptions({
		  headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
			  <Item
				title="Save"
				iconName={
				  Platform.OS === 'android' ? 'md-save' : 'ios-save'
				}
				onPress={saveWalkHandler}
			  />
			</HeaderButtons>
		  )
		});
	  }, [saveWalkHandler]);
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
				<LocationSelector onLocationChosen={locationChosenHandler}/>
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
		margin: 20,
		flex: 1,
	},
	label: {
		fontSize: 17,
		fontFamily: "open-sans-bold",
		color: Colors.primary,
		padding: 10
	},
	textInput: {
		borderBottomColor: "#CCC",
		borderBottomWidth: 1,
		marginBottom: 10,
		padding: 10,
	},
});

export default NewWalkScreen;
