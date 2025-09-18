import { useDispatch, useSelector } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { 
  fetchData, 
  fetchRelatedData, 
  createItem, 
  updateItem, 
  deleteItem, 
  clearError 
} from "../features/stockSlice";
import { useEffect } from "react";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector(state => state.auth);
  const { loading: stockLoading, error: stockError } = useSelector(state => state.stock);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Show error notifications
  useEffect(() => {
    if (stockError) {
      toastErrorNotify(stockError.message || "An error occurred");
      dispatch(clearError());
    }
  }, [stockError, dispatch]);

  const getStockData = async (endpoint) => {
    try {
      await dispatch(fetchData({ endpoint, token })).unwrap();
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const deleteStockData = async (endpoint, id) => {
    try {
      await dispatch(deleteItem({ endpoint, id, token })).unwrap();
      toastSuccessNotify(`${endpoint} successfully deleted!`);
      // Refresh the data after deletion
      getStockData(endpoint);
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const postStockData = async (endpoint, data) => {
    try {
      await dispatch(createItem({ endpoint, data, token })).unwrap();
      toastSuccessNotify(`${endpoint} successfully created!`);
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const putStockData = async (endpoint, data) => {
    try {
      await dispatch(updateItem({ endpoint, id: data.id, data, token })).unwrap();
      toastSuccessNotify(`${endpoint} successfully updated!`);
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  // Specialized functions for complex data fetching
  const getProCatBrand = async () => {
    try {
      await dispatch(fetchRelatedData({ 
        endpoints: ["products", "brands", "categories"], 
        token 
      })).unwrap();
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const getProSalBrands = async () => {
    try {
      const promises = [
        dispatch(fetchData({ endpoint: "products", token })),
        dispatch(fetchData({ endpoint: "brands", token })),
        dispatch(fetchData({ endpoint: "sales", token }))
      ];
      await Promise.all(promises);
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const getProPurcFirBrands = async () => {
    try {
      const promises = [
        dispatch(fetchData({ endpoint: "products", token })),
        dispatch(fetchData({ endpoint: "purchases", token })),
        dispatch(fetchData({ endpoint: "firms", token })),
        dispatch(fetchData({ endpoint: "brands", token }))
      ];
      await Promise.all(promises);
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  const getPurcSales = async () => {
    try {
      const promises = [
        dispatch(fetchData({ endpoint: "purchases", token })),
        dispatch(fetchData({ endpoint: "sales", token }))
      ];
      await Promise.all(promises);
    } catch (error) {
      // Error is handled by useEffect above
    }
  };

  return {
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
    getProCatBrand,
    getProSalBrands,
    getProPurcFirBrands,
    getPurcSales,
    loading: loading || stockLoading,
    error: error || stockError
  };
};

export default useStockCall;
