import React, { useEffect, useId, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postcreatevisit,postAccessRead } from '../../../redux/action';
import { useNavigation } from '@react-navigation/native';

const ApprovalPending = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
const [userGroups, setUserGroups] = useState([]);
const [verifyingId, setVerifyingId] = useState(null);

const uid = useSelector(state => state.postauthendicationReducer.uid);

  const postcreatevisitData = useSelector(
    (state) => state.postcreatevisitReducer.data["openEnquiryList"]
  );

  const postcreatevisitLoading = useSelector(
    (state) => state.postcreatevisitReducer.loading["openEnquiryList"]
  );
  const [enquiries, setEnquiries] = useState([]);


const onHandlingVerify = async (id) => {
  setVerifyingId(id);

  const payload = { jsonrpc: "2.0", method: "call", params: { visit_id: id } };

  try {
    // Show loader for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await dispatch(postAccessRead(payload, "verifyVisit"));
    console.log("Verify API Response:", response);

    // Access the API result properly
    const result = response?.data?.result;

    if (result?.success) {
      // Temporarily mark as verified
      setEnquiries(prev =>
        prev.map(item =>
          item.id === id ? { ...item, state: "verified" } : item
        )
      );

    } else {
      console.warn("Verification failed:", result?.message);
    }
  } catch (error) {
    console.error("Verify API failed:", error);
  } finally {
    setVerifyingId(null);
  }
};

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
            "state",
            "brand",
            "visit_purpose",
            "product_category",
            "required_qty",
            "remarks",
            "so_id",
            "outcome_visit",
            "lost_reason",
            "followup_date"
          ],
        },
      },
    };
    dispatch(postcreatevisit(payload, "approvalPendingList"));

  }, [dispatch]);

  useEffect(() => {
      if (!uid) return;

    const payload = {
  "jsonrpc": "2.0",
  "method": "call",
  "params": {
    "model": "res.users",
    "method": "read",
    "args": [
      [uid],
      ["id", "name", "groups_id"]
    ],
    "kwargs": {}
  }
}
  dispatch(postcreatevisit(payload, "groupList"));
  console.log("Fetching group list for UID:", uid);
}, [dispatch, uid]);

  const groupListData = useSelector((state) => state.postcreatevisitReducer.data["groupList"]);
useEffect(() => {
  if (Array.isArray(groupListData) && groupListData.length > 0) {
    setUserGroups(groupListData[0].groups_id || []);
  }
}, [groupListData])

useEffect(() => {
    if (postcreatevisitData) {
      const normalizedData = postcreatevisitData.map((item) => ({
        id: item.id,
        reference: item.name || "N/A",
        purpose_of_visit: item.visit_purpose || "N/A",
        customer_name:
          Array.isArray(item.partner_id) && item.partner_id.length > 1
            ? item.partner_id[1]
            : "N/A",
        brand:
          Array.isArray(item.brand) && item.brand.length > 1
            ? item.brand[1]
            : "N/A",
        outcome_visit:
          Array.isArray(item.outcome_visit) && item.outcome_visit.length > 1
            ? item.outcome_visit[1]
            : item.outcome_visit || "N/A",
        product_category:
          Array.isArray(item.product_category) && item.product_category.length > 1
            ? item.product_category[1]
            : item.product_category || "N/A",
        qty: item.required_qty ?? "N/A",
        remarks: item.remarks || "N/A",
        so_number:
          Array.isArray(item.so_id) && item.so_id.length > 1
            ? item.so_id[1]
            : "N/A",
        state: Array.isArray(item.state) && item.state.length > 1 ? item.state[1] : item.state || "N/A",
        followup_date: item.followup_date ? new Date(item.followup_date).toLocaleDateString() : "Not Scheduled",
      }));
    const visitedEnquiries = normalizedData.filter(
      (item) => item.state === "visted"
    );

    console.log("Visited Enquiries:", visitedEnquiries);
    setEnquiries(visitedEnquiries);
  }
}, [postcreatevisitData]);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Stage1', { enquiryData: item })}
    >
      <Text style={styles.title}>{item.reference}</Text>
      <Text>
        <Text style={styles.label}>Purpose:</Text> {item.purpose_of_visit}
      </Text>
      <Text>
        <Text style={styles.label}>Customer:</Text> {item.customer_name}
      </Text>
      <Text>
        <Text style={styles.label}>Product Category:</Text> {item.product_category}
      </Text>
      <Text>
        <Text style={styles.label}>brand:</Text> {item.brand}
      </Text>
      <Text>
        <Text style={styles.label}>Quantity:</Text> {item.qty}
      </Text>
      <Text>
        <Text style={styles.label}>Remarks:</Text> {item.remarks}
      </Text>
      <Text>
        <Text style={styles.label}>Visit Outcomes:</Text> {item.outcome_visit}
      </Text>
      <Text>
        <Text style={styles.label}>SO Number:</Text> {item.so_number}
      </Text>
          <Text>
        <Text style={styles.label}>FollowupDate:</Text> {item.followup_date}
      </Text>
            <Text>
              <Text style={styles.label}>status:</Text> {item.state}
            </Text>
          {userGroups.includes(65) && (
  <TouchableOpacity
    style={[
      styles.verifyBtn,
      item.state === "verified" && { backgroundColor: "#6c757d" }
    ]}
    onPress={() => onHandlingVerify(item.id)}
    disabled={verifyingId === item.id || item.state === "verified"}
  >
    <Text style={styles.verifyText}>
      {verifyingId === item.id
        ? "Verifying..."
        : item.state === "verified"
        ? "Verified"
        : "Verify"}
    </Text>
  </TouchableOpacity>
)}
    </TouchableOpacity>
  );


  if (postcreatevisitLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3966c2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={enquiries}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No enquiries found.</Text>}
      />
      {verifyingId && (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color="#3966c2" />
      </View>
    )}
    </View>
  );
};

export default ApprovalPending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3966c2',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyBtn: {
  position: "absolute",
  bottom: 10,
  right: 10,
  backgroundColor: "#28a745",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8
},
verifyText: {
  color: "#fff",
  fontWeight: "bold"
}
});
