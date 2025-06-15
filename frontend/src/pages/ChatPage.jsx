import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../store/slices/channelsSlice';
import { useAuth } from '../contexts/AuthContext';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { channels, messages, status } = useSelector((state) => state.channels);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [dispatch, token]);

  // const handleSend = () => {
  //   if (!messageText.trim()) return;
  //   dispatch(addMessage({
  //     id: Date.now(),
  //     channelId: currentChannelId,
  //     username: 'admin',
  //     body: messageText,
  //   }));
  //   setMessageText('');
  // };

  if (status === 'loading') return <div>Loading chat data...</div>;
  if (status === 'failed') return <div>Error loading data</div>;

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '30%', borderRight: '1px solid gray' }}>
        <h3>Каналы</h3>
        <ul>
          {(channels || []).map((ch) => (
            <li key={ch.id}>{ch.name}</li>
          ))}
        </ul>
      </aside>
      <main style={{ width: '70%', paddingLeft: '1rem' }}>
        <h3>Чат</h3>
        <ul>
          {(messages || []).map((msg) => (
            <li key={msg.id}>
              <strong>{msg.username}</strong>: {msg.body}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Введите сообщение"
            style={{ flexGrow: 1 }}
          />
          <button>Отправить</button>
          {/* <button onClick={handleSend}>Отправить</button> */}
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
