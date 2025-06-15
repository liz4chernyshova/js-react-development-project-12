import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // Инициализация состояния из localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

  // Токен берём из user, если user есть
  const token = user?.token ?? null;

  // Вход — сохраняем userData и обновляем состояние
  const logIn = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUser(data);
  };

  // Выход — очищаем localStorage и состояние
  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ user, token, logIn, logOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
