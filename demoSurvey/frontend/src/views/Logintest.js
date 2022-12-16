// import React from 'react';

// const Login = () => {
// 	return <div>Login page.... new</div>;
// };

// export default Login;

import { useSkin } from "@hooks/useSkin";
import { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import { toast } from "react-toastify";
import { ChevronRight } from "react-feather";
import LoginBg from "../assets/loginBackground.png";
import PathBg from "../assets/pathLogo.png";

import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormFeedback,
  Form,
  Label,
  Input,
  Button,
  Card,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "../redux/actions";
import * as types from "../redux/constants/actionTypes";
import axios from "axios";
import { useDispatch } from "react-redux";
import Avatar from "@components/avatar";
import Spinner from "../@core/components/spinner/Fallback-spinner";
import {
  ErrorToast,
  SuccessToast,
} from "../container/components/ToastComponent";
import { ROUTE_FORGOT_PASSWORD, ROUTE_OVERVIEW } from "../router/routes";
import axiosInstance from "../container/utils/axiosInstance";
import { SIGN_IN_API_PATH } from "../ApiRoutes/ApiRoutes";

const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid e-mail.")
    .required("Please enter e-mail"),

  password: yup
    .string()
    .matches(/^\S*$/, "Whitespace is not allowed")
    .test(
      "len",
      "Password must be  minimum 8 character.",
      (val) => val.length >= 8
    )
    .required("Please enter password."),
});

const LoginCover = () => {
  const { skin } = useSkin();
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    loading: false,
  });

  const defaultValues = {
    password: "",
    email: "",
  };

  const {
    reset,
    control,
    setError,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return !!errors[field] ? field : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const submitForm = (data) => {
    setState({ ...state, loading: true });

    axiosInstance.post(SIGN_IN_API_PATH, data).then((response) => {
      if (response.data.success === 1) {
        localStorage.setItem("accessTokenNew", response.data.token);
        localStorage.setItem(
          "savedGridLayout",
          response.data.data && response.data.data.layoutDetail
        );

        toast.success(<SuccessToast message={response.data.message} />);

        console.log("sign in api data", response.data.data);

        dispatch({
          type: types.CURRENT_USER,
          data: response.data.data,
        });

        history.push(ROUTE_OVERVIEW);

        // let dispatchData = {
        // 	isLoggedIn: true,
        // };

        // dispatch({
        // 	type: types.SIGN_IN,
        // 	data: dispatchData,
        // });

        setState({ ...state, loading: false });
      } else {
        localStorage.clear();
        toast.error(<ErrorToast message={response.data.message} />);
        setState({ ...state, loading: false });
      }
    });
  };

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <div style={{ background: "#F1EFE7" }}>
      <div
        style={{
          backgroundImage: "url(" + PathBg + ")",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="auth-wrapper auth-cover">
          <Row className="auth-inner m-0">
            {/* <Link
					className="brand-logo"
					to="/"
					onClick={(e) => e.preventDefault()}
				>
					<svg viewBox="0 0 139 95" version="1.1" height="28">
						<defs>
							<linearGradient
								x1="100%"
								y1="10.5120544%"
								x2="50%"
								y2="89.4879456%"
								id="linearGradient-1"
							>
								<stop
									stopColor="#000000"
									offset="0%"
								></stop>
								<stop
									stopColor="#FFFFFF"
									offset="100%"
								></stop>
							</linearGradient>
							<linearGradient
								x1="64.0437835%"
								y1="46.3276743%"
								x2="37.373316%"
								y2="100%"
								id="linearGradient-2"
							>
								<stop
									stopColor="#EEEEEE"
									stopOpacity="0"
									offset="0%"
								></stop>
								<stop
									stopColor="#FFFFFF"
									offset="100%"
								></stop>
							</linearGradient>
						</defs>
						<g
							id="Page-1"
							stroke="none"
							strokeWidth="1"
							fill="none"
							fillRule="evenodd"
						>
							<g
								id="Artboard"
								transform="translate(-400.000000, -178.000000)"
							>
								<g
									id="Group"
									transform="translate(400.000000, 178.000000)"
								>
									<path
										d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
										id="Path"
										className="text-primary"
										style={{
											fill: 'currentColor',
										}}
									></path>
									<path
										d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
										id="Path"
										fill="url(#linearGradient-1)"
										opacity="0.2"
									></path>
									<polygon
										id="Path-2"
										fill="#000000"
										opacity="0.049999997"
										points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
									></polygon>
									<polygon
										id="Path-2"
										fill="#000000"
										opacity="0.099999994"
										points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
									></polygon>
									<polygon
										id="Path-3"
										fill="url(#linearGradient-2)"
										opacity="0.099999994"
										points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
									></polygon>
								</g>
							</g>
						</g>
					</svg>
					<h2 className="brand-text text-primary ms-1">Vuexy</h2>
				</Link> */}

            {/* // illustration */}

            {/* <Col
					className="d-none d-lg-flex align-items-center p-5"
					lg="8"
					sm="12"
				>
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img
							className="img-fluid"
							src={source}
							alt="Login Cover"
						/>
					</div>
				</Col> */}
            <Col
              // className="d-flex align-items-center auth-bg px-2 p-lg-5"
              lg="4"
              sm="12"
            >
              <Card
                body
                style={{
                  marginTop: "50%",
                  padding: "10%",
                  borderRadius: "28px",
                }}
              >
                <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                  <CardTitle tag="h2" className="fw-bold mb-1">
                    Login to your account
                  </CardTitle>
                  {/*  <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
                  <Form
                    className="auth-login-form mt-2"
                    onSubmit={handleSubmit(submitForm)}
                  >
                    <div className="mb-1">
                      {/* <Label
									className="form-label"
									for="login-email"
								>
									Email
								</Label> */}

                      <Controller
                        control={control}
                        id="email"
                        name="email"
                        render={({ field }) => (
                          <Input
                            style={{
                              border: "2px solid #5BBCD0",
                              borderRadius: "31px",
                            }}
                            placeholder="Email"
                            invalid={errors.email && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.email && (
                        <FormFeedback>{errors.email.message}</FormFeedback>
                      )}
                    </div>
                    <div className="mb-1">
                      {/* <div className="d-flex justify-content-between">
									<Label
										className="form-label"
										for="login-password"
									>
										Password
									</Label>
								</div> */}

                      <Controller
                        control={control}
                        id="password"
                        name="password"
                        render={({ field }) => (
                          <Input
                            style={{
                              border: "2px solid #5BBCD0",
                              borderRadius: "31px",
                            }}
                            className="input-group-merge"
                            placeholder="Password"
                            invalid={errors.password && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.password && (
                        <FormFeedback>{errors.password.message}</FormFeedback>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        style={{
                          background: "#4FBDCF 0% 0% no-repeat padding-box",
                          borderRadius: "14px",
                          padding: "10px 80px",
                        }}
                      >
                        Login now <ChevronRight size={24} />
                      </Button>
                      <div className="form-check mb-1">
                        <Input type="checkbox" id="remember-me" />
                        <Label className="form-check-label" for="remember-me">
                          Remember Me
                        </Label>
                        <div>
                          {" "}
                          <Link to={ROUTE_FORGOT_PASSWORD}>
                            <small>Forgot Password?</small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Form>
                  <br></br>
                  <p>
                    By proceeding, you agree to our Terms of Use and confirm you
                    have read our <b>Privacy</b> and <b>Cookie Statement</b>.
                  </p>
                  {/* <p className="text-center mt-2">
							<span className="me-25">
								New on our platform?
							</span>
							<Link to="/register">
								<span>Create an account</span>
							</Link>
						</p> */}

                  {/*
						<div className="divider my-2">
							<div className="divider-text">or</div>
						</div>
						 <div className="auth-footer-btn d-flex justify-content-center">
							<Button color="facebook">
								<Facebook size={14} />
							</Button>
							<Button color="twitter">
								<Twitter size={14} />
							</Button>
							<Button color="google">
								<Mail size={14} />
							</Button>
							<Button className="me-0" color="github">
								<GitHub size={14} />
							</Button>
						</div> */}
                </Col>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default LoginCover;