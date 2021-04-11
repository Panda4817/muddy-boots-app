import React, { useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
} from "react-native";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import WalkItem from "../components/WalkItem";
import * as walkActions from '../store/walks-actions';

const WalksListScreen = (props) => {
	const walks = useSelector((state) => state.walks.walks);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(walkActions.loadWalks());
	}, [dispatch]);

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Add Walk"
						iconName={
							Platform.OS === "android"
								? "md-add"
								: "ios-add"
						}
						onPress={() => {
							props.navigation.navigate("NewWalk");
						}}
					></Item>
				</HeaderButtons>
			),
		});
	});

	if (walks.length == 0) {
		return (
			<View style={styles.screen}>
				<Text style={styles.noData}>
					No walks added yet. Start remembering your rambles
					with Muddy Boots!
				</Text>
			</View>
		);
	}
	return (
		<FlatList
			data={walks}
			renderItem={(itemData) => (
				<WalkItem
					title={itemData.item.title}
					image={itemData.item.imgUri}
					address={itemData.item.address}
					onSelect={() => {
						props.navigation.navigate("WalkDetail", {
							title: itemData.item.title,
							id: itemData.item.id
						});
					}}
				/>
			)}
		/>
	);
};

export const screenOptions = {
	headerTitle: "Muddy Boots: My Walks",
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 30,
	},
	noData: {
		fontFamily: "caveat-brush",
		textAlign: "center",
		fontSize: 25,
		color: Colors.primary,
	},
});

export default WalksListScreen;
