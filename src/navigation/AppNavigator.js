import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ViewExpenseScreen from '../screens/ViewExpenseScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
   return (
      <Stack.Navigator initialRouteName="ViewExpenses" screenOptions={{ gestureEnabled: false }}>
         <Stack.Screen
            name="ViewExpenses"
            component={ViewExpenseScreen}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
};

export default AppNavigator;

const styles = StyleSheet.create({});
