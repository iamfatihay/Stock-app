import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/';

// Async thunks for better error handling
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      // JSON Server'dan users verisi al
      const { data } = await axios.get(`${BASE_URL}users`);
      const user = data.find(u => u.email === userInfo.email && u.password === userInfo.password);
      
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
      // Önce email'in zaten var olup olmadığını kontrol et
      const { data: existingUsers } = await axios.get(`${BASE_URL}users`);
      const existingUser = existingUsers.find(u => u.email === userInfo.email);
      
      if (existingUser) {
        // eslint-disable-next-line no-unreachable
        return rejectWithValue('Email already exists');
      }
      
      // Yeni kullanıcı oluştur
      const newUser = {
        ...userInfo,
        id: Date.now(), // Basit ID generation
        is_superuser: false,
        created_at: new Date().toISOString()
      };
      
      const { data } = await axios.post(`${BASE_URL}users`, newUser);
      
      // Password'u response'dan çıkar
      // eslint-disable-next-line no-unused-vars
      const { password, ...userWithoutPassword } = data;
      
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