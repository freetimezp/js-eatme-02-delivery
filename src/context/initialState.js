import { fetchUser } from "../utils/fetchLocalstorageData"

const useInfo = fetchUser();

export const initialState = {
  user: useInfo,
  foodItems: null,
  cartShow: false,
}