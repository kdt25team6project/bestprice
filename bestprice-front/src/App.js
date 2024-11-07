
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FridgeComponent from './Component/FridgeComponent/FridgeComponent';
import Headers from './Component/MainComponent/Header';
import Footer from './Component/MainComponent/Footer';
import MainpageContent from './Component/MainComponent/MainpageContent';


function App() {
  return (
    <BrowserRouter>
      <Headers/>
      <Routes>
        <Route path='/' element={<MainpageContent/>}></Route>
        <Route path='/fridge' element={<FridgeComponent/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
