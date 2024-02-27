import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import ApplicationView from './pages/ApplicationView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/:studentId" element={<ApplicationView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
