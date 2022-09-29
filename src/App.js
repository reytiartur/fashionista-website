import './App.css';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home'
import Authentication from './components/Authentication/Authentication';
import Shop from './components/Shop/Shop';
import Checkout from './components/Checkout/Checkout';

import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='shop' element={<Shop />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
