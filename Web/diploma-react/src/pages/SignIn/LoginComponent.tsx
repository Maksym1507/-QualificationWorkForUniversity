import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../App";
import LoginResponse from "../../models/responses/loginResponse";


export const LoginComponent: FC = observer(() => {
  const [loginResponse, setLoginResponse] = useState<LoginResponse | Error>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginResponse) {
      if ((loginResponse as LoginResponse).user) {
        userStore.user = (loginResponse as LoginResponse).user;

        localStorage.setItem(
          "user",
          JSON.stringify(userStore.user));
        localStorage.setItem(
          "token",
          JSON.stringify((loginResponse as LoginResponse).accessToken)
        );
        alert("You are log in");
        userStore.isAuthenticated = true;
        navigate("/cabinet");
      }
    }
  }, [loginResponse, navigate]);

  function onSubmit(e: any) {
    (async () => {
      try {
        setLoginResponse(await userStore.userLogin(formData.email, formData.password));
      } catch (error: any) {
        alert(`${error.message}. Try again`);
      }

      debugger
    })();
  }

  const handleChangeEmail = (event: any) => {
    setFormData({
      email: event.target.value,
      password: formData.password,
    });
  };

  const handleChangePassword = (event: any) => {
    setFormData({
      email: formData.email,
      password: event.target.value,
    });
  };

  if (true) {
    return (
      <div className="container">
        <div className="row min-vh-100">
          <div className="col d-flex flex-column mt-5 align-items-center">
            <Form
              noValidate
              className="ms-3 mb-3 pt-2 pb-2 rounded border border-dark"
              style={{ width: "24rem" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-center">Login</h2>
              <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label className="d-flex ms-4">
                  Email address
                </Form.Label>
                <Form.Control
                  className="ms-4"
                  style={{ width: "21rem" }}
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email can not be empty",
                    pattern: {
                      value: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  onChange={(e) => handleChangeEmail(e)}
                />
                <div style={{ height: 20 }}>
                  {errors?.email && (
                    <p className="text-danger text-center">
                      {errors?.email?.message?.toString()}
                    </p>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLoginPassword">
                <Form.Label className="d-flex ms-4">
                  Password
                </Form.Label>
                <Form.Control
                  className="ms-4"
                  style={{ width: "21rem" }}
                  type="password"
                  placeholder="Password"
                  autoComplete="on"
                  {...register("password", {
                    required: "Password can not be empty",
                  })}
                  onChange={(e) => handleChangePassword(e)}
                />
                <div style={{ height: 20 }}>
                  {errors?.password && (
                    <p className="text-danger text-center">
                      {errors?.password?.message?.toString()}
                    </p>
                  )}
                </div>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  className="ms-3"
                  style={{ width: "7rem" }}
                  variant="success"
                  type="submit"
                  disabled={!isValid}
                >
                  Sign in
                </Button>
              </div>
              <p className="small fw-bold mt-2 pt-1 mb-0 text-center">
                Don't have an account?{" "}
                <span
                  className="text-info cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </p>
            </Form>
          </div>
        </div>
      </div>
    );
  }
});

export default LoginComponent;
