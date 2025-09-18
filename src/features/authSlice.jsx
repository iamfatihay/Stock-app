import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Not needed for mock data

// Mock users for demo purposes (works without backend)
const MOCK_USERS = [
  {
    id: 1,
    email: "admin@stockapp.com",
    password: "admin123",
    username: "admin",
    first_name: "Admin",
    last_name: "User",
    is_superuser: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    email: "demo@stockapp.com", 
    password: "demo123",
    username: "demo",
    first_name: "Demo",
    last_name: "User",
    is_superuser: false,
    created_at: "2024-01-01T00:00:00Z"
  }
];

// Async thunks for better error handling
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      // Mock users'dan kontrol et
      const user = MOCK_USERS.find(u => u.email === userInfo.email && u.password === userInfo.password);
      
      if (user) {
        // Password'u response'dan çıkar
        // eslint-disable-next-line no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return { 
          key: `token-${user.id}-${Date.now()}`, 
          user: userWithoutPassword 
        };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      // Mock users'dan email kontrolü
      const existingUser = MOCK_USERS.find(u => u.email === userInfo.email);
      
      if (existingUser) {
        return rejectWithValue('Email already exists');
      }
      
      // Yeni kullanıcı oluştur (mock olarak)
      const newUser = {
        ...userInfo,
        id: Date.now(),
        is_superuser: false,
        created_at: new Date().toISOString()
      };
      
      // Password'u response'dan çıkar
      // eslint-disable-next-line no-unused-vars
      const { password, ...userWithoutPassword } = newUser;
      
      return { 
        username: userWithoutPassword.username, 
        token: `token-${userWithoutPassword.id}-${Date.now()}`,
        user: userWithoutPassword
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    // Mock backend için logout sadece success döner
    return true;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    isAdmin: false,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload?.user?.username;
        state.isAdmin = action.payload?.user?.is_superuser;
        state.token = action.payload?.key;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload?.username;
        state.token = action.payload?.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.token = null;
        state.isAdmin = false;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still logout locally even if server request fails
        state.currentUser = null;
        state.token = null;
        state.isAdmin = false;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;