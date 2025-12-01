import { useState } from "react";
import axios from "axios";

const RegisterForm = ({ setIsAuth, setUser }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerAge, setRegeisterAge] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(registerName, registerAge);
    const response = await axios.post("http://127.0.0.1:8000/users/", {
      name: registerName,
      age: Number(registerAge),
    });

    if (response.status == 200) {
      console.log("Register Ok");
      setIsAuth(true);
      setUser(response.data.find((user) => user.name == registerName));
    }
  };

  return (
    <div className="forms">
      <div className="register_form">
        <h2>Register</h2>
        <form action="" className="form">
          <label htmlFor="registerName">Name:</label>
          <input
            value={registerName}
            onChange={(e) => {
              setRegisterName(e.target.value);
            }}
            type="text"
          />
          <label htmlFor="registerAge">Age:</label>
          <input
            value={registerAge}
            onChange={(e) => {
              setRegeisterAge(e.target.value);
            }}
            type="text"
          />
          <button onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
