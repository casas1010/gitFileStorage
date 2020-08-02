import { DELETE_ALL_ITEMS } from "./types";
import { DELETE_ITEM } from "./types";
import { ADD_ITEM } from "./types";

export const addItemToList = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const deleteItem = (itemId)=>{
  return{
    type: DELETE_ITEM,
    payload: itemId
  }
}

export const deleteAllItems = ()=>{
  return{
    type: DELETE_ALL_ITEMS,
 
  }
}