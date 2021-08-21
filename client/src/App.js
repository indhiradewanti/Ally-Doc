import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { Dashboard, Payment } from "./pages";


function App() {
  return (
    <div className="App font-sans text-gray-700 antialiased bg-white">
      <Navbar />
      <Switch>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
