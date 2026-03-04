import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Dashboard from '../Dashboard/Dashboard';
import AdminProductList from '../Product/AdminProductList';
import AdminUserList from '../User/AdminUserList';
import AdminOrderList from '../Order/AdminOrderList';
import AdminMessages from '../Messages/AdminMessages';
import AdminProfile from '../Profile/AdminProfile';
import AdminSettings from '../Settings/AdminSettings';

const AdminRoutes = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  if (!user || user.role !== 'ADMIN') return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<AdminProductList />} />
        <Route path="users" element={<AdminUserList />} />
        <Route path="orders" element={<AdminOrderList />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />

        {/* Navigation compatibility */}
        <Route path="crop" element={<AdminProductList />} />
        <Route path="fruits" element={<AdminProductList />} />
        <Route path="daily-products" element={<AdminProductList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;