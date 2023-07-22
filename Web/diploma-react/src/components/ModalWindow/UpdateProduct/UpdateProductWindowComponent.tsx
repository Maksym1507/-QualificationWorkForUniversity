import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { catalogStore } from "../../../App";
import { Button, Form, Modal } from "react-bootstrap";
import CreateUpdateProductRequest from "../../../models/requests/createUpdateProductRequest";
import UpdateItemResponse from "../../../models/responses/updateItemResponse";

const UpdateProductModalWindowComponent = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const [updateProductResponse, setUpdateProductResponse] = useState<UpdateItemResponse<boolean>>();
  const [showUpdateProductModalWindow, setShowUpdateProductModalWindow] = useState(false);
  const [updateProductformData, setUpdateProductformData] = useState({
    title: catalogStore.singleCatalogItem.title,
    description: catalogStore.singleCatalogItem.description,
    price: catalogStore.singleCatalogItem.price,
    weight: catalogStore.singleCatalogItem.weight,
    pictureFileName: catalogStore.singleCatalogItem.pictureUrl.slice(15)
  } as CreateUpdateProductRequest)

  useEffect(() => {
    if (updateProductResponse) {
      alert('Product has been updated');
      catalogStore.getSingleCatalogItem(catalogStore.singleCatalogItem.id);
      setShowUpdateProductModalWindow(false);
    }
  }, [updateProductResponse]);

  const handleCloseUpdateProductModalWindow = () => {
    setShowUpdateProductModalWindow(false);
    setUpdateProductformData({
      title: catalogStore.singleCatalogItem.title,
      description: catalogStore.singleCatalogItem.description,
      price: catalogStore.singleCatalogItem.price,
      weight: catalogStore.singleCatalogItem.weight,
      pictureFileName: catalogStore.singleCatalogItem.pictureUrl.slice(15)
    } as CreateUpdateProductRequest);
    reset();
  };

  const handleOpenUpdateProductModalWindow = () => {
    setShowUpdateProductModalWindow(true);
  };

  function handleChangeUpdateProductFormData(e: any) {
    setUpdateProductformData({ ...updateProductformData, [e.target.name]: e.target.value })
  }

  async function onSubmitForUpdateProductModalWindow() {
    try {
      setUpdateProductResponse(await catalogStore.updateCatalogItem(catalogStore.singleCatalogItem.id, updateProductformData));
    } catch (error: any) {
      alert(`${error.message}. Try again`);
    }
  }

  return (
    <>
      <div className="cursor-pointer" onClick={handleOpenUpdateProductModalWindow}>
        <img
          className="mt-1 ms-3"
          width={25}
          height={25}
          src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
          alt="edit"
        />{" "}
      </div>

      <Modal show={showUpdateProductModalWindow} onHide={handleCloseUpdateProductModalWindow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="ms-3 pb-2 me-3"
            onSubmit={handleSubmit(onSubmitForUpdateProductModalWindow)}
          >
            <Form.Group controlId="formCreateProductEmail">
              <Form.Label className="d-flex">
                Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title", {
                  required: "Title can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeUpdateProductFormData(e)}
                defaultValue={updateProductformData.title}
              />
              <div style={{ height: 20 }}>
                {errors?.title && (
                  <p className="text-danger text-center">
                    {errors?.title?.message?.toString()}
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
                {...register("description", {
                  required: "Description can not be empty",
                  minLength: { value: 3, message: "Min 3 symbols" },
                })}
                onChange={(e: any) => handleChangeUpdateProductFormData(e)}
                defaultValue={updateProductformData.description}
              />
              <div style={{ height: 20 }}>
                {errors?.description && (
                  <p className="text-danger text-center">
                    {errors?.description?.message?.toString()}
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
                {...register("price", {
                  required: "Price can not be empty",
                })}
                onChange={(e: any) => handleChangeUpdateProductFormData(e)}
                defaultValue={updateProductformData.price}
              />
              <div style={{ height: 20 }}>
                {errors?.price && (
                  <p className="text-danger text-center">
                    {errors?.price?.message?.toString()}
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
                {...register("weight", {
                  required: "Weight can not be empty"
                })}
                onChange={(e: any) => handleChangeUpdateProductFormData(e)}
                defaultValue={updateProductformData.weight}
              />
              <div style={{ height: 20 }}>
                {errors?.weight && (
                  <p className="text-danger text-center">
                    {errors?.weight?.message?.toString()}
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
                {...register("pictureFileName", {
                  required: "Picture file name can not be empty",
                })}
                onChange={(e: any) => handleChangeUpdateProductFormData(e)}
                defaultValue={updateProductformData.pictureFileName}
              />
              <div style={{ height: 20 }}>
                {errors?.pictureFileName && (
                  <p className="text-danger text-center">
                    {errors?.pictureFileName?.message?.toString()}
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
    </>
  );
}

export default UpdateProductModalWindowComponent;