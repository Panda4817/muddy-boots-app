import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	Alert,
	StyleSheet
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationSelector = (props) => {
	const [location, setLocation] = useState();
	const [isFetching, setIsFetching] = useState(false);
	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(
			Permissions.LOCATION
		);
		if (result.status !== "granted") {
			Alert.alert(
				"Location permission denied!",
				"Change this permission in the settings to add current location as your address for the starting point of this walk."
			);
			return false;
		}
		return true;
	};
	const getLocationHandler = async () => {
		const isGranted = await verifyPermissions();
		if (!isGranted) {
			return;
		}
		try {
			setIsFetching(true);
			const loc = await Location.getCurrentPositionAsync({
				timeout: 5000,
			});
			setLocation({
				lat: loc.coords.latitude,
				lng: loc.coords.longitude
			});
		} catch (err) {
			Alert.alert(
				"Could not fetch location!",
				"Please try again later or pick location manually from map."
			);
		}
		setIsFetching(false);
	};

    const manualLocation = (data) => {
        setLocation({ lat: data.latitude, lng: data.longitude })	
    }

	useEffect(() => {
		props.onLocationChosen(location);
	}, [location])

	return (
		<View style={styles.locationPicker}>
			<View style={styles.mapPreview}>
				{isFetching ? (
					<ActivityIndicator
						size="large"
						color={Colors.accent}
					/>
				) : location ? (
					<View>
						<Text style={styles.text}>
							Location selected!{"\n"}
							Latitude: {location.lat}, Longitude: {location.lng}
						</Text>
						<MapPreview
							lat={location.lat}
							lng={location.lng}
							setLocation={manualLocation}
							draggable={true}
							style={styles.map}
						/>
					</View>
				) : (
                    <View>
                        <Text style={styles.text}>
                            No location chosen yet! Use current location or pick a place on the map :)
                        </Text>
                        <MapPreview 
                            setLocation={manualLocation}
							draggable={true}
							style={styles.map}
                        />
                    </View>
					
				)}
			</View>
			<MainButton
				onPress={getLocationHandler}
				styleContainer={styles.buttonContainer}
				styleText={styles.buttonText}
			>
				Get User Location
			</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 20,
		alignItems: "center",
	},
	mapPreview: {
		marginBottom: 20,
		width: "100%",
		height: 400,
		justifyContent: "center",
		alignItems: "center",
	},
	map: {
		height: 350
	},
	text: {
		fontFamily: "open-sans",
		color: Colors.primary,
        textAlign: 'center',
        marginBottom: 20,
		marginHorizontal: 20
	},
	buttonContainer: {
		backgroundColor: Colors.accent,
	},
	buttonText: {
		color: "white",
	}
});

export default LocationSelector;
