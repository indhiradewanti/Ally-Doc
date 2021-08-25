import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ProtectedRouteUser({ component: Component, ...rest }) {
	const isLogged = useSelector((state) => state.doctorUser.isLogin);
	console.log(isLogged, "isLogged");
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isLogged === "user") {
					return <Component {...props} />;
				} else if (isLogged === "doctor") {
					Swal.fire({
						icon: "error",
						title: "Forbidden",
						text: "You are not allowed to access this route",
					});
				} else return <Redirect to="/sign-in" />;
			}}
		/>
	);
}

export default ProtectedRouteUser;
