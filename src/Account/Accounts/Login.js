import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, PermissionsAndroid, NativeModules, Alert, Linking,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postauthendication } from '../../redux/action';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Login = ({ navigation }) => {
  const dispatch = useDispatch();
const [phone, setPhone] = useState(postauthendicationData?.username || '');  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [location, setLocation] = useState(null);
  const pinInputs = useRef([]);
  const { postauthendicationLoading, postauthendicationData, postauthendicationError, postauthendicationErrorInvalid } = useSelector(state => state.postauthendicationReducer);

useEffect(() => {
  if (postauthendicationLoading) return;

  const uid = postauthendicationData?.uid; 
  const errorMsg = postauthendicationError || postauthendicationErrorInvalid;

  if (uid) {
    Alert.alert('Login successful!');
    navigation.navigate('TabNavigation');
  } else if (errorMsg) {
    Alert.alert('Login Failed', errorMsg);
    setPassword('');
  }
}, [postauthendicationLoading, postauthendicationData, postauthendicationError, postauthendicationErrorInvalid]);


  useEffect(() => {
    if (mobileNumber && !phone) {
      setPhone(mobileNumber);
    }
  }, [mobileNumber]);

  
useEffect(() => {
  if (!postauthendicationData) {
    setPassword('');
  }
}, [postauthendicationData]);


  // const enableGPS = () => {
  //   RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
  //     interval: 10000,
  //     fastInterval: 5000,
  //   })
  //     .then(() => {
  //       getCurrentLocation();
  //     })
  //     .catch((err) => {
  //       Alert.alert('Location Error', 'Please enable location services.');
  //     });
  // };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        Alert.alert('Error getting location', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };



  useEffect(() => {
    const fetchSimNumber = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await requestSimPermission();
        if (hasPermission) {
          const simInfoList = await getSimNumbers();
          if (Array.isArray(simInfoList) && simInfoList.length > 0) {
            const firstSim = simInfoList.find(sim => sim.number && sim.number.length >= 10);
            if (firstSim) {
              let number = firstSim.number
                .replace(/^(\+91|91)/, '')
                .replace(/\s/g, '');
              setMobileNumber(number);
            }
          }
        }
      }
    };
    fetchSimNumber();
  }, []);

  const getSimNumbers = async () => {
    const { SimInfo } = NativeModules;
    try {
      const numbers = await SimInfo.getSimNumbers();
      return JSON.parse(numbers);
    } catch (error) {
      console.error('Error fetching SIM numbers:', error);
      return [];
    }
  };

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

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardShown(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardShown(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handlePinChange = (text, index) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newPin = [...pin];
    newPin[index] = cleanText;
    setPin(newPin);
    if (cleanText && index < 5) {
      pinInputs.current[index + 1].focus();
    }
  };
  const requestLocationPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  if (result === RESULTS.GRANTED) return true;

  const ask = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  return ask === RESULTS.GRANTED;
};
  // const handleLogin = async () => {
  //   const code = pin.join('');
  //   if (code.length !== 6) {
  //     Alert.alert('Validation', 'Invalid OTP');
  //     return;
  //   }
  //   const loginPayload = {
  //     jsonrpc: '2.0',
  //     params: {
  //       db: 'bisco_production',
  //       login: phone,
  //       password: code,
  //     },
  //   };
  //   dispatch(postauthendication(loginPayload));
  // };

  const handleLogin = () => {
  if (!phone || !password) {
    Alert.alert('Validation', 'Username and password are required');
    return;
  }

const loginPayload = {
  jsonrpc: '2.0',
  params: {
    "db": 'siddhi_live_test',
    "login": phone.trim(),
    "password": password.trim(),
  },
};

dispatch(postauthendication(loginPayload));
};


  const isLoginEnabled = pin.every((digit) => digit !== '');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<KeyboardAvoidingView
  style={{ flex: 1, backgroundColor: '#fff' }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
>
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.loginText}>Login Account</Text>
              <Text style={styles.welcomeText}>Hello, Welcome</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image source={require('../../assets/user.png')} style={styles.avatar} />
            </View>
          </View>
          <Image source={require('../../assets/girlimages.png')} style={styles.centerImage} />
          <Text style={styles.label}>Phone no..</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.flagContainer}>
              <Image source={require('../../assets/india.png')} style={styles.flag} />
            </View>
            <View style={styles.separator} />
            {/* <TextInput
              style={styles.phoneInput}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              value={phone}
              maxLength={10}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setPhone(cleaned);
              }}
            /> */}

            <TextInput
  style={styles.phoneInput}
  keyboardType="default" 
  placeholder="Enter username"
  placeholderTextColor="#999"
  value={phone}
  onChangeText={(text) => setPhone(text)} 
/>
            {/* {phone.length === 10 && (
              <Image source={require('../../assets/check.png')} style={styles.icon} />
            )} */}
          </View>
          {/* <Text style={styles.pinlabel}>6 Digit OTP</Text>
          <View style={styles.pinContainer}>
            {[...Array(6)].map((_, index) => (
              <TextInput
                key={index}
                ref={(el) => (pinInputs.current[index] = el)}
                style={[
                  styles.pinInput,
                  { backgroundColor: '#ffffffff' },
                ]}
                maxLength={1}
                keyboardType="numeric"
                value={pin[index]}
                onChangeText={(text) => handlePinChange(text, index)}
                editable={true}
              />
            ))}
          </View> */}

<Text style={styles.pinlabel}>Password</Text>
<View style={[styles.phoneInputContainer, { height: 45, marginBottom: 20 }]}>
  <TextInput
    style={{ flex: 1, fontSize: 15, color: '#000' }}
    secureTextEntry={!showPassword} // toggles visibility
    placeholder="Enter password"
    placeholderTextColor="#999"
    value={password}
    onChangeText={(text) => setPassword(text)}
  />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <MaterialCommunityIcons 
      name={showPassword ? 'eye' : 'eye-off'}  // eye/eye-off toggle
      size={20} 
      color="#999" 
    />
  </TouchableOpacity>
</View>

          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.loginButton,
              {
                backgroundColor: isLoginEnabled ? '#e22727ff' : '#ccc',
              },
            ]}
            // disabled={!isLoginEnabled}>
           disabled={!phone || !password}
>

            <Text style={styles.loginButtonText}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
  </ScrollView>
</KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10%',
    marginTop: '8%',
  },
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  avatarContainer: {
    backgroundColor: '#eee',
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  centerImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginVertical: 30,
    marginTop: '20%',
  },
  label: {
    fontSize: 14,
    marginTop: '5%',
    marginBottom: '2%',
    paddingHorizontal: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: '#fff',
  },
  flagContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  separator: {
    width: 1,
    height: '80%',
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  pinlabel: {
    fontSize: 14,
    marginTop: '5%',
    paddingHorizontal: 10,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 20,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    borderRadius: 50,
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginBottom: '2%',
    fontSize: 12,
    color: '#666'
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 10,

  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',

  },
});
