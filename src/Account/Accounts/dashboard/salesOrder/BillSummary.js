import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BillSummary = ({ route }) => {
  const { products = [], form = {}, taxDetails = [] } = route.params;

  const [billingShippingVisible, setBillingShippingVisible] = useState(false); // hidden by default

  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleAddress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBillingShippingVisible(!billingShippingVisible);
  };

  const colWidths = [150, 80, 40, 60, 60, 100];
  const totalDelivered = products.reduce((sum, item) => sum + (item.qty_delivered || 0), 0);
  const totalOrdered = products.reduce((sum, item) => sum + (item.product_uom_qty || 0), 0);
  const totalAmountUntaxed = form.amount_untaxed ?? 0;
  const totalGST = form.amount_tax ?? 0;
  const totalAmount = form.amount_total ?? 0;

  const taxMapDetail = Object.fromEntries(
    taxDetails.map(tax => [tax.id, { name: tax.name, amount: tax.amount }])
  );

  const calculateGSTAmount = (product) => {
    if (!product.tax_id || !Array.isArray(product.tax_id) || product.tax_id.length === 0) return 0;
    const amount = (product.price_unit || 0) * (product.product_uom_qty || 0);
    return product.tax_id.reduce((sum, taxId) => sum + (amount * (taxMapDetail[taxId]?.amount || 0) / 100), 0);
  };

  const companyName = Array.isArray(form.company_id) ? form.company_id[1] : "";
  const companyInitial = companyName ? companyName.charAt(0) : "?";

  return (
    <ScrollView style={styles.container}>
      {/* SO Header */}
      <Text style={styles.soNumber}>{form.name}</Text>
      <View style={styles.headerRow}>
        <View style={styles.companyBox}>
          <Text style={styles.companyInitial}>{companyInitial}</Text>
        </View>
        <Text style={styles.companyName}>{companyName}</Text>
      </View>
      <Text style={styles.mobileNumber}>Mobile: {form.mobile || "-"}</Text>

      {/* Toggle Address Button */}
      <TouchableOpacity style={styles.billingShippingBox} onPress={toggleAddress}>
        <Text style={styles.billingShippingText}>
          {billingShippingVisible ? "Hide Address" : "View Address"}
        </Text>
      </TouchableOpacity>

      {/* Billing/Shipping Address */}
      {billingShippingVisible && (
        <View style={styles.addressRow}>
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>Billing Address</Text>
            <Text style={styles.addressValue}>
              {Array.isArray(form.partner_invoice_id) ? form.partner_invoice_id[1] : "-"}
            </Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>Shipping Address</Text>
            <Text style={styles.addressValue}>
              {Array.isArray(form.partner_shipping_id) ? form.partner_shipping_id[1] : "-"}
            </Text>
          </View>
        </View>
      )}

      {/* Bill Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Icon name="book" size={20} color="#3966c2" style={{ marginRight: 8 }} />
          <Text style={styles.summaryHeaderText}>Bill Summary</Text>
          <Icon name="download" size={20} color="#b70e19" style={{ marginLeft: 10 }} />
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount Untaxed:</Text>
          <Text style={styles.summaryValue}>{totalAmountUntaxed}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Quantity Ordered:</Text>
          <Text style={styles.summaryValue}>{totalOrdered}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivered:</Text>
          <Text style={styles.summaryValue}>{totalDelivered}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (Tax):</Text>
          <Text style={styles.summaryValue}>{totalGST}</Text>
        </View>
        <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: "#ccc", paddingTop: 10, marginTop: 10 }]}>
          <Text style={[styles.summaryLabel, { fontWeight: "700" }]}>Total Amount</Text>
          <Text style={[styles.summaryValue, { color: "#d60e0e", fontWeight: "700" }]}>{totalAmount}</Text>
        </View>
      </View>

      {/* Detailed Products - Always Expanded */}
      <View style={styles.detailedSummaryCard}>
        <ScrollView horizontal>
          <View>
            <View style={{ flexDirection: "row" }}>
              {["Product", "Delivered", "Qty", "Unit Price", "GST", "Total"].map((title, index) => (
                <View
                  key={index}
                  style={{
                    width: colWidths[index],
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    backgroundColor: "#eee",
                  }}
                >
                  <Text style={{ fontWeight: "700", fontSize: 12, textAlign: "center" }}>{title}</Text>
                </View>
              ))}
            </View>

            {products.length > 0 ? (
              products.map((item) => {
                const gstAmount = calculateGSTAmount(item);
                const taxNames = Array.isArray(item.tax_id)
                  ? item.tax_id.map(taxId => taxMapDetail[taxId]?.name || "").filter(Boolean).join(", ")
                  : "-";

                return (
                  <View key={item.id} style={{ flexDirection: "row" }}>
                    <View style={{ width: colWidths[0], padding: 6, borderWidth: 1, borderColor: "#ccc" }}>
                      <Text style={{ fontSize: 11, textAlign: "center" }}>{item.name}</Text>
                    </View>
                    <View style={{ width: colWidths[1], padding: 6, borderWidth: 1, borderColor: "#ccc" }}>
                      <Text style={{ fontSize: 11, textAlign: "center" }}>{item.qty_delivered ?? "-"}</Text>
                    </View>
                    <View style={{ width: colWidths[2], padding: 6, borderWidth: 1, borderColor: "#ccc" }}>
                      <Text style={{ fontSize: 11, textAlign: "center" }}>{item.product_uom_qty ?? "-"}</Text>
                    </View>
                    <View style={{ width: colWidths[3], padding: 6, borderWidth: 1, borderColor: "#ccc" }}>
                      <Text style={{ fontSize: 11, textAlign: "center" }}>{item.price_unit ?? "-"}</Text>
                    </View>
                    <View style={{ width: colWidths[4], padding: 6, borderWidth: 1, borderColor: "#ccc" }}>
                      <Text style={{ fontSize: 11, textAlign: "center" }}>
                        {gstAmount.toFixed(2)} ({taxNames})
                      </Text>
                    </View>
                    <View style={{ width: colWidths[5], padding: 6, borderWidth: 1, borderColor: "#ccc" }}>
                      <Text style={{ fontSize: 11, textAlign: "center" }}>{item.price_total ?? item.price_subtotal ?? "-"}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{ textAlign: "center", marginTop: 20 }}>No products found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default BillSummary;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f2f2f2" },
  soNumber: { textAlign: "center", fontSize: 20, fontWeight: "bold", marginTop: 20 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  companyBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#3966c2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  companyInitial: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  companyName: { fontSize: 14, fontWeight: "bold", flex: 1 },
  mobileNumber: { fontSize: 14, color: "#333", marginLeft: 50},
  billingShippingBox: { marginLeft: 50, },
  billingShippingText: { fontSize: 12, fontWeight: "600", color: "#d60e0eff" },
  addressRow: { flexDirection: "row", justifyContent: "space-between",marginTop:10 },
  addressBox: { flex: 1, },
  addressLabel: { fontSize: 12, fontWeight: "bold", color: "#333" },
  addressValue: { fontSize: 14, color: "#000" },
  summaryCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 15,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  summaryHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  summaryHeaderText: { fontSize: 14, fontWeight: "600", color: "#333", flex: 1 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  summaryLabel: { fontSize: 12, color: "#555" },
  summaryValue: { fontSize: 12, fontWeight: "500", color: "#000" },
  detailedSummaryCard: { backgroundColor: "#f2f2f2", borderRadius: 12, padding: 15, marginBottom: "15%" },
});
