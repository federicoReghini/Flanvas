import React, { FunctionComponent } from 'react';
import { Modal, Text, Pressable } from 'react-native';
import { signatureRef } from '../../utils/ts/types';

//Components
import Menu from './Menu';

interface Props {
    modalIsVisible: boolean,
    callback: () => void,
    refCanvas: signatureRef
}

const CustomModal: FunctionComponent<Props> = ({ modalIsVisible, callback, refCanvas }) => {

    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsVisible}
            onRequestClose={callback}>
            <Text>Menu</Text>
            <Menu refCanvas={refCanvas}  />
            <Pressable onPress={callback}>
                <Text style={{ marginTop: 100 }}>Close Menu</Text>
            </Pressable>
        </Modal>

    );
};

// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
// });

export default CustomModal;