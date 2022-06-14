import React, { FunctionComponent } from 'react';
import { Modal, Text, Pressable } from 'react-native';
import { styles } from '../../styles_generic'
import { signatureRef } from '../../utils/ts/types';

//Components
import Menu from './Menu';

interface Props {
    modalIsVisible: boolean,
    callback: () => void,
    refCanvas: signatureRef,
    imgTest: string,   //da cambiare
}

const CustomModal: FunctionComponent<Props> = ({ modalIsVisible, callback, refCanvas, imgTest }) => {

    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsVisible}
            onRequestClose={callback}>
            <Menu refCanvas={refCanvas} imgTest={imgTest} />
            <Pressable onPress={callback}>
                <Text style={styles.btnCloseModal}
                >Close Menu</Text>
            </Pressable>
        </Modal>

    );
};


export default CustomModal;