import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  activeTab: string | null;
}

const initialState: SidebarState = {
  activeTab: "/store", // Initial active tab
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string | null>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;