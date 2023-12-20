import { useState } from "react";

const Address = () => {
  const [obtainedAddress, setAddress] = useState(
    "Hiyamat nagar, bara jyotiling mandir ke paas, hitech city, Hyderabad"
  );

  const [edit, setEdit] = useState({ id: "", editing: false });

  return (
    <div className="address-profile">
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
  );
};

export default Address;
