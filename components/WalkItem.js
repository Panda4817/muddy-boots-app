import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

const WalkItem = (props) => {
	return (
		<TouchableOpacity
			onPress={props.onSelect}
			style={styles.placeItem}
		>
			<Image
				style={styles.image}
				source={{ uri: props.image }}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.address}>{props.address}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	placeItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 30,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#ccc",
		borderColor: Colors.primary,
		borderWidth: 1,
	},
	infoContainer: {
		marginLeft: 25,
		width: 250,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		color: Colors.accent,
		fontSize: 25,
		marginBottom: 5,
        fontFamily: 'caveat-brush'
	},
	address: {
		color: Colors.primary,
		fontSize: 16,
        fontFamily: 'open-sans'
	},
});

export default WalkItem;
