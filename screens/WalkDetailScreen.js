import React, { useEffect, useState } from "react";
import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	ActivityIndicator,
	Alert,
	Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";

import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";
import * as walksActions from "../store/walks-actions";

const WalkDetailScreen = (props) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const walkId = props.route.params.id;
	const selectedWalk = useSelector((state) =>
		state.walks.walks.find((walk) => walk.id === walkId)
	);

	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [
				{ text: "Okay" },
			]);
		}
	}, [error]);
	const _handleAddressButtonPress = async () => {
		let result = await WebBrowser.openBrowserAsync(
			selectedWalk.address
		);
	};

	const deleteHandler = () => {
		Alert.alert(
			"Are you sure?",
			"Do you really want to delete this walk?",
			[
				{ text: "No", style: "default" },
				{
					text: "Yes",
					style: "destructive",
					onPress: _handleDeleteButtonPress,
				},
			]
		);
	};

	const _handleDeleteButtonPress = async () => {
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(walksActions.delWalk(walkId));
			props.navigation.navigate("Walks");
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	if (isLoading || !selectedWalk) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size="large"
					color={Colors.primary}
				/>
			</View>
		);
	}
	return (
		<ScrollView
			contentContainerStyle={{ alignItems: "center" }}
		>
			<Image
				source={{ uri: selectedWalk.imgUri }}
				style={styles.image}
			/>

			<MapPreview
				style={styles.mapPreview}
				setLocation={() => {}}
				lat={selectedWalk.lat}
				lng={selectedWalk.lng}
				draggable={false}
			/>
			<View style={styles.locationContainer}>
				<TouchableOpacity
					onPress={_handleAddressButtonPress}
					style={styles.addressContainer}
				>
					<Ionicons
						name={
							Platform.OS == "ios"
								? "ios-map-outline"
								: "md-map-outline"
						}
						size={24}
						color={Colors.primary}
					/>
					<Text style={styles.address}>
						Address and directions
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={deleteHandler}
					style={styles.addressContainer}
				>
					<Ionicons
						name={
							Platform.OS == "ios"
								? "ios-trash"
								: "md-trash"
						}
						size={24}
						color={Colors.primary}
					/>
					<Text style={styles.address}>Delete</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: navData.route.params.title,
	};
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		height: Dimensions.get('window').width,
		width: Dimensions.get('window').width,
		backgroundColor: "#ccc",
	},
	locationContainer: {
		marginVertical: 20,
		width: "90%",
		maxWidth: 350,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		backgroundColor: "white",
		borderRadius: 10,
	},
	addressContainer: {
		padding: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	address: {
		color: Colors.primary,
		textAlign: "center",
	},
	mapPreview: {
		height: 200,
	},
});

export default WalkDetailScreen;
