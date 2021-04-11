import * as FileSystem from "expo-file-system";

export const SET_WALKS = "SET_WALKS";
export const ADD_WALK = "ADD_WALK";
export const DELETE_WALK = "DELETE_WALK";

import { insertWalk, fetchWalks, deleteWalk } from "../helpers/db";

export const addWalk = (title, image, location) => {
	return async (dispatch) => {
		const fileName = image.split("/").pop();
		const newPath = FileSystem.documentDirectory + fileName;

		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
			const address = `https://maps.google.com/maps?q=${location.lat},${location.lng}`
			const dbResult = await insertWalk(
				title,
				newPath,
				address,
				location.lat,
				location.lng
			);
			console.log(dbResult);
			dispatch({
				type: ADD_WALK,
				walkData: {
					id: dbResult.insertId.toString(),
					title: title,
					image: newPath,
					address: address,
					lat: location.lat,
					lng: location.lng
				},
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadWalks = () => {
	return async (dispatch) => {
		try {
			const dbResult = await fetchWalks();
			dispatch({
				type: SET_WALKS,
				walks: dbResult.rows._array,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const delWalk = (id) => {
	return async (dispatch) => {
		try {
			const dbResult = await deleteWalk(id);
			dispatch({
				type: DELETE_WALK,
				id: id,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
}
