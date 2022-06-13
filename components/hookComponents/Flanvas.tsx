import React, { useMemo, useRef, useState } from "react";

// native components
import SignatureScreen, { SignatureViewRef, } from "react-native-signature-canvas";

// components
import Navbar from "./Navbar";
import CustomModal from "./CustomModal";
import CustomCamera from "./CustomCamera";

// utils
// import { __on, __remove } from "../../utils/eventBus";

interface Props {
    // text: string;
    onOK?: Function
}

interface State {
    isModal: boolean,
    image: string | undefined,
    isCamera: boolean
}

const initState = {
    isModal: false,
    image: '',
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


    // working on it
    // useEffect(()=>{

    //     __on('image', e => setState({
    //         ...state,
    //         image: e
    //     }))

    //     return () => {
    //         __remove()
    //     }
    // }, [] )

    const __handleSignature = (signature: string) => {
        // console.log(signature);
        // onOK(signature);
    };

    const __handleRef = (ref: any) => () => {
        return ref();
    }

    // const __handleEmpty = () => {
    //     console.log("Empty");
    // };

    const __handlePenEraser = () => {
        if (isEraser) {
            ref.current?.draw()
            ref.current?.changePenSize(1, 1)
            isEraser = false
        } else {
            ref.current?.erase()
            ref.current?.changePenSize(10, 10)
            isEraser = true
        }
    }
    const __handleEnd = () => {
        ref.current?.readSignature()
    }

    const handleMenu_ = () => {
        setState({
            ...state,
            isModal: !state.isModal
        });
    };

    const __handleCamera_ = () => {
        setState({
            ...state,
            isCamera: !state.isCamera
        })
    }

    const saveImage_ = (e: string | undefined) => {
        console.log(e);

        setState({
            ...state,
            image: e
        })
    }

    return (
        <>
            {!state.isCamera ?
                <SignatureScreen
                    ref={ref}
                    onEnd={__handleEnd}
                    onOK={__handleSignature}
                    // onEmpty={__handleEmpty}
                    //onClear={__handleRef(ref.current?.clearSignature)}
                    autoClear={false}
                    webStyle={style}
                    bgSrc={state.image}
                    bgWidth={300}
                    bgHeight={300}
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
            />

            <CustomModal modalIsVisible={state.isModal} callback={handleMenu_} refCanvas={ref.current} />

        </>
    );
};

export default Flanvas;