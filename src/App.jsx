import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import IncomeTax from './components/IncomeTax';
import Update from './components/IncomeTax/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='cadastro-opcoes' element={<Register />} />
        <Route path='simulador' element={<IncomeTax />} />
        <Route path='simulador/atualizar' element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
