import { Form, Input, Submit } from "components/forms";
import { object, string } from "yup";
import { signin } from "../../services/auth";
import { redirect, useActionData } from "react-router-dom";
import { Link } from "react-router-dom";

const userSchema = object({
  user: string().required(),
  password: string().required(),
}).required();

export function ErrorBoundary() {
  return "error"
}

export function Component() {
  const err = useActionData();
  return <Form schema={userSchema} method="post">
    {err && <h3 className="text-red-500 font-bold text-xs">Username or Password incorrect</h3>}
    <Input label="User Name or Email" name="user" />
    <Input label="Password" name="password" type="password" />
    <Submit>Sign in</Submit>
    <Link to="../signup" className="text-blue-400 mt-4">Sing Up</Link>
  </Form>
}
export async function loader() {
  return null;
}

export async function action({ request }: { request: Request }) {
  try {
    const { user, password } = await request.json()
    const res = await signin(user as string, password as string);
    window.localStorage.setItem("token", res);
    return redirect("/app");
  } catch (err) {
    console.log(err)
    return true
  }
}

