import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});

export default store;
