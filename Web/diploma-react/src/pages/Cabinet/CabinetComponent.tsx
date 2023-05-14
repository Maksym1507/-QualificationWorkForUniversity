import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "../../App";
import CabinetModel from "../../models/CabinetModel";

const CabinetComponent = () => {
  const [userCabinet, setUserCabinet] = useState<CabinetModel>(
    {} as CabinetModel
  );

  useEffect(() => {
    (async () => {
      setUserCabinet(await userStore.getUser(userStore.user.id));
    })();
  }, []);

  if (userStore.isAutificated) {
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
                        <p className="text-muted mb-0">{userCabinet.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Surname</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userCabinet.lastName}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userCabinet.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mobile</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userCabinet.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <Navigate to="/login" />;
};

export default CabinetComponent;
