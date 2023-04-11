import React from 'react';
import { Main } from './pages/main/Main';

import style from './app.module.scss';

function App() {
  return (
    <div className={style.main}>
      <Main />
    </div>
  );
}

export default App;
