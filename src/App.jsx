import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './components/Auth';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Articles from './pages/admin/Articles'
import Store from './pages/Store';
import Ventes from './pages/admin/Ventes';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Routes nécessitant une authentification */}
        <Route element={<Auth roleRequired="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/ventes" element={<Ventes />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<Auth roleRequired="user" />}>
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
