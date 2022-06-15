import React, { FunctionComponent, ReactElement, useState } from 'react';

// native components
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// styles
import { styles } from '../../assets/styles/tutorial_style';
const { width, height } = Dimensions.get('window');

// interface & type
interface State {
    currentPage: number
}

const initState = {
    currentPage: 0
}

type RootStackParamList = {
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const TutorialComponent: FunctionComponent<Props> = ({ navigation }): ReactElement => {

    const [state, setState] = useState<State>(initState);

    const setSliderPage = (event: any): void => {
        const { currentPage } = state;
        const { x }: { x: number } = event.nativeEvent.contentOffset;
        const indexOfNextScreen: number = Math.floor(x / width);

        if (indexOfNextScreen !== currentPage) {
            setState({
                ...state,
                currentPage: indexOfNextScreen,
            });
        }
    }

    const handleNavigation = (): void => {
        navigation.navigate('Home')
    }

    const { currentPage: pageIndex } = state;

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={setSliderPage}
                >
                    <View style={{ width, height }}>
                        {/* <Image source={require('../assets/sos2.jpg')} style={styles.imageStyle} /> */}
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Add Contact
                            </Text>

                            <Text style={styles.paragraph}>
                                Add contacts to your favorites and let Sos Band guide you
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        {/* <Image
                            source={require('../assets/sos3.jpg')}
                            style={styles.imageStyle}
                        /> */}
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Send Message
                            </Text>

                            <Text style={styles.paragraph}>
                                Send a message of help with your location at your angels!
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        {/* <Image
                            source={require('../assets/senseiold.png')}
                            style={styles.imageStyle}
                        /> */}
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Relax
                            </Text>

                            <Text style={styles.paragraph}>
                                Now you can enjoy your heart attack or whatever till someone comes... if they'll come!
                            </Text>
                        </View>
                    </View>

                </ScrollView>

                <View style={styles.paginationWrapper}>
                    {Array.from(Array(3).keys()).map((key, index) => (
                        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.navigation}
                    onPress={handleNavigation}
                >
                    <Text style={styles.navigationText}>
                        Start
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    );
};

export default TutorialComponent;