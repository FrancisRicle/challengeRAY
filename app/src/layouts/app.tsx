import { Navigate, Outlet, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../components/button";
import { signout } from "../services/auth";
export function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>
    <Component />
  </div>;
}
export function Component() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/signin" />
  }
  const nav = useNavigate();
  const onClick = () => {
    signout()
      .then(() => {
        nav("/auth/signin");
      });
  }
  return <div>
    <Button onClick={onClick}>Sign Out</Button>
    <Outlet />
  </div>
}
