import type { ref } from "./ts/types";
const events = require('events');

const eventCustom = new events();

interface Props {
    onListening: (event: string, callback: (e: ref) => void) => any ,
    emit: (event: string, data: ref) => void

}

export const eventBus: Props = {
    onListening(event, callback) {
       //function for get the data
    //    event.stopImmediatePropagate()
            return eventCustom.on(event,  callback)


    },
    emit(event, data) {  // method for make a dispatch. Takes two parameters. thr 1st in the key for the event and the 2nd the data we want to send
        eventCustom.emit(event, data)
    },
}