import { useEffect, useState } from "react";
import AuthComponent from "./components/AuthComponent";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {}, [isAuth, data]);

  return (
    <>
      <div className="container">
        {isAuth ? <h1>Welcome</h1> : <AuthComponent />}
      </div>
    </>
  );
}

export default App;
