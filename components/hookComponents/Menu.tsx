import React, { FunctionComponent, useState, ReactElement } from 'react';

// native components
import { View, Text, Pressable, Share } from 'react-native';
import * as Sharing from 'expo-sharing';


//Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';

// style
import { styles } from '../../styles_generic';
import { menu_styles } from '../../assets/styles/menu_styles';

// type
import { signatureRef } from '../../utils/ts/types';
interface Props {
    refCanvas: signatureRef,
    imgTest: string
}

interface State {
    isPalette: boolean
    isPenSize: boolean
    colorIcon: string
}

const initState = {
    isPalette: false,
    isPenSize: false,
    colorIcon: 'black'
}



const palette = ['#000000', '#FF4848', '#387CFF', '#3CFF72', '#D560FE', '#FF8A00']



const Menu: FunctionComponent<Props> = ({ refCanvas, imgTest }) => {

    const [state, setState] = useState<State>(initState)

    let isModal: boolean = false;

    const handleCallback = (ref: any, params: any) => () => {

        isModal = true

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

    const map = (color: string, key: number): ReactElement => {
        return (
            <Pressable
                key={key}
                style={menu_styles.paletteWrapper}
                onPress={handleCallback(refCanvas?.changePenColor, color)}>
                <View style={{ backgroundColor: color, width: 30, height: 30, borderRadius: 50 }}></View>
            </Pressable>
        )
    }

    const __sendWhatsappMessage = async () => {
        const result = await Sharing.isAvailableAsync();

        if(result){
            await Sharing.shareAsync(imgTest, {
                dialogTitle: 'che figata di disegno'
            })
        }
        // const result = await Share.share({
            //url: `data:image/jpeg;base64,${imgTest}`,
        //     url: imgTest
        // });
    }


 /*    const __handleTutorial = () => {
        props.navigation.navigate('Home')
    } */

    return (

        <View style={menu_styles.menu}>
            <Pressable
                style={menu_styles.voiceMenu}
                onPress={handlePalette}
            >
                <Text style={styles.btn}>
                    Color
                    <Ionicons name="color-palette" size={30} color={state.colorIcon} />
                </Text>
            </Pressable>
            <View style={styles.containerFlexRow}>

                {
                    state.isPalette &&
                    palette.map(map)
                }

            </View>

            <Pressable
                style={menu_styles.voiceMenu}
                onPress={handleCallback(refCanvas?.changePenSize, 3)}
            >
                <Text style={styles.btn}>
                    Pen Size
                    <Ionicons name="resize" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable
                style={menu_styles.voiceMenu}
                onPress={handleCallback(refCanvas?.clearSignature, null)}
            >
                <Text style={styles.btn}>
                    Clear
                    <Ionicons name="clipboard" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable
                style={menu_styles.voiceMenu}
            >
                <Text style={styles.btn}>
                    Camera
                    <Ionicons name="camera" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable
                style={menu_styles.voiceMenu}
            >
                <Text style={styles.btn}>
                    Gallery
                    <Ionicons name="images" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable
                style={menu_styles.voiceMenu}
            >
                <Text style={styles.btn}>
                    Save
                    <Ionicons name="save" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable
                style={menu_styles.voiceMenu}
                onPress={__sendWhatsappMessage}
            >
                <Text style={styles.btn}>
                    WhatsApp
                    <Ionicons name="logo-whatsapp" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable
                style={menu_styles.voiceMenu}
                //onPress={__handleTutorial}
            >
                <Text style={styles.btn}>
                    Tutorial
                    <Ionicons name="logo-whatsapp" size={30} color="black" />
                </Text>
            </Pressable>

        </View>
    )
}

export default Menu