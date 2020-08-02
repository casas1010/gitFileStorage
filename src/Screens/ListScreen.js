import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
  Text,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import ListCard from "../components/ListCard";

const SC_WIDTH = Math.round(Dimensions.get("window").width);
const SC_HEIGHT = Math.round(Dimensions.get("window").height);

const ListScreen = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.items);
    console.log("items have changed!");
  }, [props.items]);

  const deleteItemCallback = (barcode) => {
    props.deleteItem(barcode);
    // console.log(items)
  };

  return (
    <ImageBackground
      source={require("../../assets/background2.png")}
      style={styles.ImageBackground}
    >
      <FlatList
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled
        data={props.items}
        keyExtractor={(element) => element.barcode}
        renderItem={(element) => {
          return (
            <>
              <ListCard
                imageURL={element.item.imageURL}
                name={element.item.name}
                barcode={element.item.barcode}
                onPressAction={deleteItemCallback}
              />
            </>
          );
        }}
      />
    </ImageBackground>
  );
};

ListScreen.navigationOptions = {
  tabBarIcon: <Feather name="list" size={24} color="white" />,
  tabBarOptions:{
    activeBackgroundColor: 'black',
    inactiveBackgroundColor: 'black'
  }
};

const styles = StyleSheet.create({
  list: {
    paddingLeft: 15,
    paddingTop: 20,
  },
  ImageBackground: {
    position: "relative",
    flex: 1,
    width: SC_WIDTH,
    height: SC_HEIGHT,
  },
});

function mapStateToProps({ items }) {
  return { items };
}

export default connect(mapStateToProps, actions)(ListScreen);
