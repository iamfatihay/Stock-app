import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { loginUser, registerUser, logoutUser, clearError } from "../features/authSlice";
import { useEffect } from "react";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error, isAuthenticated } = useSelector(state => state.auth);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Show error notifications
  useEffect(() => {
    if (error) {
      toastErrorNotify(error.message || "An error occurred");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const login = async (userInfo) => {
    try {
      const result = await dispatch(loginUser(userInfo)).unwrap();
      toastSuccessNotify("Login successful");
      navigate("/stock");
      return result;
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const register = async (userInfo) => {
    try {
      const result = await dispatch(registerUser(userInfo)).unwrap();
      toastSuccessNotify("Registration successful");
      navigate("/stock");
      return result;
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser(token)).unwrap();
      toastSuccessNotify("Logout successful");
      navigate("/");
    } catch (error) {
      // Even if server logout fails, we still logout locally
      toastSuccessNotify("Logout successful");
      navigate("/");
    }
  };

  return { 
    login, 
    register, 
    logout, 
    loading, 
    error, 
    isAuthenticated 
  };
};

export default useAuthCall;
