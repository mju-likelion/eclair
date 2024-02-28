import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import ApplicationView from './pages/ApplicationView';
import { useState } from 'react';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/:studentId" element={<ApplicationView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
