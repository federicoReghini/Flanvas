import { Dimension, StyleSheet } from "react-native";

// #66ffcc V
// #AB3113 X
// #719984 B


export default StyleSheet.create(
    {
        container: {
            backgroundColor: '#719984',
            width: '100%',
            height: '100%',

            display: 'flex',
            flexDirection: "column",
            padding: 10
        },
        viewButtons: {
            display: 'flex',
            flexDirection: 'row',
            width: '70%'
        },
        camera: {
            width: '100%',
            height: 400,
        },
        flipButton: {
            color: 'white',
            fontSize: 30
        },
        touchableOpacity: {
            width: "100%",
            height: 50,
            top: 300,
        },
        image: {
            marginTop: 20,
            width: '100%',
            height: 400
        }
    }
)