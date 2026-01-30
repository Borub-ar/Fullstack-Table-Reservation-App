import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Signup from './pages/Auth/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
