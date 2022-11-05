import { fetchCart, fetchUser } from "../utils/fetchLocalstorageData"

const useInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: useInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
}