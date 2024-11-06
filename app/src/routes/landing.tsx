import { Link } from "react-router-dom";
export async function loader() {
  return null;
}
export function Component() {
  return <main className="w-full flex">
    <Link to="./app" className="p-4 outline outline-2 hover:outline-blue-400 hover:text-blue-400 hover:bg-white bg-blue-500 outline-blue-500 text-white rounded m-auto">App</Link>
  </main>
}
