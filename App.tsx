// native components
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// styles
import { styles } from './styles_generic';

// components
import EntryApp from './EntryApp';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <EntryApp />
    </View>
  );
}