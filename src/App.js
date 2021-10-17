import Movies from "./Pages/Movies";
import Shows from "./Pages/Shows";
import Wishlist from "./Pages/Wishlist";
import Search from "./Pages/Search";
import Details from "./Pages/Details";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { WishlistProvider } from "./WishlistContext";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" exact component={Movies} />
            <Route path="/tv" exact component={Shows} />
            <Route path="/wishlist" exact component={Wishlist} />
            <Route path="/search/:searchterm" exact component={Search} />
            <Route path="/movie/:id" exact component={Details} />
            <Route path="/tv/:id" exact component={Details} />
          </Switch>
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
