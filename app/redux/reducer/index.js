import authSlice from "../slice/auth.slice";
import cartSlice from "../slice/cart.slice";
import categorySlice from "../slice/category.slice";
import favouriteSlice from "../slice/favourite.slice";
import orderSlice from "../slice/order.slice";
import productSlice from "../slice/product.slice";
import reviewSlice from "../slice/review.slice";
import subCategorySlice from "../slice/subCategory.slice";
import { counterReducer } from "./counter.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    counter:counterReducer,
    category:categorySlice,
    subCategory:subCategorySlice,
    product:productSlice,
    cart:cartSlice,
    favourite:favouriteSlice,
    auth:authSlice,
    order:orderSlice,
    review:reviewSlice,
})