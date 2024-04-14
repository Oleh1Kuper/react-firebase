import { createSlice } from '@reduxjs/toolkit';

type Notification = {
  id: string;
  title: string;
  path: string;
  status: string;
  createdAt: string;
};

type State = {
  readNotifications: Notification[];
  unreadNotifications: Notification[];
  reloadNotifications: boolean;
};

const initialState: State = {
  readNotifications: [],
  unreadNotifications: [],
  reloadNotifications: true,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setReadNotifications: (state, action) => {
      state.readNotifications = action.payload;
    },
    setUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
    },
    setReloadNotifications: (state, action) => {
      state.reloadNotifications = action.payload;
    },
  },
});

export const { actions } = notificationsSlice;
export default notificationsSlice.reducer;
