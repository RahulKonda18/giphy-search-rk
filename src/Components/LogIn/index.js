import { Component } from "react";
import "./index.css";
import { auth } from "../../firebase";
import { fadeIn } from "react-animations";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled, { keyframes } from "styled-components";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import Logo from "../../giphy-search.png";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ContainerAnimation = styled.form`
  animation: 2s ${keyframes`${fadeIn}`};
`;

class LogIn extends Component {
  state = {
    mail: "",
    password: "",
    showPassword: false,
    errorMsg: "",
    showErrorMsg: false,
  };

  setCookie = (x) => {
    Cookies.set("giphy_search_token", x, {
      expires: 2,
    });
    this.setState({});
  };

  onSignIn = (e) => {
    e.preventDefault();
    const { mail, password } = this.state;
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const x = userCredential.user.accessToken;
        this.setCookie(x);
      })

      .catch((error) => {
        console.log(error.code, error);
        this.setState({ errorMsg: error.code.slice(5), showErrorMsg: true });
      });
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
    const { errorMsg, mail, password, showPassword, showErrorMsg } = this.state;
    console.log(Cookies.get("giphy_search_token"));
    const isLoggedIn =
      Cookies.get("giphy_search_token") === undefined ? false : true;
    if (isLoggedIn) {
      return <Navigate to="/home" replace={true} />;
    }
    return (
      <div className="login-background-container">
        <div className="login-container">
          <img className="logo" alt="logo" src={Logo} />
          <ContainerAnimation onSubmit={this.onSignIn} className="login-form">
            <label htmlFor="mail">Enter Your Mail</label>
            <input
              className="mail-input"
              type="mail"
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
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}

            <div className="center-align">
              <button className="sign-in-button" type="submit">
                Sign In
              </button>
            </div>
          </ContainerAnimation>
        </div>
      </div>
    );
  }
}

export default LogIn;
