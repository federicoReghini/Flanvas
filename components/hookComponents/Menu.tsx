import React, { FunctionComponent, useState, ReactElement } from 'react';

// native components
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

//Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';

// style
import { styles } from '../../styles_generic';
import { menu_styles } from '../../assets/styles/menu_styles';

// type
import { signatureRef } from '../../utils/ts/types';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
interface Props {
    refCanvas: signatureRef,
    imgTest: string,
}

interface State {
    isPalette: boolean
    isPenSize: boolean
    colorIcon: string
    assets: Array<object>
}

const initState = {
    isPalette: false,
    isPenSize: false,
    colorIcon: 'white',
    assets: []
}

const palette = ['#000000', '#FF4848', '#387CFF', '#3CFF72', '#D560FE', '#FF8A00']


const Menu: FunctionComponent<Props> = ({ refCanvas, imgTest }) => {

    const [state, setState] = useState<State>(initState);

    const navigate: any = useNavigation();

    const handleCallback = (ref: any, params: any) => () => {

        if (palette.includes(params))
            setState({
                ...state,
                colorIcon: params,
                isPalette: !state.isPalette
            })

        switch (ref) {

            case refCanvas?.changePenColor: return refCanvas?.changePenColor(params);
            case refCanvas?.changePenSize: return refCanvas?.changePenSize(params, params);
            case refCanvas?.clearSignature: return refCanvas?.clearSignature();

            default:
                return null;
        }

    }

    const handlePalette = (): void => {
        setState({
            ...state,
            isPalette: !state.isPalette
        })
    }

    const __handleTutorial = () => {
        navigate.navigate('Tutorial')
    }

    const __handleGallery = async () => {
      /*   const RESULT = await MediaLibrary.getAlbumAsync('flanvas')
        const ASSETS = await MediaLibrary.getAssetsAsync({ album: RESULT.id })
        setState({
            ...state,
            assets: ASSETS.assets
        }) */

    }

    const map = (color: string, key: number): ReactElement => {
        return (
            <TouchableOpacity
                key={key}
                style={menu_styles.paletteWrapper}
                onPress={handleCallback(refCanvas?.changePenColor, color)}
            >
                <View style={{ backgroundColor: color, width: 30, height: 30, borderRadius: 50 }}></View>
            </TouchableOpacity>
        )
    }

    const asset = (asset: any, key: number): ReactElement => {

        return (
            <Image key={key} source={asset.uri} style={{ width: 150, height: 150, borderWidth: 1 }} />
        )
    }

    const __share = async () => {
        const result = await Sharing.isAvailableAsync();

        if (result) {
            await Sharing.shareAsync(imgTest, {
                dialogTitle: 'che figata di disegno'
            })
        }
    }

    return (

        <View style={menu_styles.menu}>
            <TouchableOpacity
                style={menu_styles.voiceMenu}
                onPress={handlePalette}
            >
                <Text style={styles.btn}>
                    <Ionicons name="color-palette" size={30} color={state.colorIcon} />
                </Text>
            </TouchableOpacity>
            <View style={styles.containerFlexRow}>

                {
                    state.isPalette &&
                    palette.map(map)
                }

            </View>

            <TouchableOpacity
                style={menu_styles.voiceMenu}
                onPress={handleCallback(refCanvas?.changePenSize, 3)}
            >
                <Text style={styles.btn}>
                    <Ionicons name="resize" size={30} color="white" />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={menu_styles.voiceMenu}
                onPress={handleCallback(refCanvas?.clearSignature, null)}
            >
                <Text style={styles.btn}>
                    <Ionicons name="clipboard" size={30} color="white" />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={menu_styles.voiceMenu}
                onPress={__handleGallery}
            >
                <Text style={styles.btn}>
                    <Ionicons name="images" size={30} color="white" />
                </Text>
            </TouchableOpacity>

            <ScrollView>
                {
                    state.assets.map(asset)
                }
            </ScrollView>

            <TouchableOpacity
                style={menu_styles.voiceMenu}
                onPress={__share}
            >
                <Text style={styles.btn}>
                    <Ionicons name="share" size={30} color="white" />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={menu_styles.voiceMenu}
            onPress={__handleTutorial}
            >
                <Text style={styles.btn}>
                    Tutorial
                    <Ionicons name="logo-whatsapp" size={30} color="white" />
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Menu