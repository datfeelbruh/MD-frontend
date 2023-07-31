import Login from "./Login";
import Register from "./Register";

export default function Auth({setToken}) {
  return (
    <div class="flex flex-row justify-end my-auto basis-1/6 pe-2">
      <Login setToken={setToken} />
      <Register />
    </div>
  );
}