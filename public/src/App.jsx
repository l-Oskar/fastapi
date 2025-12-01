import { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import PostsForm from "./components/PostsForm";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {}, [isAuth]);

  return (
    <>
      <div className="container">
        {isAuth ? (
          <PostsForm user={user} />
        ) : (
          <>
            <div className="form">
              <RegisterForm setIsAuth={setIsAuth} setUser={setUser} />
              <LoginForm setIsAuth={setIsAuth} setUser={setUser} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
