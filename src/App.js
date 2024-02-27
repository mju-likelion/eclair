import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import Introduction from './pages/Introduction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/introduces" element={<Introduction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
