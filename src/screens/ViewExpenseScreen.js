import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BarChart from '../components/BarChart';
import CategoryFilter from '../components/CategoryFilter';
import ExpenseItems from '../components/ExpenseItems';
import { deleteExpense, getExpenses } from '../storage/Storage';

const ViewExpenseScreen = () => {
   const navigation = useNavigation();
   const [expenses, setExpenses] = useState([]);
   const [selected, setSelected] = useState('All');

   const handleAddExpenseScreen = () => {
      navigation.navigate('AddExpense');
   };

   const mergeExpenses = (expenses) => {
      const map = {};

      expenses.forEach(({ id, amount, category, date }) => {
         const key = `${category.trim().toLowerCase()}-${date.trim()}`;

         if (map[key]) {
            map[key].amount += Number(amount);
            map[key].ids.push(id);
         } else {
            map[key] = {
               amount: Number(amount),
               category: category.trim(),
               date: date.trim(),
               ids: [id],
            };
         }
      });

      return Object.values(map).map((exp) => ({
         ...exp,
         amount: exp.amount.toFixed(2),
      }));
   };

   const savedExpenses = async () => {
      const all = await getExpenses();
      const merge = mergeExpenses(all);
      setExpenses(merge);
   };

   const handleDelete = async (item) => {
      if (item.ids && item.ids.length > 0) {
         await deleteExpense(item.ids[0]);
      }
      const updated = await getExpenses();
      const merge = mergeExpenses(updated);
      setExpenses(merge);
   };

   useFocusEffect(
      React.useCallback(() => {
         savedExpenses();
      }, [])
   );

   const filteredExpenses = useMemo(() => {
      return selected === 'All' ? expenses : expenses.filter((exp) => exp.category === selected);
   }, [expenses, selected]);

   const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#8E44AD', '#2ECC71'];

   const colorMap = useMemo(() => {
      const map = {};
      expenses.forEach((e, idx) => {
         if (!map[e.category]) {
            map[e.category] = colors[idx % colors.length];
         }
      });
      return map;
   }, [expenses]);

   const chartArray = useMemo(() => {
      const grouped = {};
      expenses.forEach((e) => {
         if (!grouped[e.category]) grouped[e.category] = 0;
         grouped[e.category] += Number(e.amount);
      });
      return Object.keys(grouped).map((key) => ({
         category: key,
         amount: grouped[key],
         color: colorMap[key],
      }));
   }, [expenses]);

   const total = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

   return (
      <SafeAreaView style={styles.container}>
         {/* header */}
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Expense Tracker</Text>
            <TouchableOpacity onPress={handleAddExpenseScreen}>
               <Ionicons name="add-circle" size={30} color="#fff" style={styles.addIcon} />
            </TouchableOpacity>
         </View>

         <Text style={styles.totalText}>
            Total {selected !== 'All' ? `(${selected})` : ''}: $
            {Number(total).toLocaleString(undefined, {
               minimumFractionDigits: 2,
               maximumFractionDigits: 2,
            })}
         </Text>

         <BarChart data={chartArray} selectedCategory={selected} onSelectCategory={setSelected} />

         <CategoryFilter selected={selected} onSelected={setSelected} />

         {filteredExpenses.length === 0 ? (
            <Text style={styles.noData}>No expenses to show</Text>
         ) : (
            <FlatList
               data={filteredExpenses}
               renderItem={({ item }) => (
                  <ExpenseItems
                     item={item}
                     onDelete={handleDelete}
                     backgroundColor={colorMap[item.category]}
                  />
               )}
               keyExtractor={(item, index) =>
                  `${item.category.trim().toLowerCase()}-${item.date.trim()}-${index}`
               }
               contentContainerStyle={styles.flatListContent}
               style={styles.flatList}
            />
         )}
      </SafeAreaView>
   );
};

export default ViewExpenseScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F1F3F4',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'centers',
      backgroundColor: '#3F51B5',
      padding: 20,
   },
   headerTitle: {
      color: '#fff',
      marginLeft: 110,
      fontSize: 22,
      marginTop: 3,
   },
   addIcon: {
      marginLeft: 90,
   },
   totalText: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      marginTop: 20,
      marginLeft: 10,
   },
   noData: {
      textAlign: 'center',
      marginTop: 40,
      color: '#ccc',
      fontSize: 16,
      marginTop: -5,
   },
   flatList: {
      padding: 10,
   },
   flatListContent: {
      padding: 10,
      borderRadius: 10,
      color: '#fff',
   },
});
