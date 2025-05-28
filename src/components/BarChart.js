import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BarChart = ({ data = [], selectedCategory, onSelectCategory }) => {
   const maximumValue = Math.max(...data.map((item) => Number(item.amount)), 1);
   const containerHeight = 150;

   return (
      <View style={styles.container}>
         {data.map((item) => {
            const isSelected = selectedCategory === item.category;
            return (
               <TouchableOpacity
                  key={item.category}
                  onPress={() =>
                     onSelectCategory(selectedCategory === item.category ? 'All' : item.category)
                  }
                  style={styles.barWrapper}>
                  <View
                     style={[
                        styles.bar,
                        {
                           height: (item.amount / maximumValue) * containerHeight,
                           backgroundColor: item.color,
                           opacity: isSelected || selectedCategory === 'All' ? 1 : 0.4,
                           borderWidth: isSelected ? 2 : 0,
                           borderColor: isSelected ? '#fff' : 'transparent',
                        },
                     ]}
                  />
                  <Text style={styles.label}>{item.category}</Text>
               </TouchableOpacity>
            );
         })}
      </View>
   );
};

export default BarChart;

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      height: 150,
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      marginBottom: 16,
      marginTop: 25,
   },
   barWrapper: {
      alignItems: 'center',
      width: 50,
   },
   bar: {
      width: 30,
      borderRadius: 6,
   },
   label: {
      marginTop: 4,
      fontSize: 12,
      color: 'black',
      textAlign: 'center',
   },
});
