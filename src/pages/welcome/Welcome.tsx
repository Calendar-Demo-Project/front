import { Link, useLocation } from 'react-router-dom';
import { FormSingIn } from '../../components/formSingIn/FormSingIn';
import { FormSingUp } from '../../components/formSingUp/FormSingUp';
import star from '../../public/images/icons/Star.png';
import calendar from '../../public/images/photo/calendar.png';
import style from './welcome.module.scss';

export const Welcome = () => {
  const location = useLocation().search;

  return (
    <>
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
      <div className={style.wrapper}>
        <header className={style.header}>
          <h2 className={style.logo}>Day.Master</h2>
          <div>
            <Link to="/?sing_in" className={style.in}>
              Sing in
            </Link>
            <Link to="/?sing_up" className={style.up}>
              Sing up
            </Link>
          </div>
        </header>
        <div className={style.describe}>
          <div className={style.shedule}>
            <img src={star} alt="star" />
            <span>Shedule Calendar</span>
          </div>
          <h2 className={style.title}>
            <span>Schedule</span> your Events and Tasks Quickly and Easily
          </h2>
          <p className={style.text}>
            Create events, tasks, and schedule meetings with Day.Master Get
          </p>
          <p className={style.text}>
            started right now and organize yor life and work without stress.
          </p>
          <div className={style.wrapper_button}>
            <Link to="/?sing_in" className={style.in}>
              Sing in
            </Link>
            <Link to="/?sing_up" className={style.up}>
              Sing up
            </Link>
          </div>
        </div>
        <img src={calendar} alt="calendar" className={style.calendar} />
      </div>
    </>
  );
};
