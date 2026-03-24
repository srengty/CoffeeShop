import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReceiveOrder() {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>(
    ScreenOrientation.Orientation.PORTRAIT_UP,
  );
  async function getOrientation() {
    const currentOrientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(currentOrientation);
  }
  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        setOrientation(evt.orientationInfo.orientation);
      },
    );
    getOrientation();
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);
  async function fetchCategories() {
    let token = (await AsyncStorage.getItem("token")) ?? "";
    console.log("token", token);
    let response = await fetch(
      "https://dev.orderzone.net/webservice_ionic/oraApiNew/menu_category_list_new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
        body: JSON.stringify({
          userid: "171",
          resid: "171",
          lat: 1,
          long: 1,
          maincateid: 0,
          nextpage: 0,
        }),
      },
    );
    let data = await response.json();
    console.log(data?.response?.CateData[1]);
    setCategories(data?.response?.CateData ?? []);
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  const getProducts = async () => {
    let token = (await AsyncStorage.getItem("token")) ?? "";
    console.log("token", token);
    let response = await fetch(
      "https://dev.orderzone.net/webservice_ionic/oraApiNew/menu_category_list_new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
        body: JSON.stringify({
          userid: "171",
          resid: "171",
          lat: 1,
          long: 1,
          maincateid: selectedCategory?.maincateid,
          nextpage: 0,
        }),
      },
    );
    let data = await response.json();
    setProducts(data?.response?.MenuData);
    console.log(data?.response?.MenuData);
  };
  useEffect(() => {
    getProducts();
  }, [selectedCategory]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        horizontal
        style={{
          marginTop: 50,
          maxHeight: 50,
          gap: 8,
          backgroundColor: "brown",
          padding: 8,
        }}
      >
        {categories.map((cat: any) => (
          <TouchableOpacity
            key={cat.maincateid}
            style={{ padding: 10, width: "auto", height: 50 }}
            onPress={() => setSelectedCategory(cat)}
          >
            <View
              style={{
                borderBottomColor: "blue",
                borderBottomWidth: selectedCategory == cat ? 2 : 0,
              }}
            >
              <Text style={{ color: "white" }}>{cat.maincatename}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.productList}>
          <Text>List of products</Text>
          {orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ? (
            <ProductList3 numColumns={3} products={products} />
          ) : (
            <ProductList1 numColumns={1} products={products} />
          )}
        </View>
        <View style={styles.orderDetails}>
          <Text>Order details</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ProductList3({
  numColumns,
  products,
}: {
  numColumns: number;
  products: any[];
}) {
  return (
    <FlatList
      numColumns={3}
      style={{ flex: 1 }}
      data={products}
      renderItem={({ item }: { item: any }) => {
        return <ItemView item={item} />;
      }}
      keyExtractor={(item: any) => item.id}
    ></FlatList>
  );
}
function ProductList1({
  numColumns,
  products,
}: {
  numColumns: number;
  products: any[];
}) {
  return (
    <FlatList
      numColumns={1}
      style={{ flex: 1 }}
      data={products}
      renderItem={({ item }: { item: any }) => {
        return <ItemView item={item} />;
      }}
      keyExtractor={(item: any) => item.id}
    ></FlatList>
  );
}
function ItemView({ item }: { item: any }) {
  let img = item.menu_photo_thumb.replace(
    "../../",
    "https://dev.orderzone.net/",
  );
  return (
    <TouchableOpacity
      onPress={() => {
        AsyncStorage.setItem("selectedProduct", JSON.stringify(item));
        router.push("/order-options");
      }}
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 12,
        overflow: "hidden",
        margin: 8,
      }}
    >
      <Image
        source={img}
        style={{
          width: "100%",
          aspectRatio: 2 / 1.5,
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <View style={{ padding: 8 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ width: "100%", lineHeight: 30 }}
        >
          {item.menu_name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            width: "100%",
            color: "brown",
            lineHeight: 30,
            fontWeight: "bold",
          }}
        >
          ${item.menu_price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "brown",
    paddingTop: 1,
    gap: 1,
  },
  productList: {
    flex: 10,
    backgroundColor: "#FFFFFF",
    padding: 8,
  },
  orderDetails: {
    flex: 8,
    backgroundColor: "#FFFFFF",
    padding: 8,
  },
});
