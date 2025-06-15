import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createAxios from '../../api/axiosInstance';

export const fetchChatData = createAsyncThunk(
  'channels/fetchChatData',
  async (token, thunkAPI) => {
    try {
      const api = createAxios(token);
      const [channelsRes, messagesRes] = await Promise.all([
        api.get('/api/v1/channels'),
        api.get('/api/v1/messages'),
      ]);
      return {
        channels: channelsRes.data,
        messages: messagesRes.data,
        currentChannelId: channelsRes.data[0]?.id || null,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  status: 'idle',
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        const { channels, messages, currentChannelId } = action.payload;
        state.channels = channels;
        state.messages = messages;
        state.currentChannelId = currentChannelId;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки данных';
      });
  },
});

export const { setCurrentChannelId, addMessage } = channelsSlice.actions;
export default channelsSlice.reducer;
