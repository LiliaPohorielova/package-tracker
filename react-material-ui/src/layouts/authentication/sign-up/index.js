// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import AuthService from "../../../services/auth.service";
// import isEmail from "validator/es/lib/isEmail";
//
// const required = value => {
//   if (!value) {
//     return (
//         <div className="alert alert-danger" role="alert">
//           This field is required!
//         </div>
//     );
//   }
// };
//
// const email = value => {
//   if (!isEmail(value)) {
//     return (
//         <div className="alert alert-danger" role="alert">
//           This is not a valid email.
//         </div>
//     );
//   }
// };
//
// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//         <div className="alert alert-danger" role="alert">
//           The username must be between 3 and 20 characters.
//         </div>
//     );
//   }
// };
//
// const vpassword = value => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//         <div className="alert alert-danger" role="alert">
//           The password must be between 6 and 40 characters.
//         </div>
//     );
//   }
// };
//
// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       successful: false,
//       message: ""
//     };
//   }
//
//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }
//
//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }
//
//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }
//
//   handleRegister(e) {
//     e.preventDefault();
//
//     this.setState({
//       message: "",
//       successful: false
//     });
//
//     this.form.validateAll();
//
//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//           this.state.username,
//           this.state.email,
//           this.state.password
//       ).then(
//           response => {
//             this.setState({
//               message: response.data.message,
//               successful: true
//             });
//           },
//           error => {
//             const resMessage =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//
//             this.setState({
//               successful: false,
//               message: resMessage
//             });
//           }
//       );
//     }
//   }
//
//   render() {
//     return (
//         <div className="col-md-12">
//           <div className="card card-container">
//             <img
//                 src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//                 alt="profile-img"
//                 className="profile-img-card"
//             />
//
//             <Form
//                 onSubmit={this.handleRegister}
//                 ref={c => {
//                   this.form = c;
//                 }}
//             >
//               {!this.state.successful && (
//                   <div>
//                     <div className="form-group">
//                       <label htmlFor="username">Username</label>
//                       <Input
//                           type="text"
//                           className="form-control"
//                           name="username"
//                           value={this.state.username}
//                           onChange={this.onChangeUsername}
//                           validations={[required, vusername]}
//                       />
//                     </div>
//
//                     <div className="form-group">
//                       <label htmlFor="email">Email</label>
//                       <Input
//                           type="text"
//                           className="form-control"
//                           name="email"
//                           value={this.state.email}
//                           onChange={this.onChangeEmail}
//                           validations={[required, email]}
//                       />
//                     </div>
//
//                     <div className="form-group">
//                       <label htmlFor="password">Password</label>
//                       <Input
//                           type="password"
//                           className="form-control"
//                           name="password"
//                           value={this.state.password}
//                           onChange={this.onChangePassword}
//                           validations={[required, vpassword]}
//                       />
//                     </div>
//
//                     <div className="form-group">
//                       <button className="btn btn-primary btn-block">Sign Up</button>
//                     </div>
//                   </div>
//               )}
//
//               {this.state.message && (
//                   <div className="form-group">
//                     <div
//                         className={
//                           this.state.successful
//                               ? "alert alert-success"
//                               : "alert alert-danger"
//                         }
//                         role="alert"
//                     >
//                       {this.state.message}
//                     </div>
//                   </div>
//               )}
//               <CheckButton
//                   style={{ display: "none" }}
//                   ref={c => {
//                     this.checkBtn = c;
//                   }}
//               />
//             </Form>
//           </div>
//         </div>
//     );
//   }
// }

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Col, Container, Form, Row, Spinner } from "react-bootstrap";

export default function Cover() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isInValid, setIsInValid] = useState(false);
  const formRef = useRef(null);

  const formSchema = Yup.object().shape({
    login: Yup.string()
      .required("Please enter username")
      .matches(/^[a-z]{2,15}$/, "a to z only (2 to 15 long)"),
    email: Yup.string()
      .required("Please enter email")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Not a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[\w-]{3,15}$/, "Letters and digits (3 to 15 long)"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function resetModal() {
    setIsValid(false);
    setIsInValid(false);
    formRef.current.reset();
  }

  function onSubmit(data) {
    console.log(data);
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // };
    // fetch("rest/users/new", requestOptions)
    //   .then(async (response) => {
    //     const data = await response.json();
    //     if (!response.ok) {
    //       const error = (data && data.message) || response.status;
    //       return Promise.reject(error);
    //     } else {
    //       setIsInValid(false);
    //       setIsValid(true);
    //       setMessage("You have successfully registered! Log in using your username and password!");
    //     }
    //   })
    //   .catch((error) => {
    //     setIsInValid(true);
    //     setIsValid(false);
    //     setMessage(error);
    //   });
    // return false;
  }

  if (error) {
    return (
      <Row className="justify-content-center pt-1 pb-1">
        <Alert
          variant={`${isInValid ? "danger" : "primary"}`}
          onClose={resetModal}
          dismissible
          className="mt-5"
          style={{ maxWidth: "600px" }}
        >
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      </Row>
    );
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {/*<Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>*/}
          {/*  <Row>*/}
          {/*    <Col>*/}
          {/*      <Form.Group>*/}
          {/*        <MDBox mb={2}>*/}
          {/*          <MDInput*/}
          {/*            name="login"*/}
          {/*            {...register("login")}*/}
          {/*            type="text"*/}
          {/*            label="Username"*/}
          {/*            variant="standard"*/}
          {/*            fullWidth*/}
          {/*          />*/}
          {/*        </MDBox>*/}
          {/*        <div className="invalid-feedback">{errors.login?.message}</div>*/}
          {/*      </Form.Group>*/}
          {/*    </Col>*/}
          {/*    <Col>*/}
          {/*      <Form.Group>*/}
          {/*        <input*/}
          {/*          name="email"*/}
          {/*          type="email"*/}
          {/*          {...register("email")}*/}
          {/*          placeholder="Enter email"*/}
          {/*          className={`form-control ${errors.email ? "is-invalid" : ""}`}*/}
          {/*        />*/}
          {/*        <div className="invalid-feedback">{errors.email?.message}</div>*/}
          {/*        <Form.Label*/}
          {/*          style={{*/}
          {/*            color: "red",*/}
          {/*            marginRight: "5px",*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          **/}
          {/*        </Form.Label>*/}
          {/*        <Form.Label>Email</Form.Label>*/}
          {/*      </Form.Group>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*  <Row>*/}
          {/*    <Col>*/}
          {/*      <Form.Group>*/}
          {/*        <input*/}
          {/*          name="password"*/}
          {/*          type="password"*/}
          {/*          {...register("password")}*/}
          {/*          placeholder="Enter password"*/}
          {/*          className={`form-control ${errors.password ? "is-invalid" : ""}`}*/}
          {/*        />*/}
          {/*        <div className="invalid-feedback">{errors.password?.message}</div>*/}
          {/*        <Form.Label*/}
          {/*          style={{*/}
          {/*            color: "red",*/}
          {/*            marginRight: "5px",*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          **/}
          {/*        </Form.Label>*/}
          {/*        <Form.Label>Password</Form.Label>*/}
          {/*      </Form.Group>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*  <Row className="mt-4">*/}
          {/*    <MDBox mt={4} mb={1}>*/}
          {/*      <MDButton type="submit" variant="gradient" color="info" fullWidth>*/}
          {/*        Sign Up*/}
          {/*      </MDButton>*/}
          {/*    </MDBox>*/}
          {/*    <MDBox mt={3} mb={1} textAlign="center">*/}
          {/*      <MDTypography variant="button" color="text">*/}
          {/*        Already have an account?{" "}*/}
          {/*        <MDTypography*/}
          {/*          component={Link}*/}
          {/*          to="/authentication/sign-in"*/}
          {/*          variant="button"*/}
          {/*          color="info"*/}
          {/*          fontWeight="medium"*/}
          {/*          textGradient*/}
          {/*        >*/}
          {/*          Sign In*/}
          {/*        </MDTypography>*/}
          {/*      </MDTypography>*/}
          {/*    </MDBox>*/}
          {/*  </Row>*/}
          {/*</Form>*/}
          <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <MDBox mb={2}>
              <MDInput
                name="login"
                {...register("login")}
                type="text"
                label="Username"
                variant="standard"
                fullWidth
              />
              <div className="invalid-feedback">{errors.login?.message}</div>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="email"
                {...register("email")}
                type="email"
                label="Email"
                variant="standard"
                fullWidth
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="password"
                {...register("password")}
                type="password"
                label="Password"
                variant="standard"
                fullWidth
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </Form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}
