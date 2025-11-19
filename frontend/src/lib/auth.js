import { jwtDecode } from "jwt-decode";
import { getUserFromLocal } from "../features/local/local.js"



export const getAutUser = () => {
  const user = getUserFromLocal();
  if (user?.token){
    try {
      const decoded = jwtDecode(user.token)
      return decoded;
    } catch (err) {
      console.error("Invalid token", err)
      return null;
    }
    
  }return null
}