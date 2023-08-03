import '@/style.css';
import "react-toastify/dist/ReactToastify.css";

import { render } from 'preact';
import { useState } from 'preact/hooks';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Flip, ToastContainer } from 'react-toastify';
import Home from '@pages/Home';
import Movie from '@pages/Movie';
import User from '@pages/User';
import Search from '@pages/Search';
import NotFound from '@pages/NotFound';
import Header from '@components/header/Header';
import GenreSearch from '@pages/GenreSearch';

export const TOKEN_NAME = "token";
export const STORAGE = localStorage;

function App() {
  const [token, _setToken] = useState(STORAGE.getItem(TOKEN_NAME));

  function setToken(token) {
    STORAGE.setItem(TOKEN_NAME, token);
    _setToken(token);
  }

  let user = token !== null ? JSON.parse(window.atob(token.split(".")[1])) : undefined;

  return (
    <div class="scrollbar-hide text-nord6">
      <ToastContainer
        position="bottom-right"
        limit={5}
        toastClassName="bg-nord3"
        autoClose={3000}
        theme="idk"
        closeOnClick
        pauseOnHover
        transition={Flip}
      />
      <Header user={user} setToken={setToken} />
      <div class="flex flex-col justify-center px-1 mx-auto mt-2 w-4/6 text-nord6 bg-nord0">
        <LocationProvider>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/movie/:id" component={Movie} />
            <Route path="/user/:id" component={User} />
            <Route path="/search/:title" component={Search} />
            <Route path="/genre/:genre" component={GenreSearch} />
            <Route default component={NotFound} />
          </Router>
        </LocationProvider>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
