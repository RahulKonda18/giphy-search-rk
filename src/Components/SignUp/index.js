import { Component } from "react";
import "./index.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import Logo from "../../giphy-search.png";
import { fadeIn } from "react-animations";

import styled, { keyframes } from "styled-components";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ContainerAnimation = styled.form`
  animation: 2s ${keyframes`${fadeIn}`};
`;

class SignUp extends Component {
  state = {
    mail: "",
    password: "",
    showPassword: false,
    errorMsg: "",
    showErrorMsg: "",
  };

  setCookie = (x) => {
    Cookies.set("giphy_search_token", x, {
      expires: 2,
    });
    this.setState({});
  };

  signUp = (e) => {
    const { mail, password } = this.state;
    e.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        console.log(userCredential);
        const x = userCredential.user.accessToken;
        this.setCookie(x);
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errorMsg: error.message, showErrorMsg: true });
      });
  };

  displayErrorMessage = (error) => {
    if (
      error ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return "*Password should consist of atleast 6 characters";
    } else if (error === "Firebase: Error (auth/missing-password).") {
      return "*Please enter Password";
    } else if (error === "Firebase: Error (auth/invalid-email).") {
      return "*Please enter Email correctly";
    } else if (error === "Firebase: Error (auth/email-already-in-use).") {
      return "*Email is already taken";
    }
  };

  onShowPassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  };

  onChangeMail = (event) => {
    this.setState({ mail: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { mail, password, showPassword, errorMsg, showErrorMsg } = this.state;

    if (Cookies.get("giphy_search_token") !== undefined) {
      return <Navigate to="/home" />;
    }
    return (
      <div className="login-background-container">
        <div className="login-container">
          <img className="logo" alt="logo" src={Logo} />
          <ContainerAnimation onSubmit={this.signUp} className="login-form">
            <label htmlFor="mail">Enter Your Mail</label>
            <input
              className="mail-input"
              type="email"
              id="mail"
              onChange={this.onChangeMail}
              value={mail}
              placeholder="Enter you Email"
            />
            <label htmlFor="password">Enter Your Password</label>
            <div className="password-container">
              <input
                className="password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Enter you Password"
              />
              <div className="visibility" onClick={this.onShowPassword}>
                {showPassword ? (
                  <BsEyeFill size={30} color="#121b31" />
                ) : (
                  <BsEyeSlashFill size={30} color="#121b31" />
                )}
              </div>
            </div>
            {showErrorMsg && (
              <p className="error-message">
                {this.displayErrorMessage(errorMsg)}
              </p>
            )}
            <div className="center-align">
              <button className="sign-in-button" type="submit">
                Sign Up
              </button>
            </div>
          </ContainerAnimation>
        </div>
      </div>
    );
  }
}

export default SignUp;
