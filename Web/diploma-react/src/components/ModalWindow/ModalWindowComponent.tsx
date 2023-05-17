import { useEffect, useState } from "react";
import { Button, Modal, Nav, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserTokenModel from "../../models/userTokenModel";
import { userStore } from "../../App";
import { useForm } from "react-hook-form";
import LoginUserRequest from "../../models/requests/loginUserRequest";
import RegisterUserRequest from "../../models/requests/registerUserRequest";
import ErrorResponse from "../../models/responses/errorResponse";
import SignUpResponse from "../../models/responses/signUpResponse";

const ModalWindowComponent = () => {
  const {
    register: registerLoginWindow,
    formState: { errors: errorsForLoginWindow, isValid: isValidForLoginWindow },
    handleSubmit: handleSubmitLoginWindow,
    reset: resetLoginWindow,
  } = useForm({ mode: "onBlur" });

  const {
    register: registerSignUpWindow,
    formState: { errors: errorsForSignUpWindow, isValid: isValidForSignUpWindow },
    handleSubmit: handleSubmitSignUpWindow,
    reset: resetSignUpWindow,
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const [signUpResponse, setSignUpResponse] = useState<SignUpResponse | ErrorResponse>();
  const [loginResponse, setLoginResponse] = useState<UserTokenModel | Error>();
  const [showLoginModalWindow, setShowLoginModalWindow] = useState(false);
  const [showSignUpModalWindow, setShowSignUpModalWindow] = useState(false);
  const [currentModalWindow, setCurrentModalWindow] = useState<any>(null);
  const [loginformData, setLoginformData] = useState<LoginUserRequest>({} as LoginUserRequest);
  const [signUpformData, setSignUpformData] = useState({
  } as RegisterUserRequest)

  useEffect(() => {
    if (signUpResponse) {
      if ((signUpResponse as SignUpResponse).succesedMessage) {
        alert(`${(signUpResponse as SignUpResponse).succesedMessage}`);
        setShowSignUpModalWindow(false);
        navigate("/login");
      }
    }
  }, [signUpResponse]);

  useEffect(() => {
    if (loginResponse) {
      if ((loginResponse as UserTokenModel).user) {
        userStore.user = (loginResponse as UserTokenModel).user;
        localStorage.setItem("user", JSON.stringify(userStore.user));
        userStore.isAutificated = true;
        navigate("/cabinet");
      }
    }
  }, [loginResponse, navigate]);

  const handleCloseLoginModalWindow = () => {
    setShowLoginModalWindow(false);
    setCurrentModalWindow(null);
    resetLoginWindow();
  };

  const handleCloseSignUpModalWindow = () => {
    setShowSignUpModalWindow(false);
    setCurrentModalWindow(null);
    resetSignUpWindow();
  };

  const handleOpenLoginModalWindow = () => {
    setShowLoginModalWindow(true);
    setCurrentModalWindow("loginModalWindow");
  };

  const handleOpenSignUpModalWindow = () => {
    setShowSignUpModalWindow(true);
    setCurrentModalWindow("signUpModalWindow");
  };

  const handleLinkClick = (e: any) => {
    e.preventDefault();
    if (currentModalWindow === "loginModalWindow") {
      handleCloseLoginModalWindow();
      handleOpenSignUpModalWindow();
    } else if (currentModalWindow === "signUpModalWindow") {
      handleCloseSignUpModalWindow();
      handleOpenLoginModalWindow();
    }
  };

  function handleChangeLoginFormData(e: any) {
    setLoginformData({ ...loginformData, [e.target.name]: e.target.value })
  }

  async function onSubmitForLoginModalWindow() {
    try {
      setLoginResponse(await userStore.userLogin(loginformData.email, loginformData.password));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  function handleChangeSignUpFormData(e: any) {
    setSignUpformData({ ...signUpformData, [e.target.name]: e.target.value })
  }

  async function onSubmitForSignUpModalWindow() {
    try {
      debugger;
      setSignUpResponse(await userStore.userRegister(signUpformData));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  return (
    <>
      <Nav.Link
        className="text-white me-3"
        onClick={handleOpenLoginModalWindow}
      >
        Login
      </Nav.Link>

      <Modal show={showLoginModalWindow} onHide={handleCloseLoginModalWindow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="ms-3 pb-2 me-3"
            onSubmit={handleSubmitLoginWindow(onSubmitForLoginModalWindow)}
          >
            <Form.Group className="" controlId="formLoginEmail">
              <Form.Label className="d-flex">
                Email address
              </Form.Label>
              <Form.Control
                className=""
                type="email"
                placeholder="Enter email"
                {...registerLoginWindow("email", {
                  required: "Email can not be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                    message: "Invalid email format",
                  },
                })}
                onChange={(e: any) => handleChangeLoginFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForLoginWindow?.email && (
                  <p className="text-danger text-center">
                    {errorsForLoginWindow?.email?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formLoginPassword">
              <Form.Label className="d-flex">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="on"
                {...registerLoginWindow("password", {
                  required: "Password can not be empty",
                })}
                onChange={(e: any) => handleChangeLoginFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForLoginWindow?.password && (
                  <p className="text-danger text-center">
                    {errorsForLoginWindow?.password?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>
            <div className="text-center">
              <Button
                className="ms-3 mt-2 center-block btn-success"
                style={{ width: "7rem" }}
                variant="primary"
                type="submit"
                disabled={!isValidForLoginWindow}
              >
                Sign in
              </Button>
            </div>

            <p className="mt-2 pt-1 mb-0 text-center text-muted">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={handleLinkClick}
              >
                Sign up
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showSignUpModalWindow} onHide={handleCloseSignUpModalWindow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="ms-3 pb-2 me-3"
            onSubmit={handleSubmitSignUpWindow(onSubmitForSignUpModalWindow)}
          >
            <Form.Group controlId="formSignUpEmail">
              <Form.Label className="d-flex">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...registerSignUpWindow("name", {
                  required: "Name can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeSignUpFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForSignUpWindow?.name && (
                  <p className="text-danger text-center">
                    {errorsForSignUpWindow?.name?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="formSignUpEmail">
              <Form.Label className="d-flex">
                Last name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                {...registerSignUpWindow("lastName", {
                  required: "Last name can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeSignUpFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForSignUpWindow?.lastName && (
                  <p className="text-danger text-center">
                    {errorsForSignUpWindow?.lastName?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="formSignUpEmail">
              <Form.Label className="d-flex">
                Phone number
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                {...registerSignUpWindow("phoneNumber", {
                  required: "Phone number can not be empty",
                  pattern: {
                    value: /^(\+380)([0-9]{9})$/,
                    message: "Invalid phone format",
                  },
                })}
                onChange={(e: any) => handleChangeSignUpFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForSignUpWindow?.phoneNumber && (
                  <p className="text-danger text-center">
                    {errorsForSignUpWindow?.phoneNumber?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formSignUpEmail">
              <Form.Label className="d-flex">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...registerSignUpWindow("email", {
                  required: "Email can not be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                    message: "Invalid email format",
                  },
                })}
                onChange={(e: any) => handleChangeSignUpFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForSignUpWindow?.email && (
                  <p className="text-danger text-center">
                    {errorsForSignUpWindow?.email?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formSignUpPassword">
              <Form.Label className="d-flex">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="on"
                {...registerSignUpWindow("password", {
                  required: "Password can not be empty",
                })}
                onChange={(e: any) => handleChangeSignUpFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForSignUpWindow?.password && (
                  <p className="text-danger text-center">
                    {errorsForSignUpWindow?.password?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formSignUpPassword">
              <Form.Label className="d-flex">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                autoComplete="on"
                {...registerSignUpWindow("confirmPassword", {
                  required: "Password can not be empty",
                })}
                onChange={(e: any) => handleChangeSignUpFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForSignUpWindow?.confirmPassword && (
                  <p className="text-danger text-center">
                    {errorsForSignUpWindow?.confirmPassword?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <div className="text-center">
              <Button
                className="ms-3 mt-2 center-block btn-success"
                style={{ width: "7rem" }}
                variant="primary"
                type="submit"
                disabled={!isValidForSignUpWindow}
              >
                Sign up
              </Button>
            </div>
            <p className="text-center text-muted mt-3 mb-0">
              Have already an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={handleLinkClick}
              >
                Sign in here
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalWindowComponent;