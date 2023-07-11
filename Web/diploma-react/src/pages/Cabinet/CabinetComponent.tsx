import React from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "../../App";
import UpdateUserModalWindowComponent from "../../components/ModalWindow/UpdateUser/UpdateUserModalWindowComponent";
import ChangeUserPasswordModalWindowComponent from "../../components/ModalWindow/ChangeUserPassword/ChangeUserPasswordModalWindow";

const CabinetComponent = () => {
  if (userStore.isAuthenticated) {
    return (
      <>
        <div className="container text-center">
          <h1>User Profile</h1>
          <div className="row">
            <div className="row justify-content-md-center">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userStore.user.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Surname</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userStore.user.lastName}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userStore.user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mobile</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userStore.user.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UpdateUserModalWindowComponent />
          <ChangeUserPasswordModalWindowComponent />
        </div>
      </>
    );
  }

  return <Navigate to="/login" />;
};

export default CabinetComponent;
