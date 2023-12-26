import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import axios from "axios";

const Address = () => {
  const [obtainedAddress, setAddress] = useState(
    "Hiyamat nagar, bara jyotiling mandir ke paas, hitech city, Hyderabad"
  );

  const [addAddress, setAddAddress] = useState({
    userId: "",
    location: "",
    address: { dono: "", landmark: "" },
  });

  const [edit, setEdit] = useState({ id: "", editing: false });

  const [whatTofocus, setFocus] = useState("");

  // useEffect(() => {
  //   getAddressById();
  // }, []);

  // const getAddressById = async () => {
  //   const url = `${process.env.REACT_APP_ROOT_URL}/`;

  //   const res = await axios.get("");
  // };

  const AddAddressModel = () => {
    const submitForm = async (e) => {
      e.preventDefault();
      const url = `${
        process.env.REACT_APP_ROOT_URL
      }/api/user/addAddress/${Cookies.get("jwt_userId")}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt_userToken")}`,
      };

      const res = await axios.post(url, { headers }, addAddress);

      if (res.status === 200) {
        setAddAddress((prevValue) => ({
          ...prevValue,
          userId: "",
        }));
      }
    };

    return (
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
    );
  };

  return (
    <>
      {addAddress.userId !== "" && <AddAddressModel />}
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

        <div className="address-subsection">
          <div>
            <img src="/home.png" alt="home" />
            <p>Home Address</p>
            <textarea readOnly={edit.editing ? false : true}>
              {obtainedAddress}
            </textarea>
            <div>
              <button type="button">Delete</button>
              {!edit.editing ? (
                <button
                  onClick={() => {
                    setEdit({ ...edit, editing: !edit.editing });
                  }}
                  type="button"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEdit({ ...edit, editing: !edit.editing });
                  }}
                  type="button"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="address-subsection">
          <div>
            <img src="/home.png" alt="home" />
            <p>Home Address</p>
            <textarea readOnly={edit.editing ? false : true}>
              {obtainedAddress}
            </textarea>
            <div>
              <button type="button">Delete</button>
              {!edit.editing ? (
                <button
                  onClick={() => {
                    setEdit({ ...edit, editing: !edit.editing });
                  }}
                  type="button"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEdit({ ...edit, editing: !edit.editing });
                  }}
                  type="button"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="address-subsection">
          <div>
            <img src="/home.png" alt="home" />
            <p>Home Address</p>
            <textarea readOnly={edit.editing ? false : true}>
              {obtainedAddress}
            </textarea>
            <div>
              <button type="button">Delete</button>
              {!edit.editing ? (
                <button
                  onClick={() => {
                    setEdit({ ...edit, editing: !edit.editing });
                  }}
                  type="button"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEdit({ ...edit, editing: !edit.editing });
                  }}
                  type="button"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
