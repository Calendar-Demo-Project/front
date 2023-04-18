import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Main } from './pages/main/Main';

import style from './app.module.scss';
import { Welcome } from './pages/welcome/Welcome';
import { FormSingIn } from './components/formSingIn/FormSingIn';
import { FormSingUp } from './components/formSingUp/FormSingUp';

function App() {
  const location = useLocation().search;
  return (
    <div className={style.main}>
      {location && (
        <div className={style.background}>
          {location.includes('sing_in') && (
            <FormSingIn type={'enter'} title={'Sign In to your Account'} />
          )}
          {location.includes('forgot_password') && (
            <FormSingIn type="restore" title="Restore password" />
          )}
          {location.includes('sing_up') && (
            <FormSingUp title="Create your Account" />
          )}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="calendar" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
