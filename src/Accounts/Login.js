import React, { useState, useRef, useEffect } from 'react';
import {View,Text,TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, Platform ,
    PermissionsAndroid,
  NativeModules,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import RNSimData from 'react-native-sim-data';

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState(''); 
    const [mobileNumber, setMobileNumber] = useState('');

const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const pinInputs = useRef([]);

  useEffect(() => {
    if (phone.length === 10 && !otpSent) {
      const fullPhoneNumber = `+91${phone}`;
      console.log('Sending OTP to', fullPhoneNumber);

      auth()
        .signInWithPhoneNumber(fullPhoneNumber)
        .then((confirmation) => {
          setConfirm(confirmation);
          setOtpSent(true);
          console.log('OTP sent successfully');
        })
        .catch((error) => {
          console.error('Failed to send OTP:', error);
          alert('Failed to send OTP. Please try again.');
        });
    }
  }, [phone]);

  
useEffect(() => {
  if (mobileNumber && !phone) {
    setPhone(mobileNumber);
  }
}, [mobileNumber]);

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
      return JSON.parse(numbers); // 👈 ensure it’s parsed if returned as JSON string
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

  const handleLogin = async () => {
    const code = pin.join('');
    if (code.length !== 6 || !confirm) {
      alert('Invalid OTP');
      return;
    }

    try {
      setIsVerifying(true);
      await confirm.confirm(code); 
      alert('Please otp verified');
      navigation.navigate('TabNavigation'); 
    } catch (error) {
      console.error('OTP verification failed', error);
      alert('Incorrect OTP. Try again.');
      setPin(['', '', '', '','','']);
      pinInputs.current[0].focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const isLoginEnabled = pin.every((digit) => digit !== '');

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: '#fff' }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={styles.container}>
          {/* Header */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.loginText}>Login Account</Text>
              <Text style={styles.welcomeText}>Hello, Welcome</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image source={require('../assets/user.png')} style={styles.avatar} />
            </View>
          </View>

          {/* Image */}
          <Image source={require('../assets/girlimages.png')} style={styles.centerImage} />

          {/* Phone Input */}
          <Text style={styles.label}>Phone no..</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.flagContainer}>
              <Image source={require('../assets/india.png')} style={styles.flag} />
            </View>
            <View style={styles.separator} />
<TextInput
  style={styles.phoneInput}
  keyboardType="phone-pad"
  placeholder="Enter phone number"
  placeholderTextColor="#999"
  value={phone}
  maxLength={10}
  onChangeText={(text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhone(cleaned);
    setOtpSent(false);
    setConfirm(null);
  }}
/>

            {phone.length === 10 && (
              <Image source={require('../assets/check.png')} style={styles.icon} />
            )}
          </View>
 <Text style={styles.pinlabel}>6 Digit OTP</Text>

<View style={styles.pinContainer}>
  {[...Array(6)].map((_, index) => (
    <TextInput
      key={index}
      ref={(el) => (pinInputs.current[index] = el)}
      style={[
        styles.pinInput,
        !otpSent && { backgroundColor: '#cacacaff' },
      ]}
      maxLength={1}
      keyboardType="numeric"
      value={pin[index]}
      onChangeText={(text) => otpSent && handlePinChange(text, index)}
      editable={otpSent}
    />
  ))}
</View>
<TouchableOpacity
  onPress={handleLogin}
  style={[
    styles.loginButton,
    {
      backgroundColor: isLoginEnabled ? '#e22727ff' : '#ccc',
    },
  ]}
  disabled={!isLoginEnabled || isVerifying}
>
  <Text style={styles.loginButtonText}>
    {isVerifying ? 'Verifying...' : 'Verify OTP'}
  </Text>
</TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
</TouchableWithoutFeedback>
  );
};

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
        color:'#666'
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

export default Login;