import axios from "axios";
import { useState } from "react";

function LoginForm({ setIsAuth, setUser }) {
  const [loginForm, setLoginForm] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://127.0.0.1:8000/users/");
    if (response.data.find((user) => user.name === loginForm)) {
      setIsAuth(true);
      setUser(response.data.find((user) => user.name == loginForm));
      console.log("Ok");
    } else {
      console.log("Not found");
    }
  };

  return (
    <>
      <div className="login_form">
        <h2>Login</h2>
        <form action="" className="form">
          <label htmlFor="loginName">Name:</label>
          <input
            type="text"
            value={loginForm}
            onChange={(e) => setLoginForm(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
