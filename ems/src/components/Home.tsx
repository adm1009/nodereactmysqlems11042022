import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Auth from "./Auth";
import "./Home.css";
import Axios from "axios";
type props = {
  username: any;
  password: string;
  usernameReg: any;
  passwordReg: string;
  show: boolean;
  showError: boolean;
  register: boolean;
  login: boolean;
  loginstatus: string;
};
class Home extends React.Component<
  props,
  {
    username: any;
    usernameReg: any;
    passwordReg: string;
    password: string;
    show: boolean;
    showError: boolean;
    register: boolean;
    login: boolean;
    loginstatus: string;
  }
> {
  constructor(props: props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameReg: "",
      passwordReg: "",
      show: false,
      showError: false,
      register: false,
      login: true,
      loginstatus: "",
    };
  }
  count = 0;
  submitForm = (e: any) => {
    e.preventDefault();
   Axios.post("http://localhost:3001/login", {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response.data.message) {
        this.setState({
          showError: true,
          username: "",
          password: "",
          loginstatus: response.data.message,
        });
      } else {
        Auth.authenticate();
        this.setState({ show: true });
        this.props.username(this.state.username);
      }
    });
  };
  registerHandler = () => {
    this.setState({ register: true, login: false });
  };
  registerDataHandler = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
    }).then((response) => {
      console.log(response);
    });
    this.setState({
      register: false,
      login: true,
      usernameReg: "",
      passwordReg: "",
    });
  };
  render() {
    return (
      <div>
        {!this.state.show && (
          <h3
            style={{
              backgroundColor: "cornflowerblue",
              color: "white",
              textAlign: "center",
            }}
          >
            Welcome to Infogen Labs Pvt.Ltd
          </h3>
        )}
        {this.state.show && (
          <Navbar
            personalData
            leaveData
            employeeData
            username={this.state.username}
          />
        )}
        {!this.state.register && !this.state.show && (
          <h4 className="reg" onClick={this.registerHandler}>
            Register
          </h4>
        )}
        {this.state.register && !this.state.login && (
          <div>
            <h3 style={{ marginLeft: "570px", textDecoration: "underline" }}>
              Enter Details
            </h3>
            <form onSubmit={this.registerDataHandler}>
              <section>
                <label style={{ marginLeft: "500px" }}>Username:-</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="usernameReg"
                  style={{ marginLeft: "18px" }}
                  value={this.state.usernameReg}
                  onChange={(e) =>
                    this.setState({ usernameReg: e.target.value })
                  }
                  required
                />
              </section>
              <section style={{ marginTop: "5px" }}>
                <label style={{ marginLeft: "500px" }}>Password:-</label>
                <input
                  type="text"
                  placeholder="Enter password"
                  name="passwordReg"
                  style={{ marginLeft: "20px" }}
                  value={this.state.passwordReg}
                  onChange={(e) =>
                    this.setState({ passwordReg: e.target.value })
                  }
                  required
                />
              </section>
              <input
                type="submit"
                value="Register"
                className="loginbutton"
                style={{ marginLeft: "590px" }}
              />
            </form>
          </div>
        )}
        {!this.state.show && this.state.login && (
          <>
            <h4
              style={{
                fontFamily: "sans-serif",
                marginTop: "-18px",
                textAlign: "center",
              }}
            >
              Sign in
            </h4>
            <form
              onSubmit={this.submitForm}
              className={this.state.showError ? "cardError" : "card"}
            >
              <section style={{ marginTop: "10px" }}>
                <span style={{ marginLeft: "30px" }}>User Name:- </span>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  style={{ marginLeft: "10px" }}
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
                <br />
              </section>
              <section style={{ marginTop: "5px" }}>
                <span style={{ marginLeft: "30px" }}>Password:- </span>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  style={{ marginLeft: "20px" }}
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </section>
              <input type="submit" value="Sign in" className="loginbutton" />
              {this.state.showError && (
                <h4
                  style={{
                    color: "red",
                    marginTop: "-1px",
                    marginLeft: "125px",
                  }}
                >
                  {this.state.loginstatus}
                </h4>
              )}
            </form>
          </>
        )}
      </div>
    );
  }
}

export default Home;
