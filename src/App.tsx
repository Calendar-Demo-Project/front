import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/Main';

import style from './app.module.scss';
import { Welcome } from './pages/welcome/Welcome';

function App() {
  return (
    <div className={style.main}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="calendar" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
