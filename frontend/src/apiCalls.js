import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../frontend/src/context/AuthContext';


export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });   
    return res;
  
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
    return error;
  }
};
