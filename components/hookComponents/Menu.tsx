import React from 'react'
import { View, Text, Pressable } from 'react-native'

const Menu = () => {

    return (

        <View>
            <Pressable>
                <Text>Color</Text>
            </Pressable>

            <Pressable>
                <Text>Pen Size</Text>
            </Pressable>

            <Pressable>
                <Text>Clear</Text>
            </Pressable>

            <Pressable>
                <Text>Camera</Text>
            </Pressable>

            <Pressable>
                <Text>Gallery</Text>
            </Pressable>

            <Pressable>
                <Text>Save</Text>
            </Pressable>

            <Pressable>
                <Text>WhatsApp</Text>
            </Pressable>

        </View>
    )
}

export default Menu