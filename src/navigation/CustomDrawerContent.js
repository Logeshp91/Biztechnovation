import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = () => {
  const navigation = useNavigation();

  const profilePicSource = require('../assets/check.png');

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <Image 
          source={profilePicSource}
          style={styles.image} 
        />
        <View style={styles.userDataContainer}>
          <Text style={styles.userData}>John Doe</Text>
          <Text style={styles.userData}>johndoe@example.com</Text>
        </View>
      </View>
      <DrawerContentScrollView style={styles.lowerHalf}>
        <TouchableOpacity onPress={() => navigation.navigate('Screens')}>
          <Text style={styles.drawerItem}>Set MPIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.drawerItem}>Home</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  upperHalf: {
    height: 250,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerHalf: {
    backgroundColor: '#ccc',
  },
  drawerItem: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 80,
    marginTop: 20,
  },
  userDataContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  userData: {
    fontSize: 16,
    color: 'white',
  },
});

export default CustomDrawerContent;
