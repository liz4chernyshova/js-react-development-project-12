import createAxios from './axiosInstance';

export const getMessages = async (token) => {
  const api = createAxios(token);
  const response = await api.get('/api/v1/messages');
  return response.data;
};

export const sendMessage = async ({ token, body, channelId, username }) => {
  const api = createAxios(token);
  const message = { body, channelId, username };
  const response = await api.post('/api/v1/messages', message);
  return response.data;
};

export const editMessage = async ({ token, id, newBody }) => {
  const api = createAxios(token);
  const response = await api.patch(`/api/v1/messages/${id}`, { body: newBody });
  return response.data;
};

export const deleteMessage = async ({ token, id }) => {
  const api = createAxios(token);
  const response = await api.delete(`/api/v1/messages/${id}`);
  return response.data;
};
