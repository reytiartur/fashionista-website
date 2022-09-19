import './App.css';
import Navigation from './components/Navigation/Navigation';

import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />} />

      </Routes>
    </div>
  );
}

export default App;
