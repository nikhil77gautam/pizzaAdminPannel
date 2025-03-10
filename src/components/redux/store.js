import { configureStore } from "@reduxjs/toolkit";
import getAllorderAdmin_slice from "./GetOrderSlice.js"
import getAllAdminPizza_Slice from "./getAllAdminPizza_Slice.js";
 import getAllAdminExpenses_Slice from "./adminExpenses_slice.js";
 import getAllAdminMeals_Slice from "./getallAdminmeals_Slice.js";
 import getAllUsers_Slice from "./getAllUsers_Slice.js"
 import getUserReview_Slice from "./getUserReview_slice.js"

 

const store=configureStore({
  
reducer:{
    getAllOrder:getAllorderAdmin_slice,
    getAdminPizzas:getAllAdminPizza_Slice,
    getAllExpenses:getAllAdminExpenses_Slice,
    getAllMeals:getAllAdminMeals_Slice,
    getAllUsers:getAllUsers_Slice,
    getUserReview:getUserReview_Slice
}  
})

export default store