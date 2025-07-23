import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';


const Screens = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Card with Animated Image and Text */}
      <View style={styles.animatedCard}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/workinggirl.png')}
            style={styles.largeImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Hello, Biztechnovations</Text>
          <Text style={styles.subText}>Ready to start your day with some pitch decks?</Text>
        </View>
      </View>
      {/* 4 Colored Boxes (2 per row) */}
      <View style={styles.boxContainer}>
        <View style={[styles.colorBox, { backgroundColor: '#8cc443' }]}>
          <View style={styles.curveShape}>
            <Text style={styles.curveText}>03</Text>
          </View>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: '#f0af3e' }]}>
          <View style={styles.curveShape2}>
            <Text style={styles.curveText}>10</Text>
          </View>
          <Text style={styles.boxText}>Box 2</Text>
        </View>

        <View style={[styles.colorBox, { backgroundColor: '#e34444ff' }]}>
          <View style={styles.curveShape3}>
            <Text style={styles.curveText}>08</Text>
          </View>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: '#3966c2ff' }]}>
          <View style={styles.curveShape4}>
            <Text style={styles.curveText}>02</Text>
          </View>
          <Text style={styles.boxText}>Box 4</Text>
        </View>
      </View>

      {/* 4 React Cards (2 per row) */}
      <View style={styles.cardContainer}>
        <View style={styles.card}><Text>Word 1</Text></View>
        <View style={styles.card}><Text>Word 2</Text></View>
        <View style={styles.card}><Text>Word 3</Text></View>
        <View style={styles.card}><Text>Word 4</Text></View>
      </View>
</View>  );
};

export default Screens;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f0f0f0',
    padding:20
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: 45,
    width: '70%',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: '5%'
  },
  menuIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 100,
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
  },

  searchBox: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 0,
    color: 'black'
  },
  animatedCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: '5%',
    elevation: 3,
    overflow: 'visible',
    position: 'relative',
  },

  imageWrapper: {
    position: 'absolute',
    right: 1,
    bottom: 10,
    zIndex: 1,
  },

  largeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 10,
    color: '#555',
    marginTop: 5,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  colorBox: {
    width: '48%',
    height: 150,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 10,
    marginBottom: '5%',
    overflow: 'hidden',
    position: 'relative',
  },

  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    justifyContent: 'flex-start'
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  curveShape: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#6aa123',
    borderBottomLeftRadius: 80, // ✅ must be a number, not %
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  curveShape2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#c98d24',
    borderBottomLeftRadius: 80, // ✅ must be a number, not %
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  curveShape3: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#cb3535ff',
    borderBottomLeftRadius: 80, // ✅ must be a number, not %
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  curveShape4: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#2b45c8ff',
    borderBottomLeftRadius: 80, // ✅ must be a number, not %
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  curveText: {
    color: '#fff',           // Number text color
    fontWeight: 'bold',
    fontSize: 30,
    position: 'absolute',
    bottom: '50%',
    left: '60%',

  },
  card: {
    width: '48%',
    backgroundColor: '#b3e7ebff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    alignItems: 'center',
  },
});
