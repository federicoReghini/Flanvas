import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#1C99B4',
    padding: 10,
    margin: 3,
    textAlign: 'center',
    color: '#FFF9F5',
    borderRadius: 20,
    fontSize: 25
  },
  btnCloseModal: {
    backgroundColor: '#004F6E',
    marginTop: 60,
    padding: 10,
    margin: 3,
    textAlign: 'center',
    color: '#FFF9F5',
    borderRadius: 20,
    fontSize: 25
  },
  containerFlexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  }
})