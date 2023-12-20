import "./reorder.css";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { Watch } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Reorder = ({ fromReroder, getReorder }) => {
  const [reorderData, setReorderData] = useState("");

  const [selectedData, setSelectedData] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [totalPrice, setTotal] = useState(0);
  const [item, setItems] = useState([]);
  const [dataReceived, setData] = useState({});

  const [count, setCount] = useState(0);

  useEffect(() => {
    getReorderData();
  }, []);

  useEffect(() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);

    const max = new Date();
    max.setDate(max.getDate() + 7);

    const minFormatted =
      min.getFullYear() +
      "-" +
      (min.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      min.getDate().toString().padStart(2, "0");

    const maxFormatted =
      max.getFullYear() +
      "-" +
      (max.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      max.getDate().toString().padStart(2, "0");

    setMin(minFormatted);
    setMax(maxFormatted);
    setSelectedData(minFormatted);
  }, []);

  const getReorderData = async () => {
    try {
      const userId = Cookies.get("jwt_userId");
      const userToken = Cookies.get("jwt_userToken");

      const url = `${process.env.REACT_APP_ROOT_URL}/api/user/reorder/${userId}`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      const items = [];

      if (response.ok) {
        // console.log(data.data);
        setReorderData(data.data);
        let total = 0;

        if (data.data.service === "wash & fold") {
          for (let each of data.data.items) {
            total = total + each.itemCount * each.itemId.washfold;
            items.push({
              count: parseInt(each.itemCount),
              ...each.itemId,
              price: parseInt(each.itemCount * each.itemId.washfold),
            });
          }
        } else if (data.data.service === "wash & iron") {
          for (let each of data.data.items) {
            total = total + each.itemCount * each.itemId.washiron;
            items.push({
              count: parseInt(each.itemCount),
              ...each.itemId,
              price: parseInt(each.itemCount * each.itemId.washiron),
            });
          }
        } else {
          for (let each of data.data.items) {
            total = total + each.itemCount * each.itemId.drycleaning;
            items.push({
              count: parseInt(each.itemCount),
              ...each.itemId,
              price: parseInt(each.itemCount * each.itemId.drycleaning),
            });
          }
        }

        setTotal(total);
        setItems(items);
        setData({ ...data.data, date: "", time: "" });
      } else if (
        data.message === "Order Not Find" ||
        data.message ===
          'Cast to ObjectId failed for value "{ _id: undefined }" (type Object) at path "_id" for model "order"'
      ) {
        setTimeout(() => {
          fromReroder();
          toast.error("Please Make Your First Order", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReorder = () => {
    if (selectedTime === "") {
      toast.error(`Select Time`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (selectedTime !== "" && count === 0) {
      setCount(1);
      toast.info(`Check the Date Selected`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else {
      let dateArray = selectedData.split("-");
      let dateString = dateArray.reverse().join("-");
      let dataTobeSent = {
        address: dataReceived.address,
        items: dataReceived.items,
        location: dataReceived.location,
        mobileNumber: dataReceived.userId.mobileNumber,
        name: dataReceived.userId.name,
        date: dateString,
        time: selectedTime,
        total: totalPrice,
      };

      console.log(item);

      getReorder({
        typeofWash: reorderData.service,
        item: item,
        data: dataTobeSent,
      });
    }
  };

  return reorderData === "" ? (
    <div className="type-of-reorder-Aspinner">
      <Watch
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        color={"#6759ff"}
      />
    </div>
  ) : (
    <div className="type-of-reorder-A">
      <ToastContainer />
      <div className="userAddress2-A">
        <div className="previous-items-A">
          <div className="items-con1-A">
            <p style={{ textTransform: "capitalize" }}>
              Service : {reorderData.service}
            </p>
            <p style={{ textTransform: "capitalize" }}>
              Total : ₹ {totalPrice}
            </p>
          </div>
          <div className="items-con2-A">
            {reorderData.items.map((each) => (
              <div className="item-con3-A">
                <img
                  className="items-image-A"
                  src={each.itemId.image}
                  alt={each.itemId.name}
                />
                <p className="item-con-para-A">
                  {each.itemId.name} x {each.itemCount}
                </p>
                <p>
                  {reorderData.service === "wash & iron"
                    ? `₹ ${each.itemCount * each.itemId.washiron}`
                    : reorderData.service === "wash & fold"
                    ? `₹ ${each.itemCount * each.itemId.washfold}`
                    : `₹ ${each.itemCount * each.itemId.drycleaning}`}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="select-option-A">
          <p>Select Date</p>
          <input
            value={selectedData}
            onChange={(e) => {
              setSelectedData(e.target.value);
            }}
            type="date"
            min={min}
            max={max}
          />
          <p>Select Time</p>
          <div className="select-time-A">
            {timeArray.map((each) => (
              <button
                onClick={() => {
                  setSelectedTime(each.time);
                }}
                value={selectedData}
                type="button"
                id={each.id}
                className={
                  selectedTime === each.time
                    ? "button-style2-A"
                    : "button-style1-A"
                }
              >
                {each.time}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="userAddress-A">
        <button
          style={{
            position: "absolute",
            height: "auto",
            width: "auto",
            color: "#6759ff",
            top: 8,
            right: 15,
            backgroundColor: "transparent",
            border: 0,
            fontSize: "1rem",
            cursor: "pointer",
          }}
          type="button"
          onClick={() => {
            fromReroder();
          }}
        >
          ❮
        </button>
        <p>Name</p>
        <input value={reorderData.userId.name} type="text" readOnly />
        <p>MobileNumber</p>
        <input value={reorderData.userId.mobileNumber} type="text" readOnly />
        <p>Do No / Flat No</p>
        <input value={reorderData.address.dono} readOnly />
        <p>LandMark</p>
        <input value={reorderData.address.landmark} readOnly />
        <p>Location</p>
        <textarea value={reorderData.location} readOnly></textarea>
        <button
          onClick={handleReorder}
          className="repeat-order-A"
          type="button"
        >
          Repeat Order
        </button>
      </div>
    </div>
  );
};

export default Reorder;
