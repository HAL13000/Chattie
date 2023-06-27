import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import chattie_white from "../../chattieLogo/png/chattie_white.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Btn from "../../components/Btn/Btn";
import firebase from "firebase/compat/app";
import { auth } from "../../components/firebase";
import { Mode } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Particle } from "../../components/Effects/Particle";

interface Loginform {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [userId, setUserId] = useState(null);

  // Action after Login Buttonto,  login their own account signInwWIthEmailAndPassword
  const onSubmit = (data: Loginform) => {
    try {
      const userCredential = signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      loginSuccess();
    } catch (error) {
      loginErrorMsg();
    }
    reset();
  };

  // Succeeded Login
  const loginSuccess = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      console.log(userId + "log in success!");
      navigate(`/home`);
      // navigate(`/chatroom/${userId}`);
    }
  };

  // Return an unsubscribe function that we can call when the component unmounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fail to Login
  const loginErrorMsg = () => {
    setErrorMsg("Please enter your password and userID again.");
  };
  // Clear form
  const clearForm = () => {
    reset();
  };
  //   Google login btn  , to login their own account need GoogleAuthProvider
  // function loginWithGoogle() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   auth.signInWithPopup(provider);
  //   loginSuccess();
  // }

  //   New account btn
  const handleCreateNewAccount = () => {
    navigate("/new_account");
  };

  const handleDemo = () => {
    console.log("hellooo");
    navigate("/demo");
  };

  return (
    <div className="login">
      <div className="loginFormContainer">
        <div className="logo">
          <img src={chattie_white} alt="Logo" />
          <p>Welcome to Chattie</p>
        </div>
        <form id="mysuperform" onSubmit={handleSubmit(onSubmit)}>
          <h3>Log In</h3>
          <div className="uiForm">
            <p className="errorMsg">{errorMsg}</p>
            <div className="loginFormField">
              <label htmlFor="userEmail">Email</label>
              <input
                id="mailAdress"
                type="email"
                placeholder="Your email adress"
                {...register("email", {
                  required: "Put your email",
                  // maxLength: {
                  // value: 100,
                  // message: "Put your email.",
                  // },
                  // pattern: {
                  //   value: /^[A-Za-z0-9-@]+$/i,
                  //   message: "Please try again",
                  // },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <span>{message}</span>}
              />
            </div>
            <div className="loginFormField">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="password"
                {...register("password", {
                  required: "Put your password",
                  maxLength: {
                    value: 20,
                    message: "20 letters maximum.",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9-]+$/i,
                    message: "password must be A-Z, a-z, 0-9",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <span>{message}</span>}
              />
            </div>

            <div className="logInBtn">
              <Btn
                text="LogIn"
                type="submit"
                className="submitBtn"
                for="mysuperform"
              />
              {/* <Btn
              text="Clear"
              type="button"
              className="clearBtn"
              onClick={clearForm}
            /> */}
            </div>
            {/* <div className="loginWithGoogle">
            <p>Log in with </p>
            <Btn
              className="loginWithGoogle"
              text="Google Acount"
              onClick={loginWithGoogle}
            />
          </div> */}
            <div className="loginNewAccount">
              <p></p>
              <Btn
                className="Sign Up"
                text="New Account"
                onClick={handleCreateNewAccount}
              />
            </div>
          </div>
        </form>
      </div>
      <footer className="loginFooter">
        <p className="footer_copyright">&copy; Chattie All Rights Reserved.</p>
      </footer>
      <div className="loginParticle">
        <Particle />
      </div>
    </div>
  );
}
