import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatData, setCurrentChannelId, addMessage } from '../store/slices/channelsSlice';
import { useAuth } from '../contexts/AuthContext';
import socket from '../lib/socket';
import { sendMessage } from '../api/messages';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { token, user } = useAuth();
  const { channels, messages, currentChannelId, status, error } = useSelector((state) => state.channels);

  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (token) dispatch(fetchChatData(token));
  }, [dispatch, token]);

  useEffect(() => {
    socket.auth = { token };
    socket.connect();
    socket.on('newMessage', (msg) => dispatch(addMessage(msg)));
    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [dispatch, token]);

  const currentMessages = (messages || []).filter((m) => m.channelId === currentChannelId);
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);

  const handleSend = async () => {
    if (!messageText.trim()) return;
    try {
      await sendMessage({
        token,
        body: messageText,
        channelId: currentChannelId,
        username: user.username,
      });
      setMessageText('');
    } catch (err) {
      console.error('Ошибка при отправке сообщения:', err);
    }
  };

  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '25%', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h4>Каналы</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {channels.map((ch) => (
            <li
              key={ch.id}
              style={{
                cursor: 'pointer',
                fontWeight: ch.id === currentChannelId ? 'bold' : 'normal',
              }}
              onClick={() => dispatch(setCurrentChannelId(ch.id))}
            >
              #{ch.name}
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <h4>#{currentChannel?.name}</h4>
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {currentMessages.map((msg) => (
            <div key={msg.id}>
              <strong>{msg.username}:</strong> {msg.body}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Введите сообщение"
            style={{ flexGrow: 1 }}
          />
          <button onClick={handleSend}>Отправить</button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
