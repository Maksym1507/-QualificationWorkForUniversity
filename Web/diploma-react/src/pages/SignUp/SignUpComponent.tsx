import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUserRequest from "../../models/requests/registerUserRequest";
import { userStore } from "../../App";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SignUpResponse from "../../models/responses/signUpResponse";

export const SignUpComponent: FC = observer(() => {
  const [signUpResponse, setSignUpResponse] = useState<SignUpResponse>();
  const [formData, setFormData] = useState({
  } as RegisterUserRequest)

  const {
    register: registerSignUpWindow,
    formState: { errors: errorsForSignUpWindow, isValid },
    handleSubmit: handleSubmitSignUpWindow,
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  useEffect(() => {
    if (signUpResponse) {
      debugger;
      console.log((signUpResponse as SignUpResponse).succesedMessage);
      if ((signUpResponse as SignUpResponse).succesedMessage) {
        alert(`${(signUpResponse as SignUpResponse).succesedMessage}`);
        navigate("/login");
      }
    }
  }, [signUpResponse]);

  function handleChangeSignUpFormData(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onSubmitForSignUp() {
    try {
      debugger;
      setSignUpResponse(await userStore.userRegister(formData));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  return (
    <div>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <h2 className="text-uppercase text-center mb-4">Sign up</h2>
            <Form
              noValidate
              className="ms-3 pb-2 me-3"
              onSubmit={handleSubmitSignUpWindow(onSubmitForSignUp)}
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
                  disabled={!isValid}
                >
                  Sign up
                </Button>
              </div>
              <p className="text-center text-muted mt-3 mb-0">
                Have already an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in here
                </span>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SignUpComponent;
