import React from 'react';
import "./App.css";
import { NavLink, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Navigation from './components/navigation';


  const App = () => (
    <div className='app'>
      <h1>Demo</h1>
      <Navigation></Navigation>
      <Main></Main>
    </div>
  );

  const Main = () => (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
    </Routes>
  );


export default App