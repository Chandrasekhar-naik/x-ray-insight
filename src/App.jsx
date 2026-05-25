import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './lib/auth-context';
import Navbar from './components/Navbar';
import LoginPage from './routes/login';
import SignupPage from './routes/signup';
import AboutPage from './routes/about';
import HomePage from './routes/_authenticated/home';
import HistoryPage from './routes/_authenticated/history';
import DiagnosisPage from './routes/_authenticated/diagnosis.$id';
import ProfilePage from './routes/_authenticated/profile';
import IndexPage from './routes/index';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        element={
          <RequireAuth>
            <AuthLayout />
          </RequireAuth>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/diagnosis/:id" element={<DiagnosisPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
