import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const EXPENSE_KEY = 'expenses';

export const saveExpenses = async (newExpense) => {
   try {
      const existing = await AsyncStorage.getItem(EXPENSE_KEY);
      const current = existing ? JSON.parse(existing) : [];

      const withId = { ...newExpense, id: uuidv4() };
      current.push(withId);

      await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(current));
   } catch (error) {
      console.log('Error saving expenses:', error);
      throw error;
   }
};

export const getExpenses = async () => {
   try {
      const storedExpenses = await AsyncStorage.getItem(EXPENSE_KEY);
      return storedExpenses ? JSON.parse(storedExpenses) : [];
   } catch (e) {
      console.error('Error getting expenses:', e);
      return [];
   }
};

export const deleteExpense = async (id) => {
   try {
      const json = await AsyncStorage.getItem(EXPENSE_KEY);
      const currentExpenses = json ? JSON.parse(json) : [];
      const filteredExpenses = currentExpenses.filter((expense) => expense.id !== id);

      await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(filteredExpenses));
   } catch (error) {
      console.log('Error deleting expense:', error);
   }
};
