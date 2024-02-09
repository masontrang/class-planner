import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Overview from './pages/Overview';
import ClassCreation from './pages/ClassCreation';

import NavBar from './components/NavBar';
import ClassPage from './pages/ClassPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="*" element={<NoPage />} /> */}

          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/classcreation" element={<ClassCreation />} />
          <Route path="/class/:classId" element={<ClassPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
