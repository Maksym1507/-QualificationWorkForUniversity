import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUserRequest from "../../models/requests/registerUserRequest";
import { userStore } from "../../App";
import { Button } from "react-bootstrap";

export const SignUpComponent: FC = observer(() => {
  const [formData, setFormData] = useState({
  } as RegisterUserRequest)

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault()
    await userStore.userRegister(formData);
  }

  function handleChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <h2 className="text-uppercase text-center mb-4">Sign up</h2>

            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-outline">
                <input
                  className="form-control mb-4"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline">
                <input
                  className="form-control mb-4"
                  type="text"
                  placeholder="LastName"
                  name="lastName"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline">
                <input
                  className="form-control mb-4"
                  type="tel"
                  placeholder="Phone number"
                  name="phoneNumber"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="d-flex justify-content-center">
              <Button className="btn-success" type="submit">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SignUpComponent;
