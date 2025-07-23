import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
const [phone, setPhone] = useState('');
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [keyboardShown, setKeyboardShown] = useState(false);
    const [confirm, setConfirm] = useState(null); // stores Firebase confirmation result
    const [isVerifying, setIsVerifying] = useState(false);
const [otpSent, setOtpSent] = useState(false);


useEffect(() => {
  if (phone.length === 10 && !otpSent) {
    const fullPhoneNumber = `+91${phone}`;
    auth()
      .signInWithPhoneNumber(fullPhoneNumber)
      .then((confirmation) => {
        setConfirm(confirmation);
        setOtpSent(true);
        console.log('OTP sent');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to send OTP');
      });
  }
}, [phone]);
    const pinInputs = useRef([]);

    const isLoginEnabled =
        phone.length === 10 && pin.every((digit) => digit !== '');
const handlePinChange = (text, index) => {
  const cleanText = text.replace(/[^0-9]/g, '');
  const newPin = [...pin];
  newPin[index] = cleanText;
  setPin(newPin);

  if (cleanText && index < 3) {
    pinInputs.current[index + 1].focus();
  }

  // Auto-submit when all 4 digits are filled
  if (newPin.every((digit) => digit !== '') && confirm && !isVerifying) {
    verifyOtp(newPin.join(''));
  }
};

const handleLogin = () => {
  if (confirm && pin.every((digit) => digit !== '')) {
    verifyOtp(pin.join(''));
  }
};

const verifyOtp = async (code) => {
  try {
    setIsVerifying(true);
    await confirm.confirm(code);
    navigation.navigate('TabNavigation');
  } catch (error) {
    alert('Incorrect OTP. Try again.');
    setPin(['', '', '', '']);
    pinInputs.current[0].focus();
  } finally {
    setIsVerifying(false);
  }
};
    // Detect keyboard status
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () =>
            setKeyboardShown(true)
        );
        const hideSub = Keyboard.addListener('keyboardDidHide', () =>
            setKeyboardShown(false)
        );

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //     style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        //     keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
        // >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                    <View
                        style={[
                            styles.container,
                            { marginTop: '5%', backgroundColor: '#FFFFFF', }
                        ]}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={keyboardShown}
                    >
                        {/* Top Row */}
                        <View style={styles.topRow}>
                            <View>
                                <Text style={styles.loginText}>Login Account</Text>
                                <Text style={styles.welcomeText}>Hello, Welcome</Text>
                            </View>
                            <View style={styles.avatarContainer}>
                              <Image source={require('../assets/user.png')}  style={styles.avatar} />
                            </View>
                        </View>

                        {/* Center Image */}
                        <Image source={require('../assets/girlimages.png')}
                            style={styles.centerImage}
                        />

                        {/* Phone Input */}
                        <Text style={styles.label}>Phone no..</Text>
                        <View
                            style={[
                                styles.phoneInputContainer,
                                phone.length === 0 ? { borderColor: 'red' } : { borderColor: 'black' },
                            ]}
                        >
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
                                onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                            />
                            {phone.length > 0 && phone.length < 10 && (
                                <TouchableOpacity onPress={() => setPhone('')}>
                                    <Image source={require('../assets/delete.jpg')} style={styles.icon} />
                                </TouchableOpacity>
                            )}
                            {phone.length === 10 && (
                                <Image source={require('../assets/check.png')} style={styles.icon} />
                            )}
                        </View>

                        {/* PIN Input */}
                        <Text style={styles.pinlabel}>4 Digit pin..</Text>
                        <View style={styles.pinContainer}>
                            {[...Array(4)].map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={(el) => (pinInputs.current[index] = el)}
                                    style={styles.pinInput}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin[index]}
                                    onChangeText={(text) => handlePinChange(text, index)}
                                />
                            ))}
                        </View>

                        {/* Forgot Pin */}
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Forgot Pin?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                         onPress={handleLogin}
                            style={[
                                styles.loginButton,
                                { backgroundColor: isLoginEnabled ? '#e22727ff' : '#ccc', },
                          { borderColor: isLoginEnabled ? '#e22727ff' : '#e22727ff', },
                            ]}
                            disabled={!isLoginEnabled}
                        >
<Text style={styles.loginButtonText}>
  {otpSent ? 'Verify OTP' : 'Sending OTP...'}
</Text>                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
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
        backgroundColor: '#ebe8e8',
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