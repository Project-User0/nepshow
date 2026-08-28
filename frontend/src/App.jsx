import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './utils/ProtectedRoute';
import LoginPage from './pages/registration/LoginPage';
import SignupPage from './pages/registration/SignupPage';
import HomePage from './pages/landing/HomePage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import FilterPage from './pages/user/FilterPage';
import UpdateProfilePage from './pages/user/UpdateProfilePage';
import SpecialsPage from './pages/user/SpecialsPage';
import NotificationsPage from './pages/user/NotificationsPage';
import CommunityPage from './pages/user/CommunityPage';
import ForgetPasswordPage from './pages/forgetpass/ForgetPasswordPage';
import ProfilePage from './pages/user/ProfilePage';
import PaymentPage from './pages/user/payment/PaymentPage';
import PreviewPage from './pages/user/PreviewPage';
import AdminPage from './pages/admin/AdminPage';
import Moviedetails from './pages/shared/Moviedetails';
import SharablePage from './pages/shared/SharablePage';
import OTPPage from './pages/forgetpass/OTPPage';
import ResetPasswordPage from './pages/forgetpass/ResetPasswordPage';
import AccountVerificationPage from './pages/registration/AccountVerificationPage';
import SearchPage from './components/landing/SearchedResult';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage /> } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verifyemail" element={<AccountVerificationPage />} />
      <Route path="/forgetpass" element={<ForgetPasswordPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/reset" element={<ResetPasswordPage />} />
      <Route path="/movies/:id" element={<Moviedetails />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/preview/:id" element={<ProtectedRoute><PreviewPage /></ProtectedRoute>} />
      <Route path="/shared/:id" element={<SharablePage />} />

      {/* Protected Routes */}
      <Route path="/userdash" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
      <Route path="/filter" element={<ProtectedRoute><FilterPage /></ProtectedRoute>} />
      <Route path="/updateprofile" element={<ProtectedRoute><UpdateProfilePage /></ProtectedRoute>} />
      <Route path="/specials" element={<ProtectedRoute><SpecialsPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/communitypost" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
