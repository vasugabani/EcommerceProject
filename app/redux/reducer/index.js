import cartSlice from "../slice/cart.slice";
import categorySlice from "../slice/category.slice";
import productSlice from "../slice/product.slice";
import subCategorySlice from "../slice/subCategory.slice";
import { counterReducer } from "./counter.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    counter:counterReducer,
    category:categorySlice,
    subCategory:subCategorySlice,
    product:productSlice,
    cart: cartSlice
})