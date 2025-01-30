import {
  BrowserRouter,
  Routes,
  Route,
  Navigate

  /* createBrowserRouter,
  RouterProvider */
} from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';

import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';

/* const router = createBrowserRouter([
  { element: <Dashboard />, path: 'dashboard' },
  { element: <Account />, path: 'account' },
  { element: <Bookings />, path: 'bookings' },
  { element: <Cabins />, path: 'cabins' },
  { element: <Login />, path: 'login' },
  { element: <Settings />, path: 'settings' },
  { element: <Users />, path: 'users' },
  { element: <PageNotFound />, path: '*' }
]); */

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* declarative redirect to dashboard */}
          <Route index element={<Navigate replace to={'dashboard'} />} />{' '}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="login" element={<Login />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} />; */}
    </>
  );
}

export default App;
