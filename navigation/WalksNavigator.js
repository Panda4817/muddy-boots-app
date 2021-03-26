import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Platform} from "react-native";

import WalkDetailScreen, {
	screenOptions as WalkDetailOptions,
} from "../screens/WalkDetailScreen";
import WalksListScreen, {
	screenOptions as WalksListOptions,
} from "../screens/WalksListScreen";
import NewWalkScreen, {
	screenOptions as NewWalkOptions,
} from "../screens/NewWalkScreen";
import MapScreen, {
	screenOptions as MapOptions,
} from "../screens/MapScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS == 'android' ? Colors.primary : 'white'
	},
	headerTitleStyle: {
		fontFamily: "caveat-brush",
        fontSize: 28,
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS == 'android' ? Colors.accent : Colors.primary,
};

const WalksStackNavigator = createStackNavigator();

export const WalksNavigator = () => {
	return (
		<WalksStackNavigator.Navigator
			screenOptions={defaultNavOptions}
		>
			<WalksStackNavigator.Screen
				name="Walks"
				component={WalksListScreen}
				options={WalksListOptions}
			/>
			<WalksStackNavigator.Screen
				name="WalkDetail"
				component={WalkDetailScreen}
				options={WalkDetailOptions}
			/>
			<WalksStackNavigator.Screen
				name="NewWalk"
				component={NewWalkScreen}
				options={NewWalkOptions}
			/>
			<WalksStackNavigator.Screen
				name="Map"
				component={MapScreen}
				options={MapOptions}
			/>
		</WalksStackNavigator.Navigator>
	);
};
