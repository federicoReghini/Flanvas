// native components
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView} from 'react-native';

// styles
import { styles } from './styles_generic';

// components
import EntryApp from './EntryApp';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <EntryApp />
    </SafeAreaView>
  );
}