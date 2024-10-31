
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FridgeComponent from './Component/FridgeComponent/FridgeComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FridgeComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
