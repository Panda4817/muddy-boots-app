import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPreview = (props) => {
	const width = Dimensions.get("window").width;
	const [region, setRegion] = useState(
		!props.lat
			? null
			: {
					latitude: props.lat,
					longitude: props.lng,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0922 * (width / 400),
			}
	);
	const [marker, setMarker] = useState(
		!props.lat
			? null
			: { latitude: props.lat, longitude: props.lng }
	);

	const onRegionChangeHandler = (data) => {
		setRegion(data);
	};

	return (
		<View style={styles.container}>
			<MapView
				style={{...styles.map, ...props.style}}
				region={!region ? null : region}
				onRegionChangeComplete={(e) => {
					onRegionChangeHandler(e);
				}}
				onPress={(e) => {
					if (props.draggable){
						setMarker({
						latitude: e.nativeEvent.coordinate.latitude,
						longitude: e.nativeEvent.coordinate.longitude,
						});
						props.setLocation({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude,
						});
					}
				}}
			>
				{marker ? (
					<Marker
						draggable={props.draggable}
						coordinate={marker}
						onDragEnd={(e) => {
							setMarker({
								latitude: e.nativeEvent.coordinate.latitude,
								longitude:
									e.nativeEvent.coordinate.longitude,
							});
							props.setLocation({
								latitude: e.nativeEvent.coordinate.latitude,
								longitude:
									e.nativeEvent.coordinate.longitude,
							});
						}}
					/>
				) : null}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
	},
});

export default MapPreview;
