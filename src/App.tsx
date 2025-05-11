import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cv from './pages/Cv';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faGlobe,  } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faUserSecret, faGlobe, faStackOverflow)

function App() {
  return (
    <>
      <Routes>
        <Route path="cv/:gapikey/:gsheetid" element={<Cv />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
