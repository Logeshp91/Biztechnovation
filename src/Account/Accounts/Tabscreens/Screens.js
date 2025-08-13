import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { postcreatevisit } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
 
const screenWidth = Dimensions.get('window').width;
const PagerContent = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.pagerPage}>
        <Text style={styles.sectionTitle}>Monthly Target</Text>
        <Text>Target: ₹100,000</Text>
        <Text>Achieved: ₹70,000</Text>
        <Text>Balance: ₹30,000</Text>
      </View>
      <View key="2" style={styles.pagerPage}>
        <Text style={styles.sectionTitle}>Upcoming Follow-up</Text>
        <Text>Next Follow-up: 10 Aug 2025</Text>
        <Text>Client: XYZ Pvt Ltd</Text>
      </View>
    </PagerView>
  );
};

const Screens = () => {
 const navigation = useNavigation();  
 const [OpenenquiryCount, setOpenenquiryCount] = useState(0);
   const [completedCount, setCompletedCount] = useState(0);

   const dispatch = useDispatch();

  const postcreatevisitData = useSelector(
    (state) => state.postcreatevisitReducer.data["openEnquiryList"]
  );
  const postcreatevisitLoading = useSelector(
    (state) => state.postcreatevisitReducer.loading["openEnquiryList"]
  );


  useEffect(() => {
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
            "name",
            "partner_id",
            "brand",
            "visit_purpose",
            "product_category",
            "required_qty",
            "remarks",
            "so_id",
            "outcome_visit"
          ],
        },
      },
    };
    dispatch(postcreatevisit(payload, "openEnquiryList"));
  }, []);

useEffect(() => {
  if (postcreatevisitData) {

    postcreatevisitData.forEach(item => {
    });

    const completedOrders = postcreatevisitData.filter(
      (item) => Array.isArray(item.so_id) && item.so_id.length > 0
    );

    const openEnquiries = postcreatevisitData.filter(
      (item) => !Array.isArray(item.so_id) || item.so_id.length === 0
    );

    setCompletedCount(completedOrders.length);
    setOpenenquiryCount(openEnquiries.length);
  }
}, [postcreatevisitData]);

 
 const pieData = [
    {
      name: 'Open Enquiry',
      population: OpenenquiryCount,
      color: '#8cc443',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Approval Pending',
      population: 10,
      color: '#f0af3e',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Order Pending',
      population: 8,
      color: '#e34444ff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Order Completed',
      population: completedCount,
      color: '#3966c2ff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <PagerContent />
<View style={styles.chartSection}>
  <Text style={styles.sectionTitle}>Performance Over Time</Text>
  <View style={styles.chartCard}>
    <LineChart
      data={{
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{ data: [30, 60, 50, 80], strokeWidth: 2 }],
      }}
      width={screenWidth - 60}
      height={220}
      yAxisSuffix="%"
      yAxisInterval={1}
      chartConfig={chartConfig}
      bezier
      style={{
        borderRadius: 16,
      }}
    />
  </View>
</View>


      {/* Pie Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Pie Chart</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Colored Boxes */}
      <View style={styles.boxContainer}>
        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#8cc443' }]}   
         onPress={() => navigation.navigate('OpenEnquiry')} >
          <Text style={styles.boxText}>Open Enquiry</Text>
                 <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
            {OpenenquiryCount} 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#f0af3e' }]}
           onPress={() => navigation.navigate('Stage2')}>
          <Text style={styles.boxText}>Approval Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#e34444ff' }]}>
          <Text style={styles.boxText}>Order Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#3966c2ff' }]}
                 onPress={() => navigation.navigate('CompletedOrder')} >
          <Text style={styles.boxText}>Order Completed</Text>
                 <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
            {completedCount} 
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Screens;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  pagerView: {
    height: 150,
    borderRadius: 8,
    marginTop: 15,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  shadowColor: '#000', // for iOS
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.65,
  elevation: 8, 
},
  pagerPage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
          shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.65,
  elevation: 8,
    
  },
  chartSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartCard: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 10,
  marginVertical: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 6,
},

  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
      shadowColor: '#000', // for iOS
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.65,
  elevation: 8, // for Android shadow
  },
  colorBox: {
    width: '48%',
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
      shadowColor: '#000', 
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.65,
  elevation: 8,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
