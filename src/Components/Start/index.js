import "./index.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
//import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import Logo from "../../giphy-search.png";
import { Component } from "react";
import Cookies from "js-cookie";

const ContainerAnimation = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const LogoAnimation = styled.img`
  animation: 2s ${keyframes`${fadeIn}`};
`;

class Home extends Component {
  state = {
    logIn: false,
    signIn: false,
  };

  onClickLogin = () => {
    this.setState({ logIn: true });
  };
  onClickSignIn = () => {
    this.setState({ signIn: true });
  };

  render() {
    const { logIn, signIn } = this.state;
    if (Cookies.get("giphy_search_token") !== undefined) {
      return <Navigate to="/home" />;
    }
    return (
      <div className="login-background-container">
        {logIn ? <Navigate to="/login" /> : ""}
        {signIn ? <Navigate to="/signup" /> : ""}
        <div className="login-container">
          <LogoAnimation className="logo" alt="logo" src={Logo} />
          <ContainerAnimation className="container">
            <h2>
              Existing User?
              <br />
              Click Here to{" "}
              <button className="log" type="button" onClick={this.onClickLogin}>
                Log In
              </button>
            </h2>
            <h2>
              New User? <br />
              Click here to
              <button
                onClick={this.onClickSignIn}
                className="log"
                type="button"
              >
                Sign Up
              </button>
            </h2>
          </ContainerAnimation>
        </div>
      </div>
    );
  }
}
export default Home;
