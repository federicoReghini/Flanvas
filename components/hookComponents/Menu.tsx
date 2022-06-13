import React, { FunctionComponent, useState, useEffect, ReactElement } from 'react';

// native components
import { View, Text, Pressable } from 'react-native';

// style
import { styles } from '../../styles_generic';
import { menu_styles } from '../../assets/styles/menu_styles';

// type
import { signatureRef } from '../../utils/ts/types';


interface Props {
    refCanvas: signatureRef,
    callback: () => void
}

interface State {
    isPalette: boolean
}

const initState = {
    isPalette: false
}



const palette = ['#000000', '#FF4848', '#387CFF', '#3CFF72', '#D560FE', '#FF8A00']



const Menu: FunctionComponent<Props> = ({ refCanvas, callback }) => {

    const [state, setState] = useState<State>(initState)

    let isModal: boolean = false;

    /*     useEffect( //callback, [isModal]) */


    const handleCallback = (ref: any, params: any) => () => {

        isModal = true

        switch (ref) {

            case refCanvas?.changePenColor: return refCanvas?.changePenColor(params)
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
                <View style={{ backgroundColor: color, width: 20, height: 20 }}></View>
            </Pressable>
        )
    }

    return (

        <View>
            <Pressable onPress={handlePalette}
            >

                <Text style={styles.btn}>Color</Text>
            </Pressable>
            <View style={styles.containerFlexRow}>

                {
                    state.isPalette &&
                    palette.map(map)
                }
                
            </View>

            <Pressable
                onPress={handleCallback(refCanvas?.changePenSize, 3)}
            >
                <Text style={styles.btn}>Pen Size</Text>
            </Pressable>

            <Pressable
                onPress={handleCallback(refCanvas?.clearSignature, null)}
            >
                <Text
                    style={styles.btn}
                >
                    Clear
                </Text>
            </Pressable>

            <Pressable
            >
                <Text style={styles.btn}>Camera</Text>
            </Pressable>

            <Pressable
            >
                <Text style={styles.btn}>Gallery</Text>
            </Pressable>

            <Pressable
            >
                <Text style={styles.btn}>Save</Text>
            </Pressable>

            <Pressable
            >
                <Text style={styles.btn}>WhatsApp</Text>
            </Pressable>

        </View>
    )
}

export default Menu