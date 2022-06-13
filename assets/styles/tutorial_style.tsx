import { PixelRatio, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(150),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 30
},
header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
},
paragraph: {
    fontSize: 17,
    textAlign: 'center',
},
paginationWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
},
paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
},
navigation: {
  position: 'absolute',
  bottom: 0,
  left: '80%',
  right: 0,
  width: 40,
  height: 40
},
navigationText: {
  color: '#61B5D9',
  fontSize: 18
},
})