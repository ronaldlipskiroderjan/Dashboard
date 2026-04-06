import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ListaChamadas from './components/ListaChamadas';
import ResumoCards from './components/ResumoCards';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ResumoCards />} />
          <Route path="chamadas" element={<ListaChamadas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;