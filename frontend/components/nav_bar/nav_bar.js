import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, openModal }) => {

  //allows for css scroll effect
  // const debounce = (fn) => {
  //   let frame;
  //   return (...params) => {
  //     if (frame) {
  //       cancelAnimationFrame(frame);
  //     }
  //     frame = requestAnimationFrame(() => {
  //       fn(...params);
  //     });

  //   }
  // };
  // const storeScroll = () => {
  //   document.documentElement.dataset.scroll = window.scrollY;
  // }
  // document.addEventListener('scroll', debounce(storeScroll), { passive: true });
  // storeScroll();
  //end scroll effect code//

  const display = !!currentUser ? (
    <div>
      <Link className="return" to="/app">Return to my Dietsana</Link>
    </div>
  ) : (
      <div>
        <button className="login" onClick={() => openModal('login')}>Log In</button>
        <button className="signup-navbar" onClick={() => openModal('signup')}>Try for free</button>
      </div>
    );
  return (
    <header className="nav-bar">
      <img src={window.logo} className="asana-logo"/> 
      <div>
        {display}
      </div>
    </header>
  )
}

//change asana logo, referenced line 38