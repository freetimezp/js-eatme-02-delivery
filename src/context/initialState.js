import { fetchUser } from "../utils/fetchLocalstorageData"

const useInfo = fetchUser();

export const initialState = {
  user: useInfo,
  
}