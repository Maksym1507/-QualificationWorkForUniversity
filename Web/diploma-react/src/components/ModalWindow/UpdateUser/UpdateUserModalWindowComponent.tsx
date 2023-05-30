import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UpdateUserResponse from "../../../models/responses/updateUserResponse";
import UpdateUserRequest from "../../../models/requests/updateUserRequest";
import { userStore } from "../../../App";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateUserModalWindowComponent = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const [updateUserResponse, setUpdateUserResponse] = useState<UpdateUserResponse<boolean>>();
  const [showUpdateUserModalWindow, setShowUpdateUserModalWindow] = useState(false);
  const [updateUserformData, setUpdateUserformData] = useState({
    email: userStore.user.email,
    name: userStore.user.name,
    lastName: userStore.user.lastName,
    phoneNumber: userStore.user.phoneNumber
  } as UpdateUserRequest)

  useEffect(() => {
    if (updateUserResponse) {
      alert('User info has been updated');
      userStore.userLogout();
      setShowUpdateUserModalWindow(false);
    }
  }, [updateUserResponse]);

  const handleCloseUpdateUserModalWindow = () => {
    setShowUpdateUserModalWindow(false);
    reset();
  };

  const handleOpenUpdateUserModalWindow = () => {
    setShowUpdateUserModalWindow(true);
  };

  function handleChangeUpdateUserFormData(e: any) {
    setUpdateUserformData({ ...updateUserformData, [e.target.name]: e.target.value })
  }

  async function onSubmitForUpdateUserModalWindow() {
    try {
      setUpdateUserResponse(await userStore.updateUser(userStore.user.id, updateUserformData));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  return (
    <>
      <Button
        className="me-3 btn-success"
        onClick={handleOpenUpdateUserModalWindow}
      >
        Update user info
      </Button>

      <Modal show={showUpdateUserModalWindow} onHide={handleCloseUpdateUserModalWindow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update user info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="ms-3 pb-2 me-3"
            onSubmit={handleSubmit(onSubmitForUpdateUserModalWindow)}
          >
            <Form.Group controlId="formSignUpEmail">
              <Form.Label className="d-flex">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name", {
                  required: "Name can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeUpdateUserFormData(e)}
                defaultValue={updateUserformData.name}
              />
              <div style={{ height: 20 }}>
                {errors?.name && (
                  <p className="text-danger text-center">
                    {errors?.name?.message?.toString()}
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
                {...register("lastName", {
                  required: "Last name can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },

                })}
                onChange={(e: any) => handleChangeUpdateUserFormData(e)}
                defaultValue={updateUserformData.lastName}
              />
              <div style={{ height: 20 }}>
                {errors?.lastName && (
                  <p className="text-danger text-center">
                    {errors?.lastName?.message?.toString()}
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
                {...register("phoneNumber", {
                  required: "Phone number can not be empty",
                  pattern: {
                    value: /^(\+380)([0-9]{9})$/,
                    message: "Invalid phone format",
                  },
                })}
                onChange={(e: any) => handleChangeUpdateUserFormData(e)}
                defaultValue={updateUserformData.phoneNumber}
              />
              <div style={{ height: 20 }}>
                {errors?.phoneNumber && (
                  <p className="text-danger text-center">
                    {errors?.phoneNumber?.message?.toString()}
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
                {...register("email", {
                  required: "Email can not be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                    message: "Invalid email format",
                  },
                })}
                onChange={(e: any) => handleChangeUpdateUserFormData(e)}
                defaultValue={updateUserformData.email}
              />
              <div style={{ height: 20 }}>
                {errors?.email && (
                  <p className="text-danger text-center">
                    {errors?.email?.message?.toString()}
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
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateUserModalWindowComponent;