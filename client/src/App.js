import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import {
  Dashboard,
  DoctorDetail,
  DoctorsList,
  Payment,
  Login,
  Register,
  UserDetail,
  Chat,
  DoctorPage,
  HistoryDoctor,
} from "./pages";

function App() {
  return (
    <div className="App font-sans bg-white text-gray-700">
      <Navbar />
      <Switch>
        <Route path="/payment/:id">
          <Payment />
        </Route>
        <Route path="/doctors/list">
          <DoctorsList />
        </Route>
        <Route path="/doctors/history">
          <HistoryDoctor />
        </Route>
        <Route path="/doctors/patient">
          <DoctorPage />
        </Route>
        <Route path="/doctors/:id">
          <DoctorDetail />
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/user-profile">
          <UserDetail />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
