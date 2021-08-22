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
	VideoCall,
} from "./pages";

function App() {
	return (
		<div className="App font-sans text-gray-700 antialiased bg-white">
			<Navbar />
			<Switch>
				<Route path="/payment">
					<Payment />
				</Route>
				<Route path="/doctors">
					<DoctorsList />
				</Route>
				<Route path="/doctor/:id">
					<DoctorDetail />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/user-profile">
					<UserDetail />
				</Route>
				<Route path="/video">
					<VideoCall />
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
