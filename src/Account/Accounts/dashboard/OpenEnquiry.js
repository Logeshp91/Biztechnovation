import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { postcreatevisit, postAccessRead } from "../../../redux/action";
import { useNavigation } from "@react-navigation/native";

const OpenEnquiry = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userGroups, setUserGroups] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const uid = useSelector((state) => state.postauthendicationReducer.uid);
  const postcreatevisitLoading = useSelector(
    (state) => state.postcreatevisitReducer.loading["openEnquiryList"]
  );
  const postcreatevisitData = useSelector(
    (state) => state.postcreatevisitReducer.data["openEnquiryList"]
  );
  const postcreatevisitError = useSelector(
    (state) => state.postcreatevisitReducer.error["openEnquiryList"]
  );
  const groupListData = useSelector(
    (state) => state.postcreatevisitReducer.data["groupList"]
  );

  const fetchEnquiries = useCallback(() => {
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
            "followup_date",
            "brand",
            "visit_purpose",
            "product_category",
            "required_qty",
            "remarks",
            "so_id",
            "outcome_visit",
            "lost_reason",
            "create_date",
          ]
        }
      }
    };
    dispatch(postcreatevisit(payload, "openEnquiryList"));
  }, [dispatch]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  useEffect(() => {
    if (!uid) return;
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "res.users",
        method: "read",
        args: [[uid], ["id", "name", "groups_id"]],
        kwargs: {}
      }
    };
    dispatch(postcreatevisit(payload, "groupList"));
  }, [uid, dispatch]);

  useEffect(() => {
    if (Array.isArray(groupListData) && groupListData.length > 0) {
      const extractedGroupIds = (groupListData[0].groups_id || []).map((g) =>
        Array.isArray(g) ? g[0] : g
      );
      setUserGroups(extractedGroupIds);
    }
  }, [groupListData]);
const formatDateTime = (dateStr) => {
  if (!dateStr) return "N/A";

  // Convert "YYYY-MM-DD HH:mm:ss" → "YYYY-MM-DDTHH:mm:ss" (ISO format)
  const isoStr = dateStr.replace(" ", "T");
  const dateObj = new Date(isoStr);

  if (isNaN(dateObj.getTime())) return "N/A"; // check if date is valid

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 to 12
  const strHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${strHours}:${minutes} ${ampm}`;
};


  useEffect(() => {
    if (Array.isArray(postcreatevisitData)) {
      const normalizedData = postcreatevisitData.map((item) => ({
        id: item.id,
        reference: item.name || "N/A",
        purpose_of_visit: item.visit_purpose || "N/A",
        customer_name:
          Array.isArray(item.partner_id) && item.partner_id[1]
            ? item.partner_id[1]
            : "N/A",
        brand:
          Array.isArray(item.brand) && item.brand[1]
            ? item.brand[1]
            : "N/A",
        outcome_visit:
          Array.isArray(item.outcome_visit) && item.outcome_visit[1]
            ? item.outcome_visit[1]
            : item.outcome_visit || "N/A",
        product_category:
          Array.isArray(item.product_category) && item.product_category[1]
            ? item.product_category[1]
            : item.product_category || "N/A",
        qty: item.required_qty ?? "N/A",
        remarks: item.remarks || "N/A",
        so_number:
          Array.isArray(item.so_id) && item.so_id[1]
            ? item.so_id[1]
            : "N/A",
        state: item.state || "N/A",
        followup_date: item.followup_date
          ? new Date(item.followup_date).toLocaleDateString()
          : "Not Scheduled",
create_date: formatDateTime(item.create_date)
      }));
      setEnquiries(normalizedData);
    }
  }, [postcreatevisitData]);

  const filteredEnquiries = enquiries.filter((item) => {
    const text = searchText.toLowerCase();
    return (
      item.customer_name.toLowerCase().includes(text) ||
      item.state.toLowerCase().includes(text) ||
      item.followup_date.toLowerCase().includes(text) ||
      item.purpose_of_visit.toLowerCase().includes(text) ||
      item.outcome_visit.toLowerCase().includes(text) ||
      item.brand.toLowerCase().includes(text) ||
      item.product_category.toLowerCase().includes(text) ||
      item.so_number.toLowerCase().includes(text) ||
      item.reference.toLowerCase().includes(text)
    );
  });
  // ✅ Verify handler
  // const onHandlingVerify = async (id) => {
  //   setVerifyingId(id);

  //   const payload = { jsonrpc: "2.0", method: "call", params: { visit_id: id } };

  //   try {
  //     const response = await dispatch(postAccessRead(payload, "verifyVisit"));
  //     const result = response?.data?.result;

  //     if (result?.success) {
  //       // 1️⃣ Remove instantly
  //       setEnquiries((prev) => prev.filter((item) => item.id !== id));

  //       // 2️⃣ Refresh from API
  //       fetchEnquiries();
  //     } else {
  //       console.warn("Verification failed:", result?.message);
  //     }
  //   } catch (error) {
  //     console.error("Verify API failed:", error);
  //   } finally {
  //     setVerifyingId(null);
  //   }
  // };


  useEffect(() => {
    console.log("API Loading:", postcreatevisitLoading);
    console.log("API Data:", postcreatevisitData);
    console.log("API Error:", postcreatevisitError);
  }, [postcreatevisitLoading, postcreatevisitData, postcreatevisitError]);

  if (postcreatevisitLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3966c2" />
        <Text style={styles.loaderText}>Loading Enquiries...</Text>
      </View>
    );
  }

  if (!enquiries.length) {
    return (
      <View style={styles.center}>
        <Text>No enquiries available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
             if (item.state === "visted") {
        return;
      }
        if (item.so_number && item.so_number !== "N/A") {
          return;
        }
        navigation.navigate("Stage1", { enquiryData: item });
      }}
    >
      <Text style={styles.title}>{item.reference}</Text>
      <Text><Text style={styles.label}>create Date:</Text> {item.create_date}</Text>
      <Text><Text style={styles.label}>Purpose:</Text> {item.purpose_of_visit}</Text>
      <Text><Text style={styles.label}>Customer:</Text> {item.customer_name}</Text>
      <Text><Text style={styles.label}>Product Category:</Text> {item.product_category}</Text>
      <Text><Text style={styles.label}>Brand:</Text> {item.brand}</Text>
      <Text><Text style={styles.label}>Quantity:</Text> {item.qty}</Text>
      <Text><Text style={styles.label}>Remarks:</Text> {item.remarks}</Text>
      <Text><Text style={styles.label}>Visit Outcomes:</Text> {item.outcome_visit}</Text>
      <Text><Text style={styles.label}>SO Number:</Text> {item.so_number}</Text>
      <Text><Text style={styles.label}>Status:</Text> {item.state}</Text>
      <Text><Text style={styles.label}>Follow-Up Date:</Text> {item.followup_date}</Text>
{/* 
      {userGroups.includes(65) &&
        (!item.so_number || item.so_number === "N/A" ) && (
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={() => onHandlingVerify(item.id)}
            disabled={verifyingId === item.id || item.state === "visited" }
          >
            <Text style={styles.verifyText}>
              {verifyingId === item.id ? "Verifying..." : "verify"}
            </Text>
          </TouchableOpacity>
        )} */}
    </TouchableOpacity>
  );

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
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No enquiries found.</Text>}
      />
    </View>
  );
};

export default OpenEnquiry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2"
  },
    searchInput: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 15 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#3966c2"
  },
  label: {
    fontWeight: "bold",
    color: "#333"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#3966c2"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
