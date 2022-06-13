import {SignatureViewRef} from "react-native-signature-canvas";


export type ref = {
    hello?: string,
    changeColor?: void | undefined,
    changePenSize?: void | undefined,
    clear?: void | undefined,
    save?: void | undefined,
};

export type signatureRef = SignatureViewRef | null;