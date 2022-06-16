import React, { FunctionComponent, ReactElement, useState } from 'react';

// native components
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const TutorialComponent: FunctionComponent = (): ReactElement => {

    const [state, setState] = useState<State>(initState);

    const navigate: any = useNavigation();

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
        navigate.navigate('Home')
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
                    <View style={{ width, height: 100 }}>
                        <Image source={require('../../assets/tutorial1.png')} style={styles.imageStyle} />
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Flanvas
                            </Text>

                            <Text style={styles.paragraph}>
                                Welcome on Flanvas! An app for your needs
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        <Image
                            source={require('../../assets/tutorial2.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Undo & Redo
                            </Text>

                            <Text style={styles.paragraph}>
                                You can use the two arrows(undo and redo) for go back and forward
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        <Image
                            source={require('../../assets/tutorial3.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Pen & Erase
                            </Text>

                            <Text style={styles.paragraph}>
                                Draw or Erase what ever you want
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        <Image
                            source={require('../../assets/tutorial4.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Camera
                            </Text>

                            <Text style={styles.paragraph}>
                                Take a photo(or select one from your gallery) and put it as background
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        <Image
                            source={require('../../assets/tutorial5.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Save
                            </Text>

                            <Text style={styles.paragraph}>
                                You can save your Draw whenever you want
                            </Text>
                        </View>
                    </View>

                    <View style={{ width, height }}>
                        <Image
                            source={require('../../assets/tutorial6.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>

                            <Text style={styles.header}>
                                Menu
                            </Text>

                            <Text style={styles.paragraph}>
                                In the menu you can: change color, resize, clear, see Draws and share
                            </Text>
                        </View>
                    </View>

                </ScrollView>

                <View style={styles.paginationWrapper}>
                    {Array.from(Array(6).keys()).map((key, index) => (
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