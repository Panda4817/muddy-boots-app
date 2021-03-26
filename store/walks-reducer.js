import { ADD_WALK } from "./walks-actions";
import Walk from '../models/walk';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const initialState = {
    walks: []
};

export default ( state = initialState, action ) => {
    switch (action.type){
        case ADD_WALK:
            const newWalk = new Walk(
                uuidv4(), 
                action.walkData.title,
                action.walkData.image
            );
            return {
                walks: state.walks.concat(newWalk)
            }
        default:
            return state;
    }
    
};