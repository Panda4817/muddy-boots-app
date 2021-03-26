import * as FileSystem from 'expo-file-system';

export const ADD_WALK = "ADD_WALK";
export const DELETE_WALK = "ADD_WALK";
export const EDIT_WALK = "ADD_WALK";

export const addWalk = (title, image) => {
	return async dispatch => {
		const fileName = image.split('/').pop();
		const newPath = FileSystem.documentDirectory + fileName;

		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath
			});
		} catch(err) {
			console.log(err);
			throw err;
		}
		
		dispatch(
			{
			type: ADD_WALK,
			walkData: {
					title: title,
					image: newPath
				},
			}
		)
	}
};
