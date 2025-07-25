import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation/StackNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
  );
}
export default App;

//PAYMENT GATEWAY//

// import React, { useState } from 'react';
// import { View, Button, Alert, TextInput, StyleSheet } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';

// const App = () => {
//   const [amount, setAmount] = useState('');

//   const handlePayment = () => {
//     if (!amount) {
//       Alert.alert('Error', 'Please enter an amount');
//       return;
//     }

//     const options = {
//       description: 'Credits towards consultation',
//       image: 'https://i.imgur.com/3g7nmJC.jpg',
//       currency: 'INR',
//       key: 'rzp_test_JtzDL44JF2u8Er', // Ensure this matches your environment
//       amount: `${amount}00`, // Razorpay accepts the amount in paise
//       name: 'Sample',
//       prefill: {
//         email: 'logeshp1910@gmail.com',
//         contact: '9842749893',
//         name: 'logesh'
//       },
//       theme: { color: '#53a20e' }
//     };

//     RazorpayCheckout.open(options)
//       .then((data) => {
//         Alert.alert(`Success: ${data.razorpay_payment_id}`);
//       })
//       .catch((error) => {
//         console.error('Payment Error:', error); // Log the error for debugging
//         Alert.alert(`Error: ${error.code} | ${error.description}`);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Amount"
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//       />
//       <Button
//         title="Pay with Razorpay"
//         onPress={handlePayment}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '80%',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default App;


//PUSH NOTIFICATION

// import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import { View, Button, Text, Alert, StyleSheet } from 'react-native';

// const App = () => {
  
//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }

//     const getToken = async () => {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log('Your Firebase Token is:', fcmToken);
//       } else {
//         console.log('Failed to get FCM token');
//       }
//     };
// useEffect(() => {
//   requestUserPermission()
//   getToken()
// },[])
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>FCM Notification Example</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   text: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });

// export default App;
