import { observer } from "mobx-react-lite";
import React, { FC, } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { basketStore } from "../../App";

const CartComponent: FC = observer(() => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-sm">
        <>
          <h2 className="text-center">Basket</h2>
          {basketStore.items.length ? (
            <section className="pt-4 pb-3">
              <div className="container">
                <div className="row w-100">
                  <div className="col-sm-12 col-sm-12 col-12">
                    <table
                      id="shoppingCart"
                      className="table table-condensed table-responsive align-middle text-center"
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "20%" }}></th>
                          <th style={{ width: "20%" }}>Title</th>
                          <th style={{ width: "20%" }}>Price</th>
                          <th style={{ width: "20%" }}>Quantity</th>
                          <th style={{ width: "20%" }}></th>
                        </tr>
                      </thead>
                      {basketStore.items &&
                        basketStore.items.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td data-th="">
                                <div className="text-right">
                                  <img
                                    src={item.product.pictureUrl}
                                    alt={item.product.title}
                                    className="img-fluid rounded"
                                  />
                                </div>
                              </td>
                              <td data-th="Title">
                                <div>{item.product.title}</div>
                              </td>
                              <td data-th="Price">
                                <div>{item.price * item.count} uah</div>
                              </td>

                              <td data-th="Quantity">
                                <div className="d-flex justify-content-center">
                                  <div
                                    className="me-1"
                                    onClick={() =>
                                      basketStore.decreaseItemCount(item.product.id)
                                    }
                                  >
                                    -
                                  </div>
                                  <div>{item.count}</div>
                                  <div
                                    className="ms-1"
                                    onClick={() =>
                                      basketStore.increaseItemCount(item.product.id)
                                    }
                                  >
                                    +
                                  </div>
                                </div>
                              </td>
                              <td className="actions" data-th="">
                                <div>
                                  <img
                                    width={20}
                                    height={20}
                                    src="https://img.icons8.com/ios-glyphs/512/trash.png"
                                    alt="delete"
                                    onClick={() =>
                                      basketStore.deleteItem(item.product.id)
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                  <div className="d-flex justify-content-end">
                    <h4>Total: {basketStore.totalSum} uah</h4>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back to shop
                  </Button>
                </div>
              </div>
            </section>
          ) : (
            <div className="text-center">Basket is empty</div>
          )}
        </>
        {/* )} */}
      </div>
    </>
  )
});

export default CartComponent;
