import React, { FunctionComponent } from 'react'
import { View, Text, Pressable } from 'react-native'

const Navbar: FunctionComponent = ({ callbackUndo, callbackRedo, callbackPenEraser, callbackMenu }) => {




    return (

        <View>
            <Pressable onPress={callbackUndo}>
                <Text>Undo</Text>
            </Pressable>

            <Pressable onPress={callbackRedo}>
                <Text>Redo</Text>
            </Pressable>

            <Pressable onPress={callbackPenEraser}>
                <Text>Pen/Eraser</Text>
            </Pressable>

            <Pressable onPress={callbackMenu}>
                <Text>Menu</Text>
            </Pressable>

        </View>

    )
}

export default Navbar