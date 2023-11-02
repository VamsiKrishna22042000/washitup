import "./reorder.css";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

const timeArray = [
  {
    id: 1,
    time: "10 am",
  },
  {
    id: 2,
    time: "12 pm",
  },
  {
    id: 3,
    time: "2 pm",
  },
  {
    id: 4,
    time: "4 pm",
  },
  {
    id: 5,
    time: "6 pm",
  },
];

const Reorder = () => {
  const [reorderData, setReorderData] = useState(() => {
    return [];
  });

  const [selectedData, setSelectedData] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    getReorderData();
  }, []);

  const getReorderData = async () => {
    try {
      const userId = Cookies.get("jwt_userId");

      const url = `${process.env.REACT_APP_ROOT_URL}/user/reorder/${userId}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedData);

  return (
    <div className="type-of-wash">
      <from className="userAddress">
        <div className="previous-items"></div>
        <div className="select-option">
          <p>Select Date</p>
          <input
            onChange={(e) => {
              let dateArray = e.target.value.split("-");
              let dateString = dateArray.reverse().join("-");
              console.log(dateString);
            }}
            type="date"
          />
          <p>Select Time</p>
          <div className="select-time">
            {timeArray.map((each) => (
              <button
                onClick={() => {
                  setSelectedTime(each.time);
                }}
                value={selectedTime}
                type="button"
                id={each.id}
                className={
                  selectedTime === each.time ? "button-style2" : "button-style1"
                }
              >
                {each.time}
              </button>
            ))}
          </div>
        </div>
      </from>
      <div className="userAddress">
        <p>Name</p>
        <input type="text" readOnly />
        <p>MobileNumber</p>
        <input type="text" readOnly />
        <p>Location</p>
        <textarea readOnly>
          asdfilkjanslkdjfbaidflakjsdflijasdflkasldkjfhaksljdfhlkajshdflkajshdfkljhbasbfalsdbfiasubdfilubasdifbu
        </textarea>
        <p>Address</p>
        <textarea readOnly>
          asdfilkjanslkdjfbaidflafkajsdhfkljahsdlkfhaslkdjfhlaskdjhfkjsdflijbasbfalsdbfiasubdfilubasdifbu
        </textarea>

        <button type="button">Book</button>
      </div>
    </div>
  );
};

export default Reorder;
