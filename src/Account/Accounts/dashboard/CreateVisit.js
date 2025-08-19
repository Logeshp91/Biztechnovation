import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { postcreatevisit } from '../../../redux/action';
import { useNavigation } from '@react-navigation/native';

const CreateVisit = () => {
  const [customerName, setCustomerName] = useState('');
  const [purposeOfVisit, setPurposeOfVisit] = useState('');
  const [brand, setBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [quantityTons, setQuantityTons] = useState('');
    const [StockQty, setStockQty] = useState('');

  const [enquiryChannel, setEnquiryChannel] = useState(null);
  const [isCustomerSelected, setIsCustomerSelected] = useState(null);
  const [remarks, setRemarks] = useState('');
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const postcreatevisitData = useSelector(state => state.postcreatevisitReducer.data);
  const enquiryOptions = postcreatevisitData?.enquiryChannel || [];
  const customerOptions = postcreatevisitData?.customer || [];
  const productcategoryOptions = postcreatevisitData?.productcategory || [];
  const itembrandOptions = postcreatevisitData?.itembrand || [];

  const items = {
    utm_model: "utm.source",
    utm_method: "search_read",
    utm_args: [],
    utm_fields: ["id", "name"],

    res_model: "res.partner",
    res_method: "search_read",
    res_args: [],
    res_fields: ["id", "name"],

    visit_model: "customer.visit",
    visit_method: "search_read",
    visit_args: [],
    visit_fields: ["customer_state"],

    product_model: "product.category",
    product_method: "search_read",
    product_args: [],
    product_fields: ["id", "name"],

    brand_model: "item.brand",
    brand_method: "search_read",
    brand_args: [],
    brand_fields: ["id", "name"],
  }

  const dataParams = (name) => ({
    jsonrpc: "2.0",
    method: "call",
    params: {
      model: items[`${name}_model`],
      method: items[`${name}_method`],
      args: items[`${name}_args`],
      kwargs: {
        fields: items[`${name}_fields`]
      },
    }
  })

  const onHandleEnquiryChannel = () => {
    dispatch(postcreatevisit(dataParams("utm"), "enquiryChannel"));
  };

  const onHandleCustomer = () => {
    dispatch(postcreatevisit(dataParams("res"), "customer"))
  };
  const onHandleProductCategory = () => {
    dispatch(postcreatevisit(dataParams("product"), "productcategory"));
  };
  const onHandleItemBrand = () => {
    dispatch(postcreatevisit(dataParams("brand"), "itembrand"));
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgroundimg.png')}
      style={{ flex: 1, resizeMode: 'cover', padding: 20 }}
    >
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Create Visit</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.dropdowntitle, { marginLeft: '32%' }]}>Enquiry Channel</Text>
          </View>
          <Animatable.View animation="fadeInUp" duration={1000} delay={500}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Dropdown
                style={styles.dropdownmain}
                data={enquiryOptions.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                labelField="label"
                valueField="value"
                placeholder="Enquiry Channel"
                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
                value={enquiryChannel}
                onFocus={onHandleEnquiryChannel}
                onChange={item => setEnquiryChannel(item.value)}
              />
            </View>
          </Animatable.View>

          <Text style={styles.dropdowntitle}>Customer Name</Text>
          <Animatable.View animation="fadeInUp" duration={1000} delay={100}>
            <Dropdown
              style={styles.dropdownmain}
              data={customerOptions.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Select Customer"
              value={customerName}
              placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
              onFocus={onHandleCustomer}
              onChange={item => setCustomerName(item.value)}
            />
          </Animatable.View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.dropdowntitle, { justifyContent: 'flex-start' }]}>Purpose of Visit</Text>
            <Text style={[styles.dropdowntitle, { marginLeft: '26%' }]}>Brand</Text>
          </View>
          <Animatable.View animation="fadeInUp" duration={1000} delay={300}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Dropdown
                style={styles.dropdownmain}
                data={[
                  { label: 'Sales Enquiry', value: 'SALESCALL' },
                  { label: 'Regular Followup', value: 'REGULAR', },
                  { label: 'Stock Check', value: 'STOCK', },
                  { label: 'Payment Collection', value: 'PAYMENT', },
                  { label: 'Fields with Sales Officer', value: 'SITE', },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Purpose of Visit"
                value={purposeOfVisit}
                onChange={item => setPurposeOfVisit(item.value)}
                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
              />
              <Dropdown
                style={styles.dropdownmain}
                data={itembrandOptions.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                labelField="label"
                valueField="value"
                placeholder="Brand"
                value={brand}
                onFocus={onHandleItemBrand}
                onChange={item => setBrand(item.value)}
                placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
              />
            </View>
          </Animatable.View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.dropdowntitle, { justifyContent: 'flex-start' }]}>Product Category</Text>
            <Text style={[styles.dropdowntitle, { marginLeft: '23%' }]}>Qty (Tons)</Text>
          </View>
          <Animatable.View animation="fadeInUp" duration={1000} delay={500}>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <Dropdown
    style={styles.dropdownmain}
    data={productcategoryOptions.map(item => ({
      label: item.name,
      value: item.id,
    }))}
    labelField="label"
    valueField="value"
    placeholder="Product Category"
    value={productCategory}
    onChange={item => setProductCategory(item.value)}
    onFocus={onHandleProductCategory}
    placeholderStyle={{ color: '#c6c4c4ff', fontSize: 11.5 }}
  />
  
  {purposeOfVisit === 'STOCK' ? (
    <TextInput
      style={styles.inputBoxcustomerfieldqty}
      placeholder="Stock Qty"
      placeholderTextColor="#c6c4c4"
      value={StockQty}
      onChangeText={setStockQty}
      keyboardType="numeric"
    />
  ) : (
    <TextInput
      style={styles.inputBoxcustomerfieldqty}
      placeholder="Qty"
      placeholderTextColor="#c6c4c4"
      value={quantityTons}
      onChangeText={setQuantityTons}
      keyboardType="numeric"
    />
  )}
</View>
          </Animatable.View>
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            value={remarks}
            onChangeText={setRemarks}
            placeholder="Enter remarks"
            placeholderTextColor="#c6c4c4"

          />

<TouchableOpacity
  style={styles.button}
  onPress={() => {
    // Validate all required fields
    if (
      !enquiryChannel ||
      !customerName ||
      !purposeOfVisit ||
      !brand ||
      !productCategory ||
      !(purposeOfVisit === 'STOCK' ? StockQty : quantityTons) ||
      !remarks
    ) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    // Build payload
    const visitPayload = {
      enquiry_type: enquiryChannel,
      partner_id: customerName,
      visit_purpose: purposeOfVisit,
      brand: brand,
      product_category: productCategory,
      remarks: remarks,
    };

    // Add only the relevant quantity field
    if (purposeOfVisit === 'STOCK') {
      visitPayload.stock_qty = StockQty;
    } else {
      visitPayload.required_qty = quantityTons;
    }

    // Wrap payload in API data structure
    const data = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "customer.visit",
        method: "create",
        args: [visitPayload],
        kwargs: {}
      }
    };

    dispatch(postcreatevisit(data));

    // Navigate back
    navigation.navigate('TabNavigation');
  }}
>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>


        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CreateVisit;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: '#b816b5ff',
    marginTop: '15%',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10%',
  },
  dropdowntitle: {
    fontSize: 11.5,
    color: '#fffefeff',
    marginTop: '2%',
    fontWeight: 'bold',
  },
  dropdownmain: {
    height: 40,
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: '2%',
  },
  inputBoxcustomerfieldqty: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 10,
    width: '48%',
    marginBottom: '2%',
  },
  button: {
    backgroundColor: '#020e94ff',
    width: '50%',
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
