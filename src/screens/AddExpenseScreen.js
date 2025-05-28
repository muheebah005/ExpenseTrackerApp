import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
   Button,
   Keyboard,
   Platform,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { saveExpenses } from '../storage/Storage';
import Categories from '../utils/Categories';

const AddExpenseScreen = () => {
   const navigation = useNavigation();
   const [amount, setAmount] = useState('');
   const [date, setDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [categoryOpen, setCategoryOpen] = useState(false);
   const [categoryValue, setCategoryValue] = useState(Categories[0]);
   const [categoryItems, setCategoryItems] = useState(
      Categories.map((cat) => ({ label: cat, value: cat }))
   );

   const handleAddButton = async () => {
      if (!amount || isNaN(amount)) {
         return;
      }

      const formattedDate = date.toISOString().split('T')[0];
      const addNewExpenses = { id: uuidv4(), amount, category: categoryValue, date: formattedDate };
      try {
         await saveExpenses(addNewExpenses);
         navigation.goBack();
      } catch (error) {
         console.log('Error saving expenses:', error);
      }
   };

   const handleDateChange = (event, selectedDate) => {
      if (selectedDate) {
         setDate(selectedDate);
      }
   };

   const handleGoBack = () => {
      navigation.goBack();
   };

   return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
         <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
               <TouchableOpacity onPress={handleGoBack}>
                  <Entypo name="chevron-left" size={28} color="#fff" />
               </TouchableOpacity>
               <Text style={styles.headerText}>Add Expense</Text>
            </View>

            {/* category */}
            <Text style={styles.categoryText}>Category: </Text>

            <DropDownPicker
               open={categoryOpen}
               value={categoryValue}
               items={categoryItems}
               setOpen={setCategoryOpen}
               setValue={setCategoryValue}
               setItems={setCategoryItems}
               placeholder="Select a category"
               TickIconComponent={() => null}
               style={{
                  borderColor: '#888',
                  marginBottom: 12,
                  backgroundColor: categoryValue ? '#fff' : '#fff',
               }}
               dropDownContainerStyle={{
                  borderColor: '#888',
                  backgroundColor: '#fff',
               }}
            />

            {/* Amount */}

            <TextInput
               value={amount}
               onChangeText={setAmount}
               keyboardType="numeric"
               style={styles.input}
               placeholder="Enter Amount"
               placeholderTextColor="#999"
            />

            {/* date */}
            <Text style={styles.dateText}>Date: </Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
               <View style={styles.dateInputContainer}>
                  <TextInput
                     style={[styles.dateInput, { flex: 1, marginBottom: 0 }]}
                     value={`${date.getFullYear()}/${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`}
                     editable={false}
                     pointerEvents="none"
                  />
                  <Entypo
                     name="chevron-small-down"
                     size={20}
                     color="#888"
                     style={{ marginRight: 10 }}
                  />
               </View>
            </TouchableOpacity>

            {showDatePicker && Platform.OS === 'ios' && (
               <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                  <DateTimePicker
                     value={date}
                     mode="date"
                     display="compact"
                     onChange={handleDateChange}
                     style={{ backgroundColor: '#fff' }}
                  />
                  <Button title="Done" onPress={() => setShowDatePicker(false)} />
               </View>
            )}

            {/* button */}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleAddButton}>
               <Text style={styles.buttonText}>Add Expense</Text>
            </TouchableOpacity>
         </View>
      </TouchableWithoutFeedback>
   );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F1F3F4',
   },
   header: {
      marginTop: 10,
      padding: 20,
      flexDirection: 'row',
      backgroundColor: '#3F51B5',
   },
   headerText: {
      marginLeft: 98,
      marginTop: 5,
      fontSize: 22,
      color: '#fff',
   },
   categoryText: {
      marginLeft: 10,
      marginBottom: 10,
      fontSize: 17,
      marginTop: 15,
   },
   input: {
      backgroundColor: '#fff',
      padding: 15,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      fontSize: 16,
   },
   dateText: {
      fontSize: 17,
      marginTop: 5,
      marginLeft: 10,
   },
   buttonContainer: {
      marginTop: 25,
      backgroundColor: '#3F51B5',
      padding: 15,
      width: '50%',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 15,
   },
   buttonText: {
      color: '#fff',
      fontSize: 15,
   },
   dateInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#888',
      borderRadius: 8,
      backgroundColor: '#fff',
      marginTop: 10,
      marginBottom: 10,
      height: 50,
   },
   dateInput: {
      backgroundColor: '#fff',
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,

      fontSize: 16,
      color: 'black',
   },
});
