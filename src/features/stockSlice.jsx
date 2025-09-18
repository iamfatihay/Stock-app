import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Not needed for mock data

// Mock data for demo purposes (works without backend)
const MOCK_DATA = {
  products: [
    {
      id: "1",
      name: "MacBook Pro 16\"",
      category: "Electronics",
      brand: "Apple",
      stock: 25,
      price: 2500,
      image: "https://picsum.photos/150/150?random=1",
      description: "High-performance laptop for professionals",
      created_at: "2024-01-01T00:00:00.000Z"
    },
    {
      id: "2", 
      name: "iPhone 15 Pro",
      category: "Electronics",
      brand: "Apple",
      stock: 50,
      price: 1200,
      image: "https://picsum.photos/150/150?random=2",
      description: "Latest iPhone with advanced features",
      created_at: "2024-01-02T00:00:00.000Z"
    },
    {
      id: "3",
      name: "Samsung Galaxy S24",
      category: "Electronics", 
      brand: "Samsung",
      stock: 30,
      price: 1100,
      image: "https://picsum.photos/150/150?random=3",
      description: "Premium Android smartphone",
      created_at: "2024-01-03T00:00:00.000Z"
    }
  ],
  brands: [
    { id: "1", name: "Apple", image: "https://picsum.photos/100/100?random=10" },
    { id: "2", name: "Samsung", image: "https://picsum.photos/100/100?random=11" },
    { id: "3", name: "Sony", image: "https://picsum.photos/100/100?random=12" }
  ],
  firms: [
    { id: "1", name: "TechCorp", phone: "+1-555-0123", address: "123 Tech St", image: "https://picsum.photos/100/100?random=20" },
    { id: "2", name: "ElectroMax", phone: "+1-555-0456", address: "456 Electro Ave", image: "https://picsum.photos/100/100?random=21" }
  ],
  categories: [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Books" }
  ],
  purchases: [
    {
      id: "1",
      firm_id: "1",
      product_id: "1", 
      quantity: 10,
      price: 2000,
      created_at: "2024-01-01T00:00:00.000Z"
    }
  ],
  sales: [
    {
      id: "1",
      product_id: "1",
      quantity: 5,
      price: 2500,
      created_at: "2024-01-01T00:00:00.000Z"
    }
  ]
};

// Generic async thunk for fetching data
export const fetchData = createAsyncThunk(
  "stock/fetchData",
  async ({ endpoint }, { rejectWithValue }) => {
    try {
      // Mock data'dan endpoint'e göre veri döndür
      const data = MOCK_DATA[endpoint] || [];
      return { endpoint, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching multiple related data
export const fetchRelatedData = createAsyncThunk(
  "stock/fetchRelatedData",
  async ({ endpoints }, { rejectWithValue }) => {
    try {
      // Mock data'dan endpoint'lere göre veri döndür
      const data = endpoints.map(endpoint => MOCK_DATA[endpoint] || []);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for creating new items
export const createItem = createAsyncThunk(
  "stock/createItem",
  async ({ endpoint, data }, { rejectWithValue }) => {
    try {
      // Mock olarak yeni item oluştur
      const newItem = {
        ...data,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      
      // Mock data'ya ekle (gerçekte persist edilmez)
      if (MOCK_DATA[endpoint]) {
        MOCK_DATA[endpoint].push(newItem);
      }
      
      return { endpoint, data: newItem };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating items
export const updateItem = createAsyncThunk(
  "stock/updateItem",
  async ({ endpoint, id, data }, { rejectWithValue }) => {
    try {
      // Mock olarak item güncelle
      const updatedItem = {
        ...data,
        id: id,
        updated_at: new Date().toISOString()
      };
      
      // Mock data'da güncelle (gerçekte persist edilmez)
      if (MOCK_DATA[endpoint]) {
        const index = MOCK_DATA[endpoint].findIndex(item => item.id === id);
        if (index !== -1) {
          MOCK_DATA[endpoint][index] = updatedItem;
        }
      }
      
      return { endpoint, id, data: updatedItem };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting items
export const deleteItem = createAsyncThunk(
  "stock/deleteItem",
  async ({ endpoint, id }, { rejectWithValue }) => {
    try {
      // Mock olarak item sil
      if (MOCK_DATA[endpoint]) {
        MOCK_DATA[endpoint] = MOCK_DATA[endpoint].filter(item => item.id !== id);
      }
      
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
