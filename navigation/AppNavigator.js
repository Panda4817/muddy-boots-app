import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { WalksNavigator } from "./WalksNavigator";

const AppNavigator = (props) => {
	return (
		<NavigationContainer>
			<WalksNavigator />
		</NavigationContainer>
	);
};

export default AppNavigator;
