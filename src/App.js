import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import Introduction from './pages/Introduction';
import { useState } from 'react';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/introduces" element={<Introduction />} />
        <Route
          path="/"
          element={
            <Main isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
          }
        />
        <Route
          path="/login"
          element={<LogIn setIsLoggedin={setIsLoggedin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
