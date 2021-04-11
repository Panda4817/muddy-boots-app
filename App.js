import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import {
	createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import walksReducer from "./store/walks-reducer";
import { init } from './helpers/db';

init()
	.then(() => {
		console.log("done")
	})
	.catch(() => {
		console.log(err)
	});

const rootReducer = combineReducers({
	walks: walksReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
		"caveat-brush": require("./assets/fonts/CaveatBrush-Regular.ttf"),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}

	return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
