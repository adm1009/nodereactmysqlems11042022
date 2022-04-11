import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "../Home.css";
import Axios from "axios";
type props = {
  pancardno: string;
  accountno: string;
  bankname: string;
  show: boolean;
  bank: string;
  username: any;
  banklist: any;
};

class BankDetails extends React.Component<
  props,
  {
    pancardno: string;
    accountno: string;
    bankname: string;
    show: boolean;
    username: any;
    banklist: any;
  }
> {
  constructor(props: props) {
    super(props);

    this.state = {
      pancardno: "",
      accountno: "",
      bankname: "",
      show: false,
      username: this.props.username,
      banklist: [],
    };
    this.submitForm = this.submitForm.bind(this);
  }
  pancardnoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pancardno: e.target.value });
  };
  accountnoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ accountno: e.target.value });
  };
  banknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ bankname: e.target.value });
  };
  componentDidUpdate() {
      Axios.get("http://localhost:3001/personaldetailsgetbankdetails").then(
        (response) => {
          const banklist = response.data;
          this.setState({ banklist });   
    }) 
  };
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/personaldetailsbankdetails", {
      pancardno: this.state.pancardno,
      accountno: this.state.accountno,
      bankname: this.state.bankname,
    }).then((response) => {
      console.log(response);
    });
    this.setState({show:true})
  };

  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/bankdetails" />;
  };
  render() {
    return (
      <>
        <Navbar
          personalData
          leaveData
          employeeData
          username={this.props.username}
        />
        {/* <h4 onClick={this.showDetails} style={{textAlign:"right",textDecoration:"underline"}}>Show Details</h4> */}
        <div style={{ textAlign: "center" }}>
          <span style={{ textDecoration: "underline" }}>Bank Details</span>
          <hr />
          {!this.state.show && (
            <form onSubmit={this.submitForm}>
              <span>Pancard No:- </span>
              <input
                type="text"
                value={this.state.pancardno}
                onChange={this.pancardnoHandler}
                name="pancardno"
                style={{ marginLeft: "40px", marginTop: "10px" }}
                required
              />
              <br />
              <span>Account No:- </span>
              <input
                type="text"
                value={this.state.accountno}
                onChange={this.accountnoHandler}
                name="accountno"
                style={{ marginLeft: "40px", marginTop: "10px" }}
                required
              />
              <br />
              <span>Bank Name:- </span>
              <input
                type="text"
                value={this.state.bankname}
                onChange={this.banknameHandler}
                name="bankname"
                style={{ marginLeft: "40px", marginTop: "10px" }}
                required
              />
              <br />
              <input
                type="submit"
                value="Submit Data"
                style={{
                  backgroundColor: "cornflowerblue",
                  marginTop: "30px",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                }}
              />
            </form>
          )}
          {this.state.show && (
            <span style={{ color: "green" }}>
              Bank Details Added Successfully
            </span>
          )}
          <br />
          {this.state.show && (
            <table id="data" style={{ marginLeft: "450px" }}>
              <thead>
                <tr>
                  <td>
                    <h3>Pancard No</h3>
                  </td>
                  <td>
                    <h3>Account No</h3>
                  </td>
                  <td>
                    <h3>Bank Name</h3>
                  </td>
                  <td>
                    <h3>Edit </h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.banklist.map((value: any) => (
                  <tr key={value.id}>
                    <td>{value.pancardno}</td>
                    <td>{value.accountno}</td>
                    <td>{value.bankname}</td>
                    <td>Edit</td>
                  </tr>
                ))}
                {/* <tr>
                <td>{this.state.pancardno}</td>
                <td>{this.state.accountno}</td>
                <td>{this.state.bankname}</td>
                
              </tr> */}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}
export default BankDetails;
