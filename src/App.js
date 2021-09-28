import Movies from "./Pages/Movies";
import Shows from "./Pages/Shows";
import Wishlist from "./Pages/Wishlist";
import Search from "./Pages/Search";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Movies} />
          <Route path="/shows" exact component={Shows} />
          <Route path="/wishlist" exact component={Wishlist} />
          <Route path="/search/:searchterm" exact component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
