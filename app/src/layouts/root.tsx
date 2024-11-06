import { Outlet, /*useNavigate*/ } from "react-router-dom"

export function Layout() {
  //const navigate = useNavigate();
  return (<div>
    <Outlet />
  </div>)
}
