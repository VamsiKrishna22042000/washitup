import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TailSpin } from "react-loader-spinner";

import axios from "axios";

const Address = () => {
  const [obtainedAddress, setAddress] = useState([]);

  const [load, setLoad] = useState(false);

  const [deleteAddress, setDeleteAddresss] = useState({
    addressId: "",
    userId: "",
  });

  const [addAddress, setAddAddress] = useState({
    userId: "",
    location: "",
    address: { dono: "", landmark: "" },
  });

  const [edit, setEdit] = useState({
    addressId: "",
    userId: "",
    editing: false,
  });

  const [editCheck, setEditCheck] = useState({
    id: "",
    location: "",
    address: { dono: "", landmark: "" },
  });

  const [whatTofocus, setFocus] = useState("");

  useEffect(() => {
    getAddressById();
  }, []);

  const getAddressById = async () => {
    const url = `${
      process.env.REACT_APP_ROOT_URL
    }/api/user/getAllAddress/${Cookies.get("jwt_userId")}`;

    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt_userToken")}`,
    };

    const res = await axios.get(url, { headers });

    if (res.status === 200) {
      setAddress(res.data.data);
      setLoad(true);
    }
  };

  const AddAddressModel = () => {
    const submitForm = async (e) => {
      setLoad(false);
      e.preventDefault();
      const url = `${
        process.env.REACT_APP_ROOT_URL
      }/api/user/addAddress/${Cookies.get("jwt_userId")}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt_userToken")}`,
      };

      // console.log(addAddress);

      const body = {
        ...addAddress,
      };

      const res = await axios.post(url, body, { headers });

      if (res.status === 201) {
        setAddAddress({
          userId: "",
          location: "",
          address: { dono: "", landmark: "" },
        });
        getAddressById();
      }
    };

    return (
      <>
        <div
          style={{
            backgroundColor: "#22222250",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            borderRadius: ".5rem",
          }}
        ></div>
        <div className="addAddress-Modal">
          <button
            onClick={() => {
              setAddAddress({
                ...addAddress,
                userId: "",
              });
            }}
            type="button"
          >
            Cancel
          </button>
          <h4>Add New Address</h4>

          <form onSubmit={submitForm}>
            <label htmlFor="location">Location</label>
            <input
              value={addAddress.location}
              onChange={(e) => {
                setAddAddress((prevValue) => ({
                  ...prevValue,
                  location: e.target.value,
                }));
                setFocus("location");
              }}
              placeholder="Please Enter Location"
              id="location"
              type="text"
              autoFocus={whatTofocus === "location" ? true : false}
            />
            <label htmlFor="dono">Do No / Flat No</label>
            <input
              value={addAddress.address.dono}
              onChange={(e) => {
                setAddAddress((prevValue) => ({
                  ...prevValue,
                  address: { ...addAddress.address, dono: e.target.value },
                }));
                setFocus("dono");
              }}
              placeholder="Please Enter Do No"
              id="dono"
              type="text"
              autoFocus={whatTofocus === "dono" ? true : false}
            />
            <label htmlFor="landmark">Landmark</label>
            <input
              value={addAddress.address.landmark}
              onChange={(e) => {
                setAddAddress({
                  ...addAddress,
                  address: { ...addAddress.address, landmark: e.target.value },
                });
                setFocus("landmark");
              }}
              placeholder="Please Enter Landmark"
              id="landmark"
              type="text"
              autoFocus={whatTofocus === "landmark" ? true : false}
            />
            <button type="submit">Done</button>
          </form>
        </div>
      </>
    );
  };

  const changeAddress = async (each) => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/user/updateAddress/${each.userId}/${each._id}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt_userToken")}`,
      };

      const body = {
        location: each.location,
        address: each.address,
      };

      const res = await axios.put(url, body, { headers });

      if (res.status === 200) {
        setEdit({
          addressId: "",
          userId: "",
          editing: false,
        });
        setEditCheck({
          id: "",
          location: "",
          address: { dono: "", landmark: "" },
        });
        getAddressById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editAddress = () => {
    setLoad(false);
    obtainedAddress.map((each) => {
      if (each._id === editCheck.id) {
        if (
          each.location !== editCheck.location ||
          each.address.dono !== editCheck.address.dono ||
          each.address.landmark !== each.address.landmark
        ) {
          changeAddress(each);
        } else {
          setLoad(true);
          toast.error(`Address Not Changed`, {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            position: "top-center",
            theme: "colored",
          });

          setEdit({
            addressId: "",
            userId: "",
            editing: false,
          });
          setEditCheck({
            id: "",
            location: "",
            address: { dono: "", landmark: "" },
          });
        }
      }
    });
  };

  const AlertAddress = () => {
    const deleteAddresss = async () => {
      setLoad(false);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/user/deleteAddress/${deleteAddress.addressId}/${deleteAddress.userId}`;

      const reqConfigure = {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt_userToken")}`,
        },
      };

      const res = await fetch(url, reqConfigure);

      if (res.ok) {
        setDeleteAddresss({
          addressId: "",
          userId: "",
        });
        getAddressById();
      }
    };

    return (
      <>
        <div
          style={{
            backgroundColor: "#22222250",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            borderRadius: ".5rem",
          }}
        ></div>
        <div className="address-alert">
          <h6>Are you sure to delete your address ?</h6>
          <div>
            <button
              onClick={() => {
                setDeleteAddresss({
                  addressId: "",
                  userId: "",
                });
              }}
              type="button"
            >
              Cancle
            </button>
            <button
              onClick={() => {
                deleteAddresss();
              }}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {addAddress.userId !== "" && <AddAddressModel />}
      {deleteAddress.addressId !== "" && <AlertAddress />}
      <ToastContainer />
      {load ? (
        <div className="address-profile">
          <button
            onClick={() => {
              setAddAddress({
                ...addAddress,
                userId: `${Cookies.get("jwt_userId")}`,
              });
            }}
            type="button"
          >
            Add Address
          </button>
          {obtainedAddress.length > 0 &&
            obtainedAddress.map((each) => (
              <div key={each._id} className="address-subsection">
                <div>
                  <img src="/home.png" alt="home" />
                  <h5>Location : </h5>
                  <input
                    onChange={(event) => {
                      let updatedArr = obtainedAddress.map((e) => {
                        if (e._id === each._id) {
                          return { ...e, location: event.target.value };
                        } else {
                          return e;
                        }
                      });

                      setAddress(updatedArr);
                    }}
                    value={each.location}
                    type="text"
                    readOnly={
                      edit.editing && edit.addressId === each._id ? false : true
                    }
                  />
                  <h5>Do No/ Flat No : </h5>
                  <input
                    onChange={(event) => {
                      let updatedArr = obtainedAddress.map((e) => {
                        if (e._id === each._id) {
                          return {
                            ...e,
                            address: {
                              dono: event.target.value,
                              landmark: e.address.landmark,
                            },
                          };
                        } else {
                          return e;
                        }
                      });

                      setAddress(updatedArr);
                    }}
                    value={each.address.dono}
                    type="text"
                    readOnly={
                      edit.editing && edit.addressId === each._id ? false : true
                    }
                  />
                  <h5>Landmark : </h5>
                  <input
                    onChange={(event) => {
                      let updatedArr = obtainedAddress.map((e) => {
                        if (e._id === each._id) {
                          return {
                            ...e,
                            address: {
                              landmark: event.target.value,
                              dono: e.address.dono,
                            },
                          };
                        } else {
                          return e;
                        }
                      });

                      setAddress(updatedArr);
                    }}
                    value={each.address.landmark}
                    type="text"
                    readOnly={
                      edit.editing && edit.addressId === each._id ? false : true
                    }
                  />
                  <div>
                    <button
                      onClick={() => {
                        setDeleteAddresss({
                          addressId: each._id,
                          userId: each.userId,
                        });
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                    {edit.editing && edit.addressId === each._id ? (
                      <button onClick={editAddress} type="button">
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEdit({
                            addressId: each._id,
                            userId: each.userId,
                            editing: !edit.editing,
                          });
                          setEditCheck({
                            id: each._id,
                            location: each.location,
                            address: {
                              dono: each.address.dono,
                              landmark: each.address.landmark,
                            },
                          });
                        }}
                        type="button"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="address-profile"
        >
          <TailSpin height={50} width={50} color={"#6759ff"} />
        </div>
      )}
    </>
  );
};

export default Address;
