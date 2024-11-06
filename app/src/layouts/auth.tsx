import { Outlet, useRouteError } from "react-router-dom";
export function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>
    <Component />
  </div>;
}
export function Component() {
  return <main className="w-full flex flex-col items-center">
    <Outlet />
  </main>
}
