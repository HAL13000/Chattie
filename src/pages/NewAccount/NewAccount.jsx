import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/Btn/Btn";
import { auth, db } from "../../components/firebase";
import "./NewAccount.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import chattie_white from "../../../src/chattieLogo/png/chattie_white.png";
import { Particle } from "../../components/Effects/Particle";
import Wave from "../../components/Effects/Wave";
// import { Particle } from "../../components/Particle/Particle";

export default function NewAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();

  // Make an account
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          // console.log("RESPONSE FROM USER CREATION", response);
          db.collection("users")
            .add({
              publicId: response.user.uid,
              displayName: response.user.displayName,
              photoURL: response.user.photoURL,
            })
            .then((res) => {
              // console.log("RESPONSE AFTER CREATING USER IN COLLECTION", res);
              gotoHome();
            });
        });
      const user = userCredential.user;
      console.log("User created", user);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  // After you created account
  const gotoHome = () => {
    navigate("/home");
  };

  // Go back to LogIn page
  const goBack = () => {
    navigate("/");
  };

  // Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordConfirmRef = useRef();

  return (
    <div className="newAccount">
      <div className="logo">
        <img src={chattie_white} alt="logo" />
      </div>
      <div className="newAccountWrapper">
        <div className="newAccountContainer">
          <h2>Create Account</h2>
          <div className="newAccountFormContainer">
            <form onSubmit={handleSignUp}>
              <label>
                <p>Email:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <p>Password:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label htmlFor="passwordConfirm">
                <p>Confirm Password:</p>
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="confirm password"
                  ref={passwordConfirmRef}
                  {...register("passwordConfirm", {
                    validate: (value) =>
                      value === confirmPassword || "The passwords do not match",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => <span>{message}</span>}
                />
              </label>
              <Btn
                className="newAccountSignUpBtn"
                text="Sign Up"
                type="submit"
              />
            </form>
            {errorMsg && <p>{errorMsg}</p>}
          </div>
          <div className="backToLogIn">
            <p></p>
            <Btn text="Go Back to Log In" onClick={goBack} />
          </div>
        </div>
        <div className="newAccountWave">
          <Wave />
        </div>
        <div className="newAccountWelcomeBack">
          <div className="welcomeBack">
            <h2>Welcome Back</h2>
            <p>
              Have already an account?
              <br />
              Please login with your personal info.
            </p>
            <Btn text="Go Back to Log In" onClick={goBack} />
          </div>
        </div>
      </div>
      {/* <div className="newAccountEffect"></div> */}
    </div>
  );
}

// export default function NewAccount();
