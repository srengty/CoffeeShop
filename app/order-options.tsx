import AsyncStorage from "@react-native-async-storage/async-storage";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OrderOptions() {
  const [product, setProduct] = useState<any>(null);
  async function getSelectedProduct() {
    let product = await AsyncStorage.getItem("selectedProduct");
    if (product) {
      setProduct(JSON.parse(product));
    }
  }
  useEffect(() => {
    getSelectedProduct();
  }, [product]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.title}>
        <Text style={{ color: "#fff" }}>OrderOptions</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#fff" }}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {product && product.sizeoption === "size" && (
          <SizeOptions sizes={product.sizes} />
        )}
        {product && product.addons.length > 0 && <Text>Select addons</Text>}
      </View>
    </View>
  );
}

function SizeOptions({ sizes }: { sizes: any[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(sizes);
  return (
    <SegmentedControl
      values={sizes.map(
        (size) => `${size.menu_slice_name}($${size.menu_slice_price})`,
      )}
      selectedIndex={selectedIndex}
      onChange={(event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "brown",
    color: "#fff",
    padding: 8,
  },
  content: {
    flex: 1,
  },
});
