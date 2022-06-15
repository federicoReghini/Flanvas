import React, { FunctionComponent, useState } from 'react';

//React Native
import { Text, View, TouchableOpacity } from 'react-native';

//Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';

//Camera
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';

//MediaLibrary -> local gallery image, save and read files
// import * as MediaLibrary from 'expo-media-library'

//ImagePicker -> Native camera and gallery
import * as ImagePicker from 'expo-image-picker'

//Style
import styleApp from '../../styleApp';
import { customCamera_style } from '../../assets/styles/customCamera_style'

interface State {
    hasPermission: boolean,
    hasPermissionImagePicker: boolean,
    hasPermissionMediaLibrary: boolean,
    typeCamera: number | CameraType,
    zoom: number,
    image?: string,
    openCamera: boolean
}

type props = {
    callback: (e: string | undefined) => void
}

const initialState: State = {
    hasPermission: false,
    hasPermissionImagePicker: false,
    hasPermissionMediaLibrary: false,
    typeCamera: CameraType.back,
    zoom: 0,
    openCamera: false,
    image: undefined
}

let camera: Camera | null

const CustomCamera: FunctionComponent<props> = ({ callback }) => {

    const [state, setState] = useState<State>(initialState)

    // useEffect(() => {
    //     (async () => {

    //     })()
    // }, [])

    const handleChangeCamera_ = (): void => {
        setState({
            ...state,
            typeCamera: state.typeCamera === CameraType.back ? CameraType.front : CameraType.back
        });
    }

    const handleOpenGallery_ = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            quality: 1,
        })

        callback(result?.base64)

        if (!result.cancelled) {
            setState({
                ...state,
                image: result.base64
            });
        }
    }

    const handleTakePicture_ = async (): Promise<void> => {
        let option: object = {
            quality: 0.5,
            base64: true
        }

        const photo: CameraCapturedPicture | undefined = await camera?.takePictureAsync(option)

        // __emit('image', photo.base64)

        callback(photo?.base64) //<-- change here

        setState({
            ...state,
            image: photo?.base64
        })
    }

    return (
        <View style={{ flex: 1 }}>

            <Camera
                style={customCamera_style.camera}
                type={state.typeCamera}
                zoom={state.zoom}
                ref={(r) => { camera = r }}
            >

                <View style={customCamera_style.viewButtons}>
                    <TouchableOpacity
                        style={customCamera_style.touchableOpacity}
                        onPress={handleChangeCamera_}>
                        <Text style={customCamera_style.buttonCamera}>
                            <Ionicons name="repeat" size={40} color="black" />
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={customCamera_style.touchableOpacity}
                        onPress={handleOpenGallery_}>
                        <Text style={customCamera_style.buttonCamera}>
                            <Ionicons name="images" size={40} color="black" />
                        </Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={customCamera_style.touchableOpacity}
                        onPress={handleTakePicture_}>
                        <Text style={customCamera_style.buttonCamera}>
                            <Ionicons name="aperture" size={40} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>

            </Camera>


        </View>
    );
}

export default CustomCamera;
