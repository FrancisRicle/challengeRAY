import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./layouts/root.tsx";
const routes = createRoutesFromElements(<Route path="/" element={<Layout />}>
  <Route index lazy={() => import("./routes/landing.tsx")} />
  <Route path="app" lazy={() => import("./layouts/app.tsx")}>
    <Route index lazy={() => import("./routes/app/home.tsx")} />
  </Route>
  <Route path="auth" lazy={() => import("./layouts/auth.tsx")}>
    <Route path="signin" lazy={() => import("./routes/auth/signin.tsx")} />
    <Route path="signup" lazy={() => import("./routes/auth/signup.tsx")} />
  </Route>
</Route>)
export default createBrowserRouter(routes)

