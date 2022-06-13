import React, { FunctionComponent } from 'react';

// native components
import { View, Text, Pressable } from 'react-native';

// style
import { styles } from '../../styles_generic';

// type
import { signatureRef } from '../../utils/ts/types';

interface Props  {
    refCanvas: signatureRef
}

const Menu: FunctionComponent<Props> = ({ refCanvas }) => {

    const handleCallback = (ref: signatureRef, params: any) => () => {
        switch (ref) {

            case refCanvas?.changePenColor: return refCanvas?.changePenColor(params);
            case refCanvas?.changePenSize: return refCanvas?.changePenSize(params, params);
            case refCanvas?.clearSignature: return refCanvas?.clearSignature();

            default:
                return null;
        }
    }

    return (

        <View>
            <Pressable
                onPress={handleCallback(refCanvas.changePenColor, 'red')}
            >
                <Text style={styles.btn}>Color</Text>
            </Pressable>

            <Pressable
                onPress={handleCallback(refCanvas.changePenSize, 3)}
            >
                <Text style={styles.btn}>Pen Size</Text>
            </Pressable>

            <Pressable
            onPress={handleCallback(refCanvas.clearSignature, null)}
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