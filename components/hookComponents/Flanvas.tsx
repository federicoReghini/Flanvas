import React, { useCallback, useMemo, useRef, useState } from "react";

// native components
import SignatureScreen, { SignatureViewRef, } from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library'

// components
import Navbar from "./Navbar";
import CustomModal from "./CustomModal";
import CustomCamera from "./CustomCamera";
interface Props {
    // text: string;
    onOK?: Function
}
interface State {
    isModal: boolean,
    image: string,
    imageBackground: string | undefined
    isCamera: boolean
}

const initState = {
    isModal: false,
    image: '',
    imageBackground: '',
    isCamera: false
}

const style = `.m-signature-pad {box-shadow: none; border: 1px,solid; } 
.m-signature-pad--body {border: none;}
.m-signature-pad--footer {display: none; margin: 0px;}
body,html {
width: 100%; height: 100%;}`;


const Flanvas: React.FC<Props> = () => {

    const ref = useRef<SignatureViewRef>(null);
    const [state, setState] = useState<State>(initState)

    let isEraser: boolean = false;

    const __handleSignature = (signature: string) => {

        const path = FileSystem.cacheDirectory + "sign.png";

        FileSystem.writeAsStringAsync(
            path,
            signature.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(() => FileSystem.getInfoAsync(path))
            .then(res => {
                MediaLibrary.createAssetAsync(res?.uri)

                setState({ ...state, image: res?.uri })
            })
            .catch(console.error);
    };

    const __handleRef = useCallback( (ref: any) => () => {
        return ref();
    }, [ref])

    // const __handleEmpty = () => {
    //     console.log("Empty");
    // };

    const __handlePenEraser = useCallback(() => {
        if (isEraser) {
            ref.current?.draw()
            ref.current?.changePenSize(1, 1)
             return isEraser = false
        } else {
            ref.current?.erase()
            ref.current?.changePenSize(10, 10)
             return isEraser = true
        }
    }, [isEraser])

    // const __handleEnd = () => {
    //     ref.current?.readSignature()
    // }

    const handleMenu_ = useCallback(() => {

        let img: any = ref.current?.readSignature()

        setState({
            ...state,
            image: img,
            isModal: !state.isModal
        });
    }, [state.image, state.isModal])

    const __handleCamera_ = useCallback(() => {
        setState({
            ...state,
            isCamera: !state.isCamera
        })
    }, [state.isCamera])

    const __handleConfirm = useCallback(() => {
        ref.current?.readSignature();
    }, [])

    const saveImage_ = useCallback((e: string | undefined) => {

        setState({
            ...state,
            imageBackground: e,
            isCamera: !state.isCamera
        })
    }, [state.imageBackground, state.isCamera])

    return (
        <>

            {!state.isCamera ?
                
                <SignatureScreen
                    ref={ref}
                    // onEnd={__handleEnd}
                    onOK={__handleSignature}
                    // onEmpty={__handleEmpty}
                    //onClear={__handleRef(ref.current?.clearSignature)}
                    autoClear={false}
                    webStyle={style}
                    dataURL={"data:image/png;base64," + state.imageBackground}
                //bgWidth={300}
                //bgHeight={300}
                //descriptionText={text}
                />
                :
                <CustomCamera callback={saveImage_} />
            }

            <Navbar
                callbackUndo={__handleRef(ref.current?.undo)}
                callbackRedo={__handleRef(ref.current?.redo)}
                callbackPenEraser={__handlePenEraser}
                callbackMenu={handleMenu_}
                callbackCamera={__handleCamera_}
                callbackConfirm={__handleConfirm}
            />

            {/*Cambiare nome a imgTest, immagine passata a menu per social */}
            <CustomModal modalIsVisible={state.isModal} callback={handleMenu_} refCanvas={ref.current} imgTest={state.image} />

        </>
    );
};

export default React.memo(Flanvas);