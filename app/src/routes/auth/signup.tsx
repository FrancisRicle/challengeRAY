import { Form, Input, Submit } from "components/forms";
import { Link, redirect } from "react-router-dom";
import { object, string, ref } from "yup";
import { signup } from "../../services/auth";

const userSchema = object({
  username: string().required().max(30),
  email: string().required(),
  password: string().required().min(5),
  repassword: string().required().oneOf([ref('password')], 'Passwords must match'),
}).required();

export function Component() {
  return <Form schema={userSchema} method="post">
    <Input label="User Name" name="username" />
    <Input label="Email" name="email" />
    <Input label="Password" name="password" type="password" />
    <Input label="Confirm Password" name="repassword" type="password" />
    <Submit>Sign up</Submit>
    <Link to="../signin" className="text-blue-400 mt-4">Sing In</Link>
  </Form>
}
export async function loader() {
  return null;
}

export async function action({ request }: { request: Request }) {
  try {
    const { username, email, password } = await request.json();
    const token = await signup(username, password, email);
    window.localStorage.setItem("token", token);
    return redirect("/app");
  } catch (error) {
    console.log(error);
    return true;

  }
}

