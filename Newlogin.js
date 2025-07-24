import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  NativeModules,
} from 'react-native';

const MobileLoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');

useEffect(() => {
  const fetchSimNumber = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestSimPermission();
      if (hasPermission) {
        const simInfoList = await getSimNumbers();

        if (Array.isArray(simInfoList) && simInfoList.length > 0) {
          const firstSim = simInfoList.find(sim => sim.number && sim.number.length >= 10);
          if (firstSim) {
            let number = firstSim.number.replace('+91', '').replace(/\s/g, '');
            setMobileNumber(number);
          }
        }
      }
    }
  };

  fetchSimNumber();
}, []);

const requestSimPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    ]);

    return (
      granted['android.permission.READ_PHONE_NUMBERS'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.READ_PHONE_STATE'] === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.warn('Permission error:', err);
    return false;
  }
};


  const getSimNumbers = async () => {
    const { SimInfo } = NativeModules;
    try {
      const numbers = await SimInfo.getSimNumbers();
      return JSON.parse(numbers); // 👈 ensure it’s parsed if returned as JSON string
    } catch (error) {
      console.error('Error fetching SIM numbers:', error);
      return [];
    }
  };

  const handleLogin = () => {
    if (mobileNumber.length === 10) {
      Alert.alert('Proceeding with:', mobileNumber);
    } else {
      Alert.alert('Invalid number', 'Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="number-pad"
        maxLength={10}
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MobileLoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
