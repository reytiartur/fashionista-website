import './App.css';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home'
import Authentication from './components/Authentication/Authentication';

import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='auth' element={<Authentication />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
