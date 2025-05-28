import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExpenseItems = ({ item, backgroundColor, onDelete }) => {
   const formattedDate = item.date.replace(/-/g, '/');

   return (
      <View style={[styles.itemContainer, { backgroundColor: backgroundColor }]}>
         <View style={styles.itemTitle}>
            <Text style={styles.itemText}>{item.category}</Text>

            <Text style={styles.itemText}>{formattedDate}</Text>
         </View>

         <View style={styles.itemRow}>
            <Text style={styles.itemText}>${item.amount}</Text>
            <TouchableOpacity onPress={() => onDelete(item)}>
               <Ionicons name="trash-bin" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default ExpenseItems;

const styles = StyleSheet.create({
   itemContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderRadius: 10,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
   },
   itemText: {
      color: '#fff',
      fontSize: 16,
      marginTop: 8,
   },
   itemRow: {
      flexDirection: 'row',
      marginTop: 8,
      marginRight: 8,
   },
   icon: {
      marginTop: 5,
      marginLeft: 40,
   },
});
