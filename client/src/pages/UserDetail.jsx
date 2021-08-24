import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useParams, useRouteMatch, Route, NavLink } from "react-router-dom";
import EditForm from "../components/editForm";
import ProfileUser from "../components/ProfileUser";
import { fetchDetailUser } from "../stores/actions/actionUsers";

export default function UserDetail() {
  const _id = localStorage.getItem('_id')
  const dispatch = useDispatch();
  const detailUser = useSelector((state) => state.users.detailUser);
  useEffect(() => {
    dispatch(fetchDetailUser(_id));
  }, []);

  console.log(detailUser,'detailUser')
  console.log(_id)
  let { path, url } = useRouteMatch();
  return (
    <div className="containers mx-40 my-20 h-screen">
      <div className="grid grid-cols-4 bg-white gap-2 justify-center h-3/4 p-4 rounded-xl">
        <div className="col-span-1 shadow-xl px-10">
          <div className="flex w-full mt-10 relative">
            <img
              src={detailUser.display_picture}
              className="m-auto rounded"
              alt=""
            />
          </div>
          <ul>
            <li>
              <NavLink to={`${url}/profile-user`}>
                Profile User
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/edit-user`}>
                Edit User
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/edit-image`}>
                Edit Profile Picture
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-span-3 shadow-xl p-4 space-y-2">
          <Switch>
            <Route exact path={path}>
              <ProfileUser detailUser={detailUser}/>
            </Route>
            <Route exact path={`${path}/profile-user`}>
              <ProfileUser detailUser={detailUser}/>
            </Route>
            <Route exact path={`${path}/edit-user`}>
              <EditForm detailUser={detailUser}/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
