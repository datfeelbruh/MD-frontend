import "./style.css";
import "react-toastify/dist/ReactToastify.css";

import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { Flip, ToastContainer } from "react-toastify";
import { tokenStore } from "@stores/tokenStore";
import Header from "@components/header/Header";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Login from "@pages/user/Login";
import Register from "@pages/user/Register";
import ResetPassword from "@pages/user/ResetPassword";
import User from "@pages/user/User";
import TitleSearch from "@pages/search/TitleSearch";
import { userStore } from "@stores/userStore";
import Movie from "@pages/movie/Movie";
import GenreSearch from "@pages/search/GenreSearch";
import UserSetting from "@pages/user/UserSettings";

export function App() {
  const token = tokenStore(state => state.token);
  const [user, setUser] = userStore(state => [state.user, state.set]);

  if (token !== null && user === null) {
    // TODO: replace with call GET /api/users/{id} 
    const tokenData = JSON.parse(window.atob(token.split(".")[1]));
    setUser({ id: tokenData.userId, username: tokenData.sub, email: "", avatar: null, about: null });
  }

  return (
    <div class="scrollbar-hide text-nord6 bg-nord0">
      <ToastContainer
        position="bottom-right"
        limit={5}
        toastClassName="bg-nord3"
        autoClose={3000}
        theme="colored"
        closeOnClick
        pauseOnHover
        transition={Flip}
      />
      <Header />
      <div class="flex flex-col justify-center mx-auto mt-2 w-4/6">
        <LocationProvider>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/user/:id" component={User} />
            <Route path="/userSettings/:id" component={UserSetting} />
            <Route path="/search/:title" component={TitleSearch} />
            <Route path="/genre/:genre" component={GenreSearch} />
            <Route path="/movie/:id" component={Movie} />
            <Route default component={NotFound} />
          </Router>
        </LocationProvider>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
