import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ChangeUserPasswordRequest from "../../../models/requests/changeUserPasswordRequest";
import ChangeUserPasswordResponse from "../../../models/responses/changeUserPasswordResponse";
import { userStore } from "../../../App";
import { Button, Form, Modal } from "react-bootstrap";

const ChangeUserPasswordModalWindowComponent = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const [changeUserPasswordResponse, setChangeUserPasswordResponse] = useState<ChangeUserPasswordResponse>();
  const [showChangeUserPasswordModalWindow, setShowChangeUserPasswordModalWindow] = useState(false);
  const [changeUserPasswordformData, setChangeUserPasswordformData] = useState({} as ChangeUserPasswordRequest)

  const validateConfirmPassword = (passwordConfirm: string) => {
    if (passwordConfirm === changeUserPasswordformData.newPassword) {
      return true;
    }
    return 'Passwords must match';
  };

  const validateNewPassword = (newPassword: string) => {
    if (newPassword === changeUserPasswordformData.oldPassword) {
      return 'Matches the old password';
    }
    return true;
  };

  useEffect(() => {
    if (changeUserPasswordResponse) {
      if (changeUserPasswordResponse.isChanged) {
        alert(changeUserPasswordResponse.message);
        userStore.userLogout();
        setShowChangeUserPasswordModalWindow(true);
      }
      else {
        alert(changeUserPasswordResponse.message);
      }
    }
  }, [changeUserPasswordResponse]);

  const handleOpenChangeUserPasswordModalWindow = () => {
    setShowChangeUserPasswordModalWindow(true);
  };

  const handleCloseChangeUserPasswordModalWindow = () => {
    setShowChangeUserPasswordModalWindow(false);
    reset();
  };

  function handleChangeUserPasswordFormData(e: any) {
    setChangeUserPasswordformData({ ...changeUserPasswordformData, [e.target.name]: e.target.value })
  }

  async function onSubmitForChangeUserPasswordModalWindow() {
    try {
      setChangeUserPasswordResponse(await userStore.changeUserPassword(userStore.user.id, changeUserPasswordformData));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  return (<>
    <Button
      className="btn-success"
      onClick={handleOpenChangeUserPasswordModalWindow}
    >
      Change password
    </Button>

    <Modal show={showChangeUserPasswordModalWindow} onHide={handleCloseChangeUserPasswordModalWindow} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          className="ms-3 pb-2 me-3"
          onSubmit={handleSubmit(onSubmitForChangeUserPasswordModalWindow)}
        >
          <Form.Group className="" controlId="formSignUpPassword">
            <Form.Label className="d-flex">
              Old password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Old password"
              autoComplete="on"
              {...register("oldPassword", {
                required: "Password can not be empty",
              })}
              onChange={(e: any) => handleChangeUserPasswordFormData(e)}
            />
            <div style={{ height: 20 }}>
              {errors?.oldPassword && (
                <p className="text-danger text-center">
                  {errors?.oldPassword?.message?.toString()}
                </p>
              )}
            </div>
          </Form.Group>
          <Form.Group className="" controlId="formSignUpPassword">
            <Form.Label className="d-flex">
              New password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="New password"
              autoComplete="on"
              {...register("newPassword", {
                required: "Password can not be empty",
                validate: validateNewPassword
              })}
              onChange={(e: any) => handleChangeUserPasswordFormData(e)}
            />
            <div style={{ height: 20 }}>
              {errors?.newPassword && (
                <p className="text-danger text-center">
                  {errors?.newPassword?.message?.toString()}
                </p>
              )}
            </div>
          </Form.Group>

          <Form.Group className="" controlId="formSignUpPassword">
            <Form.Label className="d-flex">
              Confirm password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              autoComplete="on"
              {...register("passwordConfirm", {
                required: "Password can not be empty",
                validate: validateConfirmPassword
              })}
              onChange={(e: any) => handleChangeUserPasswordFormData(e)}
            />
            <div style={{ height: 20 }}>
              {errors?.passwordConfirm && (
                <p className="text-danger text-center">
                  {errors?.passwordConfirm?.message?.toString()}
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
              Confirm
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  </>);


}

export default ChangeUserPasswordModalWindowComponent;