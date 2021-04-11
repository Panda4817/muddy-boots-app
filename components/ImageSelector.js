import React, {useState} from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
    Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import MainButton from "./MainButton";
import Colors from "../constants/Colors";

const ImageSelector = (props) => {
    const [image, setImage] = useState()
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
        if (result.status !== 'granted'){
            Alert.alert("Camera permission denied!", "Change this permission in the settings to take pictures and store them with your walk.")
            return false;
        }
        return true
    }
	const takeImageHandler = async () => {
        const result = await verifyPermissions();
        if (!result){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.5
        });
        setImage(image.uri);
        props.onImageTaken(image.uri)
    };
    
    let imagePreview;
    if (image) {
        imagePreview = (<Image style={styles.image} source={{uri: image}}/>)
    } else{
        imagePreview = (<Text style={styles.text}>No image selected yet!</Text>)
    }

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{imagePreview}
				
			</View>
            <MainButton 
                    onPress={takeImageHandler}
                    styleContainer={styles.buttonContainer}
                    styleText={styles.buttonText}
            >
                Take Image
            </MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: "center",
        marginTop: 20,
        marginBottom: 20
	},
	imagePreview: {
		width: 320,
        height: 320,
		justifyContent: "center",
		alignItems: "center",
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20
	},
	text: {
		fontFamily: "open-sans",
        color: Colors.primary
	},
	image: {
		width: "100%",
		height: "100%",
        margin: 10
	},
    buttonContainer: {
        backgroundColor: Colors.accent,
    },
    buttonText: {
        color: "white"
    }
});

export default ImageSelector;
