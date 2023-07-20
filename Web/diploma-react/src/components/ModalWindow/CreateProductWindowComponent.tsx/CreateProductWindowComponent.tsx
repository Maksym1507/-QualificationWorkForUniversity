import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Nav, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateUpdateProductRequest from "../../../models/requests/createUpdateProductRequest";
import AddItemResponse from "../../../models/responses/addItemresponse";
import { catalogStore } from "../../../App";

const CreateProductWindowComponent = () => {
  const {
    register: registerCreateProductWindow,
    formState: { errors: errorsForCreateProductWindow, isValid: isValidForCreateProductWindow },
    handleSubmit: handleSubmitCreateProductWindow,
    reset: resetCreateProductWindow,
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const [createProductResponse, setCreateProductResponse] = useState<AddItemResponse<number> | null>();
  const [showCreateProductModalWindow, setShowCreateProductModalWindow] = useState(false);
  const [createProductformData, setCreateProductformData] = useState({
  } as CreateUpdateProductRequest)

  useEffect(() => {
    if (createProductResponse as AddItemResponse<number>) {
      if ((createProductResponse as AddItemResponse<number>).id) {
        alert("New product has been added");
        setShowCreateProductModalWindow(false);
        navigate("/product");
      }
    }
  }, [createProductResponse]);

  const handleCloseCreateProductModalWindow = () => {
    setShowCreateProductModalWindow(false);
    resetCreateProductWindow();
  };

  function handleChangeCreateProductFormData(e: any) {
    setCreateProductformData({ ...createProductformData, [e.target.name]: e.target.value })
  }

  async function onSubmitForCreateProductModalWindow() {
    try {
      debugger;
      setCreateProductResponse(await catalogStore.createCatalogItem(createProductformData));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  const handleOpenCreateProductModalWindow = () => {
    setShowCreateProductModalWindow(true);
  };

  return (
    <>
      <Nav.Link
        className="text-white me-3"
        onClick={handleOpenCreateProductModalWindow}
      >
        Create Product
      </Nav.Link>

      <Modal show={showCreateProductModalWindow} onHide={handleCloseCreateProductModalWindow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="ms-3 pb-2 me-3"
            onSubmit={handleSubmitCreateProductWindow(onSubmitForCreateProductModalWindow)}
          >
            <Form.Group controlId="formCreateProductEmail">
              <Form.Label className="d-flex">
                Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...registerCreateProductWindow("title", {
                  required: "Title can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeCreateProductFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForCreateProductWindow?.title && (
                  <p className="text-danger text-center">
                    {errorsForCreateProductWindow?.title?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="formCreateProductEmail">
              <Form.Label className="d-flex">
                Description
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                {...registerCreateProductWindow("description", {
                  required: "Description can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeCreateProductFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForCreateProductWindow?.description && (
                  <p className="text-danger text-center">
                    {errorsForCreateProductWindow?.description?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="formCreateProductEmail">
              <Form.Label className="d-flex">
                Price
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                {...registerCreateProductWindow("price", {
                  required: "Price can not be empty",
                })}
                onChange={(e: any) => handleChangeCreateProductFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForCreateProductWindow?.price && (
                  <p className="text-danger text-center">
                    {errorsForCreateProductWindow?.price?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formCreateProductEmail">
              <Form.Label className="d-flex">
                Weight
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight"
                {...registerCreateProductWindow("weight", {
                  required: "Weight can not be empty"
                })}
                onChange={(e: any) => handleChangeCreateProductFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForCreateProductWindow?.weight && (
                  <p className="text-danger text-center">
                    {errorsForCreateProductWindow?.weight?.message?.toString()}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="" controlId="formCreateProductPassword">
              <Form.Label className="d-flex">
                Picture file name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Picture file name"
                autoComplete="on"
                {...registerCreateProductWindow("pictureFileName", {
                  required: "Picture file name can not be empty",
                })}
                onChange={(e: any) => handleChangeCreateProductFormData(e)}
              />
              <div style={{ height: 20 }}>
                {errorsForCreateProductWindow?.pictureFileName && (
                  <p className="text-danger text-center">
                    {errorsForCreateProductWindow?.pictureFileName?.message?.toString()}
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
                disabled={!isValidForCreateProductWindow}
              >
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateProductWindowComponent;