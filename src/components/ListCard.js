import React, {useEffect} from "react";
import { View, Image, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
// import { connect } from "react-redux";
// import * as actions from "../actions/index";

const ListCard = ({ imageURL, name, barcode, onPressAction}) => {



  return (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: imageURL }} alt={barcode} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>Name: {name}</Text>
        <Text style={styles.barcodeText}>Barcode: {barcode}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.trash} 
        onPress={()=>onPressAction(barcode)} 
        >
          <Feather name="trash"  size={33} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "#00194d",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00194d",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 1,
  },
  textContainer: { alignSelf: "flex-start", paddingLeft: 5 },
  nameText: {
    fontSize: 20,
    color: "white",
    paddingBottom: 3,
  },
  barcodeText: {
    color: "grey",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trash: {
    position: "absolute",
    right: 10,
    backgroundColor: "red",
  },
});

export default ListCard
// export default connect(null, actions)(ListCard);
