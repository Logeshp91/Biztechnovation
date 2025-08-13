import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postcreatevisit } from '../../../redux/action';
import { useNavigation } from '@react-navigation/native';

const CompletedOrder = () => {
  const dispatch = useDispatch();
 const navigation = useNavigation();
 
 
 const postcreatevisitData = useSelector(
  (state) => state.postcreatevisitReducer.data["openEnquiryList"]
);
const postcreatevisitLoading = useSelector(
  (state) => state.postcreatevisitReducer.loading["openEnquiryList"]
);

  const [enquiries, setEnquiries] = useState([]);

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
          ],
        },
      },
    };
dispatch(postcreatevisit(payload, "completedOrdersList"));
    
  }, [dispatch]);

useEffect(() => {
  if (postcreatevisitData) {
    const normalizedData = postcreatevisitData
      .filter(
        (item) => Array.isArray(item.so_id) && item.so_id.length > 1 
      )
      .map((item) => ({
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
        product_category:
          Array.isArray(item.product_category) && item.product_category.length > 1
            ? item.product_category[1]
            : item.product_category || "N/A",
        qty: item.required_qty ?? "N/A",
        remarks: item.remarks || "N/A",
                outcome_visit:
          Array.isArray(item.outcome_visit) && item.outcome_visit.length > 1
            ? item.outcome_visit[1]
            : item.outcome_visit || "N/A",
        so_number:
          Array.isArray(item.so_id) && item.so_id.length > 1
            ? item.so_id[1]
            : "N/A",
      }));

    setEnquiries(normalizedData);
  }
}, [postcreatevisitData]);




const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
   onPress={() => { enquiryData: item }}
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
    </View>
  );
};

export default CompletedOrder;

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
});
