import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cv from './pages/Cv';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faGlobe,  } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faUserSecret, faGlobe, faStackOverflow)

function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cv">CV</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-app" element={<Home />} />
        <Route path="/cv" element={<Cv />} />
      </Routes>
    </>
  );
}

export default App;
