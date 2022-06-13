import EventEmitter from 'events';

const eventCustom = new EventEmitter();

type on = (event: string, callback: (e: any) => void) => void;

type emit = (event: string, data: any) => void;


export const __on: on = (event, callback) => {
    eventCustom.addListener(event, function(e: any){
        callback(e)
    })
}

export const __emit: emit = (event, data) => {
    eventCustom.emit(event, data)
}

export const __remove = () => {
    eventCustom.removeAllListeners();
}