import React, { FunctionComponent, useState } from 'react';

//React Navite
import { Text, View, TouchableOpacity } from 'react-native';

//Camera
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';

//MediaLibrary -> local gallery image, save and read files
import * as MediaLibrary from 'expo-media-library'

//ImagePicker -> Native camera and gallery
import * as ImagePicker from 'expo-image-picker'

//Style
import styleApp from '../../styleApp';

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

    const handleOpenGallery_ = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result);

        if (!result.cancelled) {
            setState({
                ...state,
                image: result.uri
            });
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <Camera
                style={styleApp.camera}
                type={state.typeCamera}
                zoom={state.zoom}
                ref={(r) => { camera = r }}
            >
                <View style={styleApp.viewButtons}>

                    <TouchableOpacity
                        style={styleApp.touchableOpacity}
                        onPress={() => {
                            console.log('clicked!')
                            setState({
                                ...state,
                                typeCamera: state.typeCamera === CameraType.back ? CameraType.front : CameraType.back
                            });
                        }}>
                        <Text style={styleApp.flipButton}> Flip </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styleApp.touchableOpacity}
                        onPress={handleOpenGallery_}>
                        <Text style={styleApp.flipButton}> Gallery </Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    style={styleApp.touchableOpacity}
                    onPress={async (): Promise<void> => {
                        let option: object = {
                            quality: 0.5,
                            base64: true
                        }

                        const photo: CameraCapturedPicture | undefined = await camera?.takePictureAsync(option)

                        // __emit('image', photo.base64)

                        callback(photo?.base64)

                        setState({
                            ...state,
                            image: photo?.base64
                        })

                    }}>
                    <Text style={styleApp.flipButton}> Take Pic </Text>
                </TouchableOpacity>

            </Camera>


        </View>
    );
}

export default CustomCamera;
