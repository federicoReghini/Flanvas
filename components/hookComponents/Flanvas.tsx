import React, { useRef, useState } from "react";
import SignatureScreen, { SignatureViewRef, } from "react-native-signature-canvas";
import Navbar from "./Navbar";
import CustomModal from "./CustomModal";

interface Props {
    // text: string;
    onOK?: Function
}

interface State {
    isModal: boolean
}

const initState = {
    isModal: false
}

const style = `.m-signature-pad {box-shadow: none; border: 1px,solid; } 
.m-signature-pad--body {border: none;}
.m-signature-pad--footer {display: none; margin: 0px;}
body,html {
width: 100%; height: 100%;}`;



const Flanvas: React.FC<Props> = ({ text, onOK }) => {

    const ref = useRef<SignatureViewRef>(null);
    const [state, setState] = useState<State>(initState)

    let isEraser: boolean = false;

    const handleSignature = (signature: string) => {
        console.log(signature);

        // onOK(signature);
    };

    const handleEmpty = () => {
        console.log("Empty");
    };

    const handleUndo = () => {
        ref.current?.undo()
    };

    const handleRedo = () => {
        ref.current?.redo()
    };

    const handleEnd = () => {
        ref.current?.readSignature();
    };

    const handleClear = () => {
        ref.current?.clearSignature();
    };

    const handlePenEraser = () => {
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

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }


    const handleMenu = () => {
        setState({
            ...state,
            isModal: !state.isModal
        });
    };

    return (
        <>
            <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleSignature}
                onEmpty={handleEmpty}
                //onClear={handleClear}
                autoClear={false}
                webStyle={style}
                bgSrc={getBase64FromUrl(text)}
                bgWidth={300}
                bgHeight={300}
            //descriptionText={text}
            />

            <Navbar
                callbackUndo={handleUndo}
                callbackRedo={handleRedo}
                callbackPenEraser={handlePenEraser}
                callbackMenu={handleMenu}
            />

            <CustomModal modalIsVisible={state.isModal} callback={handleMenu} refCanvas={ref.current} />

        </>
    );
};

export default Flanvas;