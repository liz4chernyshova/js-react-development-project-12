import createAxios from './axiosInstance';

export const getChannels = async (token) => {
  const api = createAxios(token);
  const response = await api.get('/api/v1/channels');
  return response.data;
};

export const addChannel = async (token, name) => {
  const api = createAxios(token);
  const response = await api.post('/api/v1/channels', { name });
  return response.data;
};

export const renameChannel = async (token, id, name) => {
  const api = createAxios(token);
  const response = await api.patch(`/api/v1/channels/${id}`, { name });
  return response.data;
};

export const deleteChannel = async (token, id) => {
  const api = createAxios(token);
  const response = await api.delete(`/api/v1/channels/${id}`);
  return response.data;
};
