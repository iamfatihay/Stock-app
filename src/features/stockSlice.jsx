import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/';

// Generic async thunk for fetching data
export const fetchData = createAsyncThunk(
  "stock/fetchData",
  async ({ endpoint, token }, { rejectWithValue }) => {
    try {
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const { data } = await axios.get(`${BASE_URL}${endpoint}`, { headers });
      return { endpoint, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching multiple related data
export const fetchRelatedData = createAsyncThunk(
  "stock/fetchRelatedData",
  async ({ endpoints, token }, { rejectWithValue }) => {
    try {
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const promises = endpoints.map(endpoint =>
        axios.get(`${BASE_URL}${endpoint}`, { headers })
      );
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for creating new items
export const createItem = createAsyncThunk(
  "stock/createItem",
  async ({ endpoint, data, token }, { rejectWithValue }) => {
    try {
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
      return { endpoint, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating items
export const updateItem = createAsyncThunk(
  "stock/updateItem",
  async ({ endpoint, id, data, token }, { rejectWithValue }) => {
    try {
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const response = await axios.put(`${BASE_URL}${endpoint}/${id}`, data, { headers });
      return { endpoint, id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting items
export const deleteItem = createAsyncThunk(
  "stock/deleteItem",
  async ({ endpoint, id, token }, { rejectWithValue }) => {
    try {
      const headers = token ? { Authorization: `Token ${token}` } : {};
      await axios.delete(`${BASE_URL}${endpoint}/${id}`, { headers });
      return { endpoint, id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    loading: false,
    error: null,
    brands: [],
    firms: [],
    products: [],
    purchases: [],
    sales: [],
    categories: [],
    // Cache for better performance
    lastFetch: {},
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state, action) => {
      const { endpoint } = action.payload;
      if (state[endpoint]) {
        state[endpoint] = [];
      }
    },
    resetStock: (state) => {
      state.brands = [];
      state.firms = [];
      state.products = [];
      state.purchases = [];
      state.sales = [];
      state.categories = [];
      state.error = null;
      state.lastFetch = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch data cases
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        const { endpoint, data } = action.payload;
        state[endpoint] = data;
        state.lastFetch[endpoint] = Date.now();
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch related data cases
      .addCase(fetchRelatedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedData.fulfilled, (state, action) => {
        state.loading = false;
        const [products, brands, categories] = action.payload;
        state.products = products;
        state.brands = brands;
        state.categories = categories;
        state.error = null;
      })
      .addCase(fetchRelatedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create item cases
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        const { endpoint, data } = action.payload;
        state[endpoint].push(data);
        state.error = null;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update item cases
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const { endpoint, id, data } = action.payload;
        const index = state[endpoint].findIndex(item => item.id === id);
        if (index !== -1) {
          state[endpoint][index] = data;
        }
        state.error = null;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete item cases
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        const { endpoint, id } = action.payload;
        state[endpoint] = state[endpoint].filter(item => item.id !== id);
        state.error = null;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearData, resetStock } = stockSlice.actions;
export default stockSlice.reducer;
