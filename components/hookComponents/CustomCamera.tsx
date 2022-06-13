import React, { FunctionComponent, useState, useEffect, /* usePermissions */ } from 'react'
import { StatusBar } from 'expo-status-bar';

//React Navite
import { Text, View, TouchableOpacity, Image } from 'react-native';

//Camera
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';

//MediaLibrary -> local gallery image, save and read files
import * as MediaLibrary from 'expo-media-library'

//ImagePicker -> Native camera and gallery
import * as ImagePicker from 'expo-image-picker'

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

//Style
import styleApp from '../../styleApp';
import Flanvas from './Flanvas';

interface State {
    hasPermission: boolean,
    hasPermissionImagePicker: boolean,
    hasPermissionMediaLibrary: boolean,
    typeCamera: string,
    zoom: number,
    image?: string,
    openCamera: boolean
}


const initialState: State = {
    hasPermission: false,
    hasPermissionImagePicker: false,
    hasPermissionMediaLibrary: false,
    typeCamera: CameraType.back,
    zoom: 0,
    openCamera: false,
    image: "file:///var/mobile/Containers/Data/Application/10659537-622F-4FE4-BECF-27292BD12214/Library/Caches/ExponentExperienceData/%2540ggdev1995%252FFlanvas/ImagePicker/59D92568-2E75-4DCC-969B-569AA06671DC.jpg"
}


let camera: Camera | null

const App: FunctionComponent = () => {

    const [state, setState] = useState<State>(initialState)

    useEffect(() => {

    }, [])


    const handleOpenGallery = async () => {
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
                image: result
            });
        }
    }

    return (
        <View style={{ flex: 1 }}>

            {/* <Camera
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
                        onPress={handleOpenGallery}>
                        <Text style={styleApp.flipButton}> Gallery </Text>
                    </TouchableOpacity>

                </View>


                <TouchableOpacity
                    style={styleApp.touchableOpacity}
                    onPress={async (): Promise<void> => {
                        let option: object = {
                            quality: 0.5,
                            base64: false
                        }
                        const photo: CameraCapturedPicture = await camera.takePictureAsync(option)
                        console.log(photo)

                        //Save into gallery
                        MediaLibrary.saveToLibraryAsync(photo.uri)
                        //const asset = await MediaLibrary.createAssetAsync(photo.uri)
                        setState({
                            ...state,
                            image: photo
                        })
                    }}>
                    <Text style={styleApp.flipButton}> Take Pic </Text>
                </TouchableOpacity>

            </Camera> */}

            <Flanvas text={state.image} />

        </View>
    );
}

export default App
