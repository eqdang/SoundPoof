import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import { login, logout, signup } from "./actions/session_actions";

// document.addEventListener('DOMContentLoaded', () => {
//     const root = document.getElementById('root');
//     const store = configureStore();
//     const Launch = <h1>RachetPoof has launched!</h1>
//     ReactDOM.render(
//       <h2>RachetPoof has launched!</h2>,
//       document.getElementById('root')
//     );
// });

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    // window.login = login;
    // window.logout = logout;
    // window.signup = signup;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});