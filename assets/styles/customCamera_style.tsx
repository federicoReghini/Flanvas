import { StyleSheet } from "react-native";

export const customCamera_style = StyleSheet.create({
    camera: {
        width: '100%',
        height: '100%',
    },
    viewButtons: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'space-between',
    },
    touchableOpacity: {
        width: 100,
        height: 50,
    },
    buttonCamera: {
        backgroundColor: 'white',
        textAlign: 'center',
        marginLeft: '20%',
        width: 60,
        height: 60,
        borderRadius: 40
    },
})