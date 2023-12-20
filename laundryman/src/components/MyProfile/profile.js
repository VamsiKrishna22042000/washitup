import { useState } from "react";

const Profile = () => {
  const [edit, setEdit] = useState(false);

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
