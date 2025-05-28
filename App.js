import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
   return (
      <NavigationContainer>
         <AppNavigator />
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({});
