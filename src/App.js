import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import Application from './pages/Application';
import Introduction from './pages/Introduction';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/introduces" element={<Introduction />} />
        <Route
          path="/applications"
          element={
            <Application
              isLoggedin={isLoggedin}
              setIsLoggedin={setIsLoggedin}
            />
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
