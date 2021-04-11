import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
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
				<View style={styles.titleBox}>
					<Text style={styles.title}>{props.title}</Text>
					<Ionicons name="md-chevron-forward" size={30} color={Colors.accent}/>	
				</View>
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
		width: 250
	},
	title: {
		color: Colors.accent,
		fontSize: 25,
		marginBottom: 5,
        fontFamily: 'caveat-brush'
	},
	titleBox: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginRight: 20
	},
});

export default WalkItem;
