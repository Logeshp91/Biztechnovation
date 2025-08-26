import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,ImageBackground,ToastAndroid ,
    LayoutAnimation,
  UIManager,Platform,BackHandler
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { postcreatevisit } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const PagerContent = ({ todayFollowUps = [] }) => (
  <PagerView style={styles.pagerView} initialPage={0}>
    <View key="1" style={styles.pagerPage}>
<View style={styles.targetContainer}>
  <View style={styles.statBox}>
 <Text style={styles.itemLabel}>🎯Target</Text>
    <Text style={styles.statValue}>100</Text>
  </View>
  <View style={styles.statBox}>
    <Text style={styles.itemLabel}>✅Achieved</Text>
    <Text style={styles.statValue}>70</Text>
  </View>
  <View style={styles.statBox}>
    <Text style={styles.statLabel}>📉Balance</Text>
    <Text style={styles.statValue}>30</Text>
  </View>
</View>
    </View>

    <View key="2" style={styles.targetContainer}>
      {todayFollowUps.length > 0 ? (
        todayFollowUps.map((item) => (
          <View key={item.id} style={styles.followupCard}>
            <Text style={styles.followupName}>
              {Array.isArray(item.partner_id) ? item.partner_id[1] : 'N/A'}
            </Text>
            <Text style={styles.followupDate}>
              {item.followup_date
                ? new Date(item.followup_date).toLocaleDateString()
                : 'N/A'}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ marginTop: 5, color: '#555',fontWeight:'bold',fontSize:12  }}>📅No follow-ups today</Text>
      )}
    </View>
<View key="3" style={styles.targetContainer}>
  <View style={styles.statBox1}>
    <Text style={styles.statLabel}>💰Outstanding</Text>
    <Text style={styles.statValue}>200 Tons</Text>
  </View>
</View>
  </PagerView>
);

const Screens = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const [selectedTab, setSelectedTab] = useState(null);
  const [todayFollowUps, setTodayFollowUps] = useState([]);
  const [totalListCount, setTotalListCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [approvalPendingCount, setApprovalPendingCount] = useState(0);
  const [ApprovedListCount, setApprovedListCount] = useState(0);
  const [lostlistCount, setLostlistCount] = useState(0);
  const postcreatevisitData = useSelector(
    (state) => state.postcreatevisitReducer.data["openEnquiryList"] || []
  );
  const postcreatevisitLoading = useSelector(
    (state) => state.postcreatevisitReducer.loading["openEnquiryList"]
  );
  // chart slides up when scrolling
  const chartTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150], // hide chart upwards
    extrapolate: 'clamp',
  });
  // just map scrollY, no manual Animated.timing
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const backPressRef = useRef(0);

useFocusEffect(
  React.useCallback(() => {
    const backAction = () => {
      // Check if we are on root screen
      const state = navigation.getState();
      const currentRoute = state.routes[state.index];
      const isRootScreen = currentRoute.name === 'Screens'; // root check

      if (!isRootScreen) {
        navigation.goBack();
        return true;
      }

      const timeNow = Date.now();
      if (backPressRef.current && timeNow - backPressRef.current < 2000) {
        BackHandler.exitApp(); // exit app on second press
        return true;
      }

      backPressRef.current = timeNow;
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation])
);
  // 🔹 Fetch data
  useFocusEffect(
    React.useCallback(() => {
      const payload = {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "customer.visit",
          method: "search_read",
          args: [],
          kwargs: {
            fields: [
              "id",
              "state",
              "followup_date",
              "name",
              "partner_id",
              "brand",
              "visit_purpose",
              "product_category",
              "required_qty",
              "remarks",
              "so_id",
              "outcome_visit",
              "create_date",
              "billing_branch_id"
            ],
          },
        },
      };

      dispatch(postcreatevisit(payload, "openEnquiryList"));
    }, [dispatch])
  );
  useEffect(() => {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}, []);
const AnimatedStatBox = ({ label, count, color, onPress, delay }) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, translateY, opacity]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <StatBox label={label} count={count} color={color} onPress={onPress} />
    </Animated.View>
  );
};
const AnimatedStatsSection = ({ visible, children }) => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: visible ? 100 : 0, // adjust height to fit your StatBox row
      duration: 600,
      useNativeDriver: false, // height animation needs `false`
    }).start();
  }, [visible, height]);

  return (
    <Animated.View style={{ overflow: 'hidden', height }}>
      {children}
    </Animated.View>
  );
};

  // 🔹 Process Data
  useEffect(() => {
    if (Array.isArray(postcreatevisitData)) {
      setTotalListCount(postcreatevisitData.length);

      const completedOrders = postcreatevisitData.filter(
        (item) => Array.isArray(item.so_id) && item.so_id.length > 0
      );
      const approvalPending = postcreatevisitData.filter((item) => {
        const stateValue = Array.isArray(item.state) ? item.state[1] : item.state;
        return stateValue === "visted";
      });
      const approvedList = postcreatevisitData.filter((item) => {
        const stateValue = Array.isArray(item.state) ? item.state[1] : item.state;
        return stateValue === "verify";
      });
      const lostList = postcreatevisitData.filter((item) => {
        const stateValue = Array.isArray(item.state) ? item.state[1] : item.state;
        return stateValue?.toLowerCase() === "lost";
      });

      setCompletedCount(completedOrders.length);
      setApprovalPendingCount(approvalPending.length);
      setApprovedListCount(approvedList.length);
      setLostlistCount(lostList.length);

      const today = new Date().toISOString().split('T')[0];
      const todaysFollowups = postcreatevisitData.filter((item) => {
        if (!item.followup_date) return false;
        return new Date(item.followup_date).toISOString().split('T')[0] === today;
      });

      setTodayFollowUps(todaysFollowups);
    }
  }, [postcreatevisitData]);

  if (postcreatevisitLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
      <ImageBackground 
    source={require('../../../assets/backgroundimg.png')}   // 👈 put your image here
    style={styles.background}
    resizeMode="cover"
  >
    <View style={styles.container}>
      {/* 🔹 PagerView stays fixed, never scrolls */}
      <View style={styles.pagerWrapper}>
        <PagerContent todayFollowUps={todayFollowUps} />
      </View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >


<Animated.View
  style={[
    styles.chartSection,
    { transform: [{ translateY: chartTranslateY }] },
  ]}
>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.chartRow}
  >
    <View style={styles.chartBox}>
      <LineChart
        data={{
          labels: ['W1', 'W2', 'W3', 'W4'],
          datasets: [{ data: [30, 60, 50, 80], strokeWidth: 2 }],
        }}
        width={screenWidth } 
        height={120}
        yAxisSuffix="%"
        chartConfig={chartConfig}
        bezier
      />
    </View>

    <View style={styles.chartBox}>
      <LineChart
        data={{
          labels: ['M1', 'M2', 'M3', 'M4'],
          datasets: [{ data: [20, 40, 70, 90], strokeWidth: 2 }],
        }}
        width={screenWidth - 1}
        height={120}
        yAxisSuffix="%"
        chartConfig={chartConfig}
        bezier
      />
    </View>
  </ScrollView>
</Animated.View>

        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
      <TouchableOpacity
  style={[
    styles.tabButton,
    selectedTab === 'Visit' && styles.tabButtonActive,
  ]}
  onPress={() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTab(prev => (prev === 'Visit' ? null : 'Visit'));
  }}
>
  <Text style={selectedTab === 'Visit' ? styles.tabButtonTextActive : styles.tabButtonText}>
    Visit
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.tabButton,
    selectedTab === 'overview' && styles.tabButtonActive,
  ]}
  onPress={() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTab(prev => (prev === 'overview' ? null : 'overview'));
  }}
>
  <Text style={selectedTab === 'overview' ? styles.tabButtonTextActive : styles.tabButtonText}>
    Sale Order
  </Text>
</TouchableOpacity>
        </View>

        {/* Tab Content */}
{selectedTab === 'Visit' && (
<AnimatedStatsSection visible={selectedTab === 'Visit'}>
 {selectedTab === 'Visit' && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.Visitcroll}
    contentContainerStyle={styles.VisitcrollContent}
    key="visit-stats" // helps re-trigger child animations when reopening
  >
    <AnimatedStatBox label="Total List" count={totalListCount} color="#c4438aff" onPress={() => navigation.navigate('OpenEnquiry')} delay={100} />
    <AnimatedStatBox label="Approval Pending" count={approvalPendingCount} color="#f0af3e" onPress={() => navigation.navigate('ApprovalPending')} delay={300} />
    <AnimatedStatBox label="Approved List" count={ApprovedListCount} color="#4caf50" onPress={() => navigation.navigate('ApprovedList')} delay={500} />
    <AnimatedStatBox label="Lost List" count={lostlistCount} color="#d82e2eff" onPress={() => navigation.navigate('LostList')} delay={700} />
    <AnimatedStatBox label="Order Completed" count={completedCount} color="#3966c2ff" onPress={() => navigation.navigate('CompletedOrder')} delay={900} />
  </ScrollView>
)}
</AnimatedStatsSection>

)}
        {selectedTab === 'overview' && (
<AnimatedStatsSection visible={selectedTab === 'overview'}>
 {selectedTab === 'overview' && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.Visitcroll}
    contentContainerStyle={styles.VisitcrollContent}
    key="visit-stats" // helps re-trigger child animations when reopening
  >
    <AnimatedStatBox label="Reference" count={completedCount} color="#3966c2ff" onPress={() => navigation.navigate('SonumberList')} delay={900} />
  </ScrollView>
)}
</AnimatedStatsSection>
        )}

      <View style={styles.listSection}>
  <Text style={styles.listTitle}>Recent Visits</Text>
  {postcreatevisitData.slice(0, 5).map((item) => (
    <View key={item.id} style={styles.listItem}>
      <Text style={styles.listName}>{Array.isArray(item.partner_id) ? item.partner_id[1] : 'N/A'}</Text>
      <Text style={styles.listDetail}>Product: {item.product_category || 'N/A'}</Text>
      <Text style={styles.listDetail}>Qty: {item.required_qty || 0} Tons</Text>
      <Text style={styles.listDate}>Follow-up: {item.followup_date ? new Date(item.followup_date).toLocaleDateString() : 'N/A'}</Text>
    </View>
  ))}
</View>

{/* 🔹 Pending Visits */}
<View style={[styles.listSection, { flexGrow: 1 }]}>
  <Text style={styles.listTitle}>Pending Visits</Text>
  {postcreatevisitData
    .filter((item) => item.followup_date && new Date(item.followup_date) > new Date())
    .slice(0, 5)
    .map((item) => (
      <View key={item.id} style={styles.pendinglistItem}>
        <Text style={styles.listName}>
          {Array.isArray(item.partner_id) ? item.partner_id[1] : 'N/A'}
        </Text>
        <Text style={styles.listDetail}>Product: {item.product_category || 'N/A'}</Text>
        <Text style={styles.listDetail}>Qty: {item.required_qty || 0} Tons</Text>
        <Text style={styles.listDate}>
          Follow-up: {new Date(item.followup_date).toLocaleDateString()}
        </Text>
      </View>
  ))}
</View>
      </Animated.ScrollView>
    </View>
    </ImageBackground>
  );
}

const StatBox = ({ label, count, color, onPress }) => (
  <TouchableOpacity style={[styles.colorBox, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.boxText}>{label}</Text>
    <Text style={styles.boxNumber}>{count}</Text>
  </TouchableOpacity>
);

export default Screens;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(94, 135, 237, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(120, 120, 120, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  propsForDots: { r: '5', strokeWidth: '2', stroke: '#5e87edff' },
};

const styles = StyleSheet.create({
    background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)', // 👈 optional overlay for readability
  },
  targetContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#fff',

  borderRadius: 10,
  elevation: 4,
  marginVertical: 10,
},
statBox: {
  alignItems: 'center',
  flex: 1,
},
statBox1: {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  flex: 1,
},
statLabel: {
  fontSize: 12,
  color: '#666',
  fontWeight: '500',
},
statLabelout: {
  fontSize: 12,
  color: '#666',
  fontWeight: '500',
},
statValue: {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#333',
},
targetContainerCenter: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 10,
  elevation: 4,
  flexDirection:'row',
  justifyContent:'space-evenly'
},

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    height: 50,
    backgroundColor: '#ffffff',
    elevation: 8,
  },
  pagerPage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#d7def0ff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    elevation: 8,
  },
 targetRow: {
  flexDirection: 'row',
  alignItems: 'center',

},

targetText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
   justifyContent: 'center',
   alignItems:'center'
},
targetRow: {
  flexDirection: 'row',
  justifyContent: 'space-between', // pushes left vs right apart
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 10,           // gives breathing space left/right
},
leftBox: {
  flex: 1,
  alignItems: 'flex-start',        // left align
},
rightBox: {
  flex: 1,
  alignItems: 'flex-end',        
},
chartRow: {
  flexDirection: 'row',
},
chartBox: {
  backgroundColor: '#fff',
  elevation: 4,
  marginRight: 2, 
  },
  Visitcroll: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  VisitcrollContent: {
    flexDirection: 'row',
    gap: 12,
  },
  colorBox: {
    width: 130,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 8,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  boxNumber: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  followupCard: {
    width: '100%',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  followupName: {
    fontSize: 12,
    fontWeight: '500',
  },
  followupDate: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: '#c4dc7cff',
    height: 50,
    width: '30%',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#4e297aff',
  },
  tabButtonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333333ff',
  },
  tabButtonTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyBoxContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
    fontStyle: 'italic',
  },
  listSection: {
  marginTop: 20,
  paddingHorizontal: 15,
  flexGrow:1
},
listTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
listItem: {
  backgroundColor: '#fff',
  padding: 12,
  elevation: 3,
},
listName: {
  fontSize: 15,
  fontWeight: '600',
  color: '#222',
},
listDetail: {
  fontSize: 13,
  color: '#555',
},
listDate: {
  fontSize: 12,
  color: '#888',
  marginTop: 1,
},
pendinglistItem: {
  backgroundColor: '#fff',
  padding: 12,
  elevation: 3,
  marginBottom:"30%"
},
});
