import { createSlice } from "@reduxjs/toolkit";

const currentPageSlice = createSlice({
  name: "current",
  initialState: {
    currentPage: 1,
    filter: null,
    dataFilter: [],
    filterClick: 0,
    currentPageIndex: 1,
    filterIndex: null,
    dataFilterIndex: [],
    filterClickIndex: 0,
    nhaMayChange: 0,
    refreshTable: false,
    rowSelect: null,
    addClick: false,
    changeClick: false,
    open: false,
    idFilter: null,
    loading: false,
  },
  reducers: {
    setIdFilter: (state, action) => {
      state.idFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDataFilter: (state, action) => {
      state.dataFilter = action.payload;
    },
    setCurrentPageIndex: (state, action) => {
      state.currentPageIndex = action.payload;
    },
    setFilterIndex: (state, action) => {
      state.filterIndex = action.payload;
    },
    setDataFilterIndex: (state, action) => {
      state.dataFilterIndex = action.payload;
    },
    setClickFilter: (state, action) => {
      state.filterClick = action.payload;
    },
    setClickFilterIndex: (state, action) => {
      state.filterClickIndex = action.payload;
    },
    setNhaMayChange: (state, action) => {
      state.nhaMayChange = action.payload;
    },
    setRefreshTable: (state, action) => {
      state.refreshTable = action.payload;
    },
    setRowSelect: (state, action) => {
      state.rowSelect = action.payload;
    },
    setAddClick: (state, action) => {
      state.addClick = action.payload;
    },
    setChangeClick: (state, action) => {
      state.changeClick = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setLoading,
  setFilter,
  setDataFilter,
  setClickFilter,
  setCurrentPageIndex,
  setFilterIndex,
  setDataFilterIndex,
  setClickFilterIndex,
  setNhaMayChange,
  setRefreshTable,
  setRowSelect,
  setAddClick,
  setChangeClick,
  setOpen,
  setIdFilter,
} = currentPageSlice.actions;

export default currentPageSlice;
