import React, { useState, useEffect } from 'react';
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
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { postcreatevisit } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const PagerContent = ({ todayFollowUps = [] }) => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.pagerPage}>
        <Text style={styles.sectionTitle}>Monthly Target</Text>
        <Text>Target: ₹100,000</Text>
        <Text>Achieved: ₹70,000</Text>
        <Text>Balance: ₹30,000</Text>
      </View>

      <View key="2" style={styles.pagerPage}>
        <Text style={styles.sectionTitle}>Upcoming Follow-ups</Text>
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
          <Text style={{ marginTop: 5, color: '#555' }}>No follow-ups today</Text>
        )}
      </View>
    </PagerView>
  );
};

const Screens = () => {
  const navigation = useNavigation();
  const [OpenenquiryCount, setOpenenquiryCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [todayFollowUps, setTodayFollowUps] = useState([]);
  const [totalListCount, setTotalListCount] = useState(0);
  const [approvalPendingCount, setApprovalPendingCount] = useState(0);
  const [ApprovedListCount, setApprovedListCount] = useState(0);
  const [lostlistCount, setLostlistCount] = useState(0);

  const dispatch = useDispatch();

  const postcreatevisitData = useSelector(
    (state) => state.postcreatevisitReducer.data["openEnquiryList"] || []
  );
  const postcreatevisitLoading = useSelector(
    (state) => state.postcreatevisitReducer.loading["openEnquiryList"]
  );

  // 🔹 API Call once on mount
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
            "outcome_visit"
       ],
        },
      },
    };

    dispatch(postcreatevisit(payload, "openEnquiryList"));
  }, [dispatch])
);

  // 🔹 Process Data when fetched
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
      const openEnquiries = postcreatevisitData.filter(
        (item) => !Array.isArray(item.so_id) || item.so_id.length === 0
      );
      const lostList = postcreatevisitData.filter((item) => {
        const stateValue = Array.isArray(item.state) ? item.state[1] : item.state;
        return stateValue?.toLowerCase() === "lost";
      });

      setCompletedCount(completedOrders.length);
      setOpenenquiryCount(openEnquiries.length);
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

  // 🔹 Loading state
  if (postcreatevisitLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // 🔹 Empty state
  if (!Array.isArray(postcreatevisitData) || postcreatevisitData.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No data available</Text>
      </View>
    );
  }

  const pieData = [
    { name: 'Open Enquiry', population: totalListCount, color: '#c4438aff', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Approval Pending', population: approvalPendingCount, color: '#f0af3e', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Lost List', population: lostlistCount, color: '#d82e2eff', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Order Pending', population: ApprovedListCount, color: '#4caf50', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Order Completed', population: completedCount, color: '#3966c2ff', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <PagerContent todayFollowUps={todayFollowUps} />

      {/* Line Chart */}
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
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
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

      {/* Stats Boxes */}
      <View style={styles.boxContainer}>
        <StatBox color="#c4438aff" label="Total List" count={totalListCount} onPress={() => navigation.navigate('OpenEnquiry')} />
        <StatBox color="#f0af3e" label="Approval Pending" count={approvalPendingCount} onPress={() => navigation.navigate('ApprovalPending')} />
        <StatBox color="#4caf50" label="Approved List" count={ApprovedListCount} onPress={() => navigation.navigate('ApprovedList')} />
        <StatBox color="#d82e2eff" label="Lost List" count={lostlistCount} onPress={() => navigation.navigate('LostList')} />
        <StatBox color="#3966c2ff" label="Order Completed" count={completedCount} onPress={() => navigation.navigate('CompletedOrder')} />
      </View>
    </ScrollView>
  );
};

const StatBox = ({ color, label, count, onPress }) => (
  <TouchableOpacity style={[styles.colorBox, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.boxText}>{label}</Text>
    <Text style={styles.boxNumber}>{count}</Text>
  </TouchableOpacity>
);

export default Screens;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  propsForDots: { r: '5', strokeWidth: '2', stroke: '#ffa726' },
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pagerView: { height: 150, borderRadius: 8, marginTop: 15, overflow: 'hidden', backgroundColor: '#f2f2f2', elevation: 8 },
  pagerPage: { justifyContent: 'center', alignItems: 'center', padding: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, elevation: 8 },
  chartSection: { marginTop: 20, alignItems: 'center' },
  chartCard: { backgroundColor: '#fff', borderRadius: 16, padding: 10, marginVertical: 8, elevation: 6 },
  boxContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 30 },
  colorBox: { width: '48%', height: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 8 },
  boxText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  boxNumber: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  followupCard: { width: '100%', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-evenly' },
  followupName: { fontSize: 14, fontWeight: '500' },
  followupDate: { fontSize: 14, fontWeight: 'bold' },
});
