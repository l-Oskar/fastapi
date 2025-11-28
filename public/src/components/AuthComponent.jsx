import axios from "axios";
import { useState } from "react";

function AuthComponent({ isAuth, handleAuth }) {
  const [loginForm, setLoginForm] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://127.0.0.1:8000/users/");
    if (response.data.find((user) => user.name === loginForm)) {
      console.log("Ok");
    } else {
      console.log("Not found");
    }
  };

  return (
    <>
      <div className="forms">
        <div className="register_form">
          <h2>Register</h2>
          <form action="" className="form">
            <label htmlFor="registerName">Name:</label>
            <input type="text" />
            <label htmlFor="registerAge">Age:</label>
            <input type="text" />
            <button onClick={handleAuth}>Register</button>
          </form>
        </div>
        <div className="login_form">
          <h2>Login</h2>
          <form action="" className="form">
            <label htmlFor="loginName">Name:</label>
            <input
              type="text"
              value={loginForm}
              onChange={(e) => setLoginForm(e.target.value)}
            />
            <button onClick={handleLogin}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthComponent;
