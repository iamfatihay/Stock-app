import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    loading: false,
    error: false,
    brands: [],
    firms: [],
    products: [],
    purchases: [],
    sales: [],
    categories: [],
    //! statelerimizin isimleri ile endpointlerimizin isimlerini aynı verdik. Bunun sebebi tek bir reducerla tüm stateleri dinamik bir şekilde doldurabilelim.
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    // brandsSuccess,
    // firmsSuccess,
    getSucces: (state, { payload }) => {
      state.loading = false;
      state[payload.url] = payload.data; // state["firms"], state["brands"] anlamlarına gelerek tek bir reducerla tüm stateleri doldurabilmiş olduk.
    },
    getProCatBrandSucces: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.brands = payload[1];
      state.categories = payload[2];
    },
    getProPurcFirBrandsSucces: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.purchases = payload[1];
      state.firms = payload[2];
      state.brands = payload[3];
    },
    getProSalBrandsSucces: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.brands = payload[1];
      state.sales = payload[2];
    },
    getPurcSalesSucces: (state, { payload }) => {
      state.loading = false;
      state.purchases = payload[0];
      state.sales = payload[1];
    },

    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSucces,
  fetchFail,
  getProCatBrandSucces,
  getProPurcFirBrandsSucces,
  getProSalBrandsSucces,
  getPurcSalesSucces,
} = stockSlice.actions;
export default stockSlice.reducer;

// async-thunk yerine manuel dispatclerle yapıyoruz. extra reducerlarla yapmadan da bu şekilde yapabiliyoruz. İki yönteminde avantajı ve dezavantajı var.
