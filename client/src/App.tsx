import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import AuthWrapper from './pages/Auth/AuthWrapper';
import EmailVerificationNotice from './pages/Auth/EmailVerificationNotice';
import EmailVerificationResult from './pages/Auth/EmailVerificationResult';
import LoginForm from './pages/Auth/LoginForm';
import RegistrationForm from './pages/Auth/RegistrationForm';
import Signup from './pages/Auth/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/auth' element={<Signup />}>
          <Route element={<AuthWrapper />}>
            <Route path='register' element={<RegistrationForm />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='verify-email' element={<EmailVerificationNotice />} />
            <Route path='verify-email-result' element={<EmailVerificationResult />} />
          </Route>
        </Route>

        <Route path='/*' element={<Navigate to='/auth/login' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
