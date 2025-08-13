import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, PermissionsAndroid, NativeModules, Alert, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postauthendication } from '../../redux/action';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
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
    "db": 'bisco_siddhi',
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
<TextInput
  style={[styles.phoneInputContainer, { height: 45, marginBottom: 20 }]}
  secureTextEntry={true}
  placeholder="Enter password"
  placeholderTextColor="#999"
  value={password}
  onChangeText={(text) => setPassword(text)}
/>
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

///

//createvisit

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Animatable from 'react-native-animatable';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postcreatevisit } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const CreateVisit = ({ navigation }) => {
    const [customerName, setCustomerName] = useState('');
    const [purposeOfVisit, setPurposeOfVisit] = useState('');
    const [brand, setBrand] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [quantityTons, setQuantityTons] = useState('');
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [reminderDate, setReminderDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [enquiryChannel, setEnquiryChannel] = useState(null);
    const [iscustomeroptions,setIscustomeroptions] =useState([])
    const [enquiryOptions, setEnquiryOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const dispatch = useDispatch();
    const { postcreatevisitLoading, postcreatevisitData, postcreatevisitError, postcreatevisitInvalid } = useSelector(state => state.postcreatevisitReducer);

    const visitTypes = [
        { label: 'Visit A', value: 'A' },
        { label: 'Visit B', value: 'B' },
        { label: 'search engine', value: 'C' },
    ];
    const customerSegmentOptions = [
        { label: 'Retail', value: 'Retail' },
        { label: 'Wholesale', value: 'Wholesale' },
        { label: 'Distributor', value: 'Distributor' },
    ];



    const onHandlingenquirychannel = () => {
        const loginPayload = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": {
                "model": "utm.source",
                "method": "search_read",
                "args": [],
                "kwargs": {
                    "fields": ["id","name"]
                }
            }
        }
        dispatch(postcreatevisit(loginPayload));
    }
useEffect(() => {
  if (postcreatevisitData && Array.isArray(postcreatevisitData)) {
    const uniqueData = Array.from(
      new Map(postcreatevisitData.map(item => [item.name, item])).values()
    );

    setEnquiryOptions(
      uniqueData.map(item => ({
        label: item.name,
        value: item.id     
      }))
    );
  }
}, [postcreatevisitData]);
    const onHandlingCustomer = () => {
        const loginPayload = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": {
                "model": "res.partner",
                "method": "search_read",
                "args": [],
                "kwargs": {
                    "fields": ["id", "name"]
                }
            },
            id: Date.now()
        }
        dispatch(postcreatevisit(loginPayload));
    }

    const onHandlingiscustomer = () => {
          const loginPayload = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": {
                "model": "customer.visit",
                "method": "search_read",
                "args": [],
                "kwargs": {
                    "fields": ["customer_state"]
                }
            },
            id: Date.now()
        }
        dispatch(postcreatevisit(loginPayload));
    }   

 useEffect(() => {
  if (postcreatevisitData && Array.isArray(postcreatevisitData)) {
    const customerDropdownOptions = postcreatevisitData.map(item => ({
      label: item.name,
      value: item.id
    }));
    setCustomerOptions(customerDropdownOptions);
  }
}, [postcreatevisitData]);

    return (

        <ImageBackground
            source={require('../../../assets/backgroundimg.png')}
            style={{ flex: 1, resizeMode: 'cover', padding: 20 }}>
            <View >

                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Create Visit</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.dropdowntitle, { justifyContent: 'flex-start' }]}>Is Customer</Text>
                        <Text style={[styles.dropdowntitle, { marginLeft: '32%' }]}>Enquiry Channel</Text>
                    </View>
                    <Animatable.View animation="fadeInUp" duration={1000} delay={500}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Dropdown
                                style={styles.dropdownmain}
                                data={iscustomeroptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Enquiry Channel"
                                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                                value={iscustomeroptions}
                                onFocus={onHandlingiscustomer}
                                onChange={item => setIscustomeroptions(item.value)}
                            />


                            <Dropdown
                                style={styles.dropdownmain}
                                data={enquiryOptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Enquiry Channel"
                                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                                value={enquiryChannel}
                                onFocus={() => {
                                    console.log("Dropdown focused");
                                    onHandlingenquirychannel();
                                }}
                                onChange={item => {
                                    console.log("Selected Enquiry Channel:", item);
                                    setEnquiryChannel(item.value);
                                }}
                            />
                        </View>
                    </Animatable.View>
                    <Text style={styles.dropdowntitle}>Customer Name</Text>
                    <Animatable.View animation="fadeInUp" duration={1000} delay={100}>
                        <Dropdown
                            style={styles.dropdownmain}
                            data={customerOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Customer"
                            value={customerName}
                            placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                            onFocus={() => {
                                console.log("Dropdown focused");
                                onHandlingCustomer();
                            }}
                            onChange={item => setCustomerName(item.value)}
                        />
                    </Animatable.View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[styles.dropdowntitle, { justifyContent: 'flex-start' }]}>Purpose of Visit</Text>
                        <Text style={[styles.dropdowntitle, { marginLeft: '26%' }]}>Brand</Text>
                    </View>
                    <Animatable.View animation="fadeInUp" duration={1000} delay={300}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Dropdown
                                style={styles.dropdownmain}
                                data={customerSegmentOptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Purpose of Visit"
                                value={purposeOfVisit}
                                onChange={item => setPurposeOfVisit(item.value)}
                                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                            />
                            <Dropdown
                                style={styles.dropdownmain}
                                data={customerSegmentOptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Brand"
                                value={brand}
                                onChange={item => setBrand(item.value)}
                                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                            />
                        </View>
                    </Animatable.View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[styles.dropdowntitle, { justifyContent: 'flex-start' }]}>Product Category</Text>
                        <Text style={[styles.dropdowntitle, { marginLeft: '23%' }]}>Qty (Tons)</Text>
                    </View>
                    <Animatable.View animation="fadeInUp" duration={1000} delay={500}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Dropdown
                                style={styles.dropdownmain}
                                data={customerSegmentOptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Product Category"
                                value={productCategory}
                                onChange={item => setProductCategory(item.value)}
                                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                            />
                            <TextInput
                                style={styles.inputBoxcustomerfieldqty}
                                placeholder="Qty"
                                placeholderTextColor="#c6c4c4"
                                value={quantityTons}
                                onChangeText={setQuantityTons}
                            />
                        </View>
                    </Animatable.View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Stage1', {
                        customerName,
                        purposeOfVisit, brand, productCategory, quantityTons
                    })}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>        </ImageBackground>

    );
};
export default CreateVisit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        color: '#b816b5ff',
        marginTop: '15%',
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: '10%'
    },
    dropdowntitle: {
        fontSize: 11.5,
        color: '#fffefeff',
        marginTop: '2%',
        fontWeight: 'bold',
    },
    dropdowntitle1: {
        fontSize: 11.5,
        color: '#dcdadaff',
        fontWeight: 'bold',

    },
    dropdownmain: {
        height: 40,
        width: '48%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        marginBottom: '2%',
    },
    dropdown: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        marginBottom: '2%'

    },
    dropdown1: {
        height: 40,
        width: '48%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginBottom: '2%'

    },
    dateButton: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '43%',
        height: 40,
        marginBottom: '2%'

    },
    dateText: {
        fontSize: 11.5,
        color: '#333',
    },
    inputBox: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 10,
        width: '48%',
        marginBottom: '2%'

    },
    inputBoxcustomerfield: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        marginBottom: '2%'
    },
    inputBoxcustomerfieldqty: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 10,
        width: '48%',
        marginBottom: '2%'
    },
    inputBox1: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fff',
        width: '100%',
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#020e94ff',
        width: '50%',
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputBoxMulti: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 10,
        height: 180,
        textAlignVertical: 'top',
        marginBottom: '2%',
    },
    inputBox3: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        height: 100,
        marginBottom: '2%',
        textAlign: 'top'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
});
