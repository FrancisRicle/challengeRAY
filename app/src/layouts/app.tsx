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
const SignOut = ({ onClick }: { onClick: any }) => {
  const styles = [
    "inline-block",
    "shrink-0",
    "rounded-md",
    "border",
    "border-blue-600",
    "bg-blue-600",
    "px-12",
    "py-3",
    "text-sm",
    "font-medium",
    "text-white",
    "transition",
    "hover:bg-transparent",
    "hover:text-blue-600",
    "focus:outline-none",
    "focus:ring",
    "active:text-blue-500",
  ].reduce((prev: string, curr: string) => prev.concat(' ', curr))
  return <Button onClick={onClick} className={`${styles}`}>Sign Out</Button>
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
    <SignOut onClick={onClick} />
    <Outlet />
  </div>
}
