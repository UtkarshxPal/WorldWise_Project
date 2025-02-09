import { useContext, useEffect } from "react";
import styles from "./User.module.css";
import { AuthContext } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function User() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  // useEffect(
  //   function () {
  //     if (isAuthenticated === false) {
  //
  //     }
  //   },
  //   [isAuthenticated, navigate]
  // );
  const UserName = user?.name
    ? user.name.split(" ")[0].charAt(0).toUpperCase() +
      user.name.split(" ")[0].slice(1).toLowerCase()
    : "Guest"; // Fallback for undefined names

  return (
    <div className={styles.user}>
      {/* <img src={user.avatar} alt={user.name} /> */}
      <span>Welcome, {UserName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
