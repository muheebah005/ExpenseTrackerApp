import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Categories from '../utils/Categories';

const CategoryFilter = ({ selected, onSelected }) => {
   return (
      <View style={styles.container}>
         <TouchableOpacity
            onPress={() => onSelected('All')}
            style={[styles.categoryButton, selected === 'All' && styles.activeBtn]}>
            <Text style={[styles.categoryText, selected === 'All' && styles.activeText]}>All</Text>
         </TouchableOpacity>

         {Categories.map((category) => (
            <TouchableOpacity
               key={category}
               onPress={() => onSelected(category)}
               style={[styles.categoryButton, selected === category && styles.activeBtn]}>
               <Text style={[styles.categoryText, selected === category && styles.activeText]}>
                  {category}
               </Text>
            </TouchableOpacity>
         ))}
      </View>
   );
};

export default CategoryFilter;

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 16,
      marginLeft: 10,
   },
   categoryButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#d1e3f3',
      margin: 4,
      marginTop: 20,
      marginLeft: 15,
   },
   activeBtn: {
      backgroundColor: '#3F51B5',
   },
   text: {
      color: '#000',
   },
   activeText: {
      color: '#fff',
   },
   categoryText: {
      color: '#000',
   },
});
