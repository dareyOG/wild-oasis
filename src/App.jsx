import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
  /* createBrowserRouter,
  RouterProvider */
} from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/*  react-query dev tools */}
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* declarative redirect to dashboard */}
            <Route index element={<Navigate replace to={'dashboard'} />} />{' '}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} />; */}
    </QueryClientProvider>
  );
}

export default App;
