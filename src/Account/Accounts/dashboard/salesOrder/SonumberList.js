import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postcreatevisit } from '../../../../redux/action';
import { useNavigation } from '@react-navigation/native';

const SonumberList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const postcreatevisitData = useSelector(
    (state) => state.postcreatevisitReducer.data["completedOrdersList"]
  );
  const postcreatevisitLoading = useSelector(
    (state) => state.postcreatevisitReducer.loading["completedOrdersList"]
  );

  const [enquiries, setEnquiries] = useState([]);

  // Fetch customer visits
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
            "id", "create_date", "name", "partner_id", "brand",
            "visit_purpose", "product_category", "required_qty",
            "remarks", "so_id"
          ],
        },
      },
    };
    dispatch(postcreatevisit(payload, "completedOrdersList"));
  }, [dispatch]);

  // Normalize data
  useEffect(() => {
    if (Array.isArray(postcreatevisitData)) {
      const normalizedData = postcreatevisitData
        .filter(item => Array.isArray(item.so_id) && item.so_id.length > 1)
        .map(item => ({
          id: item.id,
          reference: item.name || "N/A",
          create_date: formatDateTime(item.create_date),
          purpose_of_visit: item.visit_purpose || "N/A",
          customer_name: Array.isArray(item.partner_id) ? item.partner_id[1] : "N/A",
          brand: Array.isArray(item.brand) ? item.brand[1] : "N/A",
          product_category: Array.isArray(item.product_category) ? item.product_category[1] : "N/A",
          qty: item.required_qty ?? "N/A",
          remarks: item.remarks || "N/A",
          outcome_visit: Array.isArray(item.outcome_visit) ? item.outcome_visit[1] : "N/A",
          so_id: Array.isArray(item.so_id) ? item.so_id[0] : null,
          so_number: Array.isArray(item.so_id) ? item.so_id[1] : "N/A",
        }));
      setEnquiries(normalizedData);
    }
  }, [postcreatevisitData]);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const isoStr = dateStr.replace(" ", "T");
    const dateObj = new Date(isoStr);
    if (isNaN(dateObj.getTime())) return "N/A";
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const filteredEnquiries = enquiries.filter(item => {
    const text = searchText.toLowerCase();
    return (
      item.customer_name.toLowerCase().includes(text) ||
      item.purpose_of_visit.toLowerCase().includes(text) ||
      item.outcome_visit.toLowerCase().includes(text) ||
      item.brand.toLowerCase().includes(text) ||
      item.product_category.toLowerCase().includes(text) ||
      item.so_number.toLowerCase().includes(text) ||
      item.reference.toLowerCase().includes(text)
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.reference}</Text>
      <Text><Text style={styles.label}>Created On:</Text> {item.create_date}</Text>
      <Text><Text style={styles.label}>Purpose:</Text> {item.purpose_of_visit}</Text>
      <Text><Text style={styles.label}>Customer:</Text> {item.customer_name}</Text>
      <Text><Text style={styles.label}>Product Category:</Text> {item.product_category}</Text>
      <Text><Text style={styles.label}>Brand:</Text> {item.brand}</Text>
      <Text><Text style={styles.label}>Quantity:</Text> {item.qty}</Text>
      <Text><Text style={styles.label}>Remarks:</Text> {item.remarks}</Text>
      <Text><Text style={styles.label}>Visit Outcomes:</Text> {item.outcome_visit}</Text>
      <Text>
        <Text style={styles.label}>SO Number:</Text>{" "}
        <TouchableOpacity onPress={() => navigation.navigate('SonumberSaleOrder', { soId: item.so_id })}>
          <Text style={{ color: '#3966c2' }}>{item.so_number}</Text>
        </TouchableOpacity>
      </Text>
    </View>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredEnquiries}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No enquiries found.</Text>}
      />
    </View>
  );
};

export default SonumberList;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f2f2f2' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 5 },
  searchInput: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 15 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#3966c2' },
  label: { fontWeight: 'bold', color: '#333' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
