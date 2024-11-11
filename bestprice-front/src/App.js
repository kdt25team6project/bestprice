
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FridgeComponent from './Component/FridgeComponent/FridgeComponent';
import Headers from './Component/MainComponent/Header';
import MainpageContent from './Component/MainComponent/MainpageContent';
import RankingComponent from './Component/RankingComponent/Ranking';


function App() {
  return (
    <BrowserRouter>
      <Headers/>
      <Routes>
        <Route path='/' element={<MainpageContent/>}></Route>
        <Route path='/fridge' element={<FridgeComponent/>}></Route>
        <Route path='/rank' element={<RankingComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
