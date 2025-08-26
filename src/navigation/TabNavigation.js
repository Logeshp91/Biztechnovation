import React, { useState, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Screens from '../Account/Accounts/Tabscreens/Screens';
import Settings from '../Account/Accounts/Tabscreens/Settings';
import Contact from '../Account/Accounts/Tabscreens/Contact';
import About from '../Account/Accounts/Tabscreens/About';
import { View, StyleSheet, TextInput, Modal, Pressable, Dimensions, Image, Easing, Text, TouchableOpacity, Animated, View as RNView } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedTextHeader from './AnimatedTextHeader';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // actual <Modal>
  const [isPanelVisible, setIsPanelVisible] = useState(false); // for animation
  const [notificationVisible, setNotificationVisible] = useState(false);
  const PANEL_WIDTH = 250;
  const slideAnim = useRef(new Animated.Value(PANEL_WIDTH)).current;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const EmptyScreen = () => {
    return null;
  };


  useEffect(() => {
    if (isPanelVisible) {
      // reset first (offscreen)
      slideAnim.setValue(PANEL_WIDTH);

      // small delay so RN applies the offscreen position before mounting
      setTimeout(() => {
        setIsModalVisible(true);

        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }, 0);

    } else {
      Animated.timing(slideAnim, {
        toValue: PANEL_WIDTH,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsModalVisible(false);
      });
    }
  }, [isPanelVisible]);


  return (
    <>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <Pressable
                style={styles.card}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('CreateCustomer');
                }}
              >
                <Text style={styles.cardText}>Create Customer</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable
                style={styles.card}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('CreateVisit');
                }}
              >
                <Text style={styles.cardText}>Create Visit</Text>
              </Pressable>
            </View>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>



      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#faf7f7", width: "85%", height: "90.5%", marginTop: "6.5%", borderTopRightRadius: 15,
            borderBottomRightRadius: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
            overflow: 'hidden',
          },
          headerStyle: {
            backgroundColor: '#ffffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: 'black',
        }}
      >
        <Drawer.Screen
          name=" "
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => (
              <View style={styles.headerRightWrapper}>
                <AnimatedTextHeader />
                <TouchableOpacity
                  style={styles.notificationButton}
                  onPress={() => setIsPanelVisible(true)} // 👈 open smoothly
                >
                  <Icon name="notifications-outline" size={24} color="#333" />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>3</Text>
                  </View>
                </TouchableOpacity>

              </View>
            )

          })}
        >
          {() => (
            <View
              style={{ flex: 1, resizeMode: 'cover' }}
            >
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Screens') {
                      iconName = focused ? 'th-large' : 'th';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'cogs' : 'cog';
                    } else if (route.name === 'Modal') {
                      iconName = focused ? 'info-circle' : 'info';
                    } else if (route.name === 'Contact') {
                      iconName = focused ? 'address-book' : 'address-book-o';
                    } else if (route.name === 'About') {
                      iconName = focused ? 'info-circle' : 'info';
                    }
                    return <FontAwesome name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#019409',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: {
                    backgroundColor: '#ffffff',
                    height: 50,
                    width: "100%",
                    alignSelf: "center",
                    borderRadius: 10,
                    marginBottom: '3%',
                    marginTop: 2,
                  },
                  tabBarLabelStyle: { fontSize: 12, fontStyle: 'italic', marginLeft: 10 },
                })}
              >
                <Tab.Screen
                  name="Screens"
                  component={Screens}
                  options={{ headerShown: false, tabBarLabel: 'Dashboard' }}
                />
                <Tab.Screen
                  name="Settings"
                  component={Settings}
                  options={{ headerShown: false }}
                />

                <Tab.Screen
                  name="Modal"
                  component={EmptyScreen}
                  options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                      <Pressable
                        {...props}
                        onPress={() => setModalVisible(true)}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 25,
                        }}
                      >
                        <Image
                          source={require('../assets/git/plusimage.png')}
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'white',
                            borderRadius: 50,
                          }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    ),
                  }}
                />
                <Tab.Screen
                  name="Contact"
                  component={Contact}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="About"
                  component={About}
                  options={{ headerShown: false }}
                />
              </Tab.Navigator>
            </View>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
      <Modal transparent visible={isModalVisible} animationType="none">
        <Pressable style={styles.overlay} onPress={() => setIsPanelVisible(false)} />
        <Animated.View
          style={[
            styles.notificationPanel,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Text style={styles.panelTitle}>Notifications</Text>

          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>📢 New update available!</Text>
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>👤 New customer added</Text>
          </View>

          <TouchableOpacity
            style={styles.closePanelBtn}
            onPress={() => setIsPanelVisible(false)} // 👈 smooth close
          >
            <Text style={styles.closePanelText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

    </>
  );
};

export default TabNavigation;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  notificationPanel: {
    position: "absolute",
    top: 55,         
    right: 10,       
    width: 250,    
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  notificationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  notificationText: {
    fontSize: 14,
    color: "#555",
  },
  closePanelBtn: {
    marginTop: 20,
    backgroundColor: "#7630be",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closePanelText: {
    color: "#fff",
    fontWeight: "bold",
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#f3ecff',
    borderRadius: 12,
    paddingVertical: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d7c6e7ff',
    elevation: 2,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7630be',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#7630be',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    gap: 10, // if RN < 0.71, use marginLeft on children instead
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: 'red',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
