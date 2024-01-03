import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const [userDetails, setUserDeatils] = useState({
    name: "",
    mobileNumber: "",
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const url = `${
      process.env.REACT_APP_ROOT_URL
    }/api/user/getUserDetailsByUserId/${Cookies.get("jwt_userId")}`;

    const res = await axios.get(url);

    if (res === 200) {
      console.log(res.data);
    }
  };

  return (
    <div className="detials-profile">
      <div>
        <img src="/profiledetails.png" alt="profiledetails" />
        <input placeholder="Name" readOnly={!edit} />
      </div>
      <div>
        <img src="/phonedetails.png" alt="profiledetails" />
        <input placeholder="Mobile Number" readOnly={!edit} />
      </div>
      {!edit ? (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
          type="button"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
          type="button"
        >
          Done
        </button>
      )}
    </div>
  );
};

export default Profile;
