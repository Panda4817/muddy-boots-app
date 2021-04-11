import { ADD_WALK, DELETE_WALK, SET_WALKS } from "./walks-actions";
import Walk from "../models/walk";
import "react-native-get-random-values";
const initialState = {
	walks: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_WALK:
			const newWalk = new Walk(
				action.walkData.id,
				action.walkData.title,
				action.walkData.image,
				action.walkData.address,
				action.walkData.lat,
				action.walkData.lng
			);
			return {
				walks: state.walks.concat(newWalk),
			};
		case SET_WALKS:
			return {
				walks: action.walks.map(
					(w) =>
						new Walk(
							w.id.toString(),
							w.title,
							w.imageUri,
							w.address,
							w.lat,
							w.lng
						)
				),
			};
		case DELETE_WALK: {
			return {
				walks: state.walks.filter(
					walk => walk.id !== action.id
				)
			}
		}
		default:
			return state;
	}
};
