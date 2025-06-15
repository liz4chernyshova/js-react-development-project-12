import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    } />
    <Route path="/login" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
