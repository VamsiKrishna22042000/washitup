import "./addClothes.css";

import { BiRupee } from "react-icons/bi";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClothes = (props) => {
  const { typeOfWashing } = props;
  const [clothes, setClothesStore] = useState([]);

  const [modalAlert, setShowModalAlert] = useState(false);

  useEffect(() => {
    getTheCategories();
  }, []);

  /** Getting all the category of clothes */
  const getTheCategories = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/user/getAllCategories`;

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      const obtainedData = data.data.map((each) => ({
        ...each,
        count: 0,
        price:
          typeOfWashing === "dry Cleaning"
            ? each.drycleaning
            : typeOfWashing === "wash & fold"
            ? each.washfold
            : each.washiron,
      }));

      const filterObtainedData = obtainedData.filter((each) => {
        if (typeOfWashing === "dry Cleaning") {
          return each.type === "dry";
        } else {
          return each.type === "wash";
        }
      });

      setClothesStore(filterObtainedData);
    }
  };

  const ShowModalAlert = () => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#22222250",
            borderRadius: "1rem",
            zIndex: 2,
          }}
        ></div>

        <div className="alertClass">
          <p>Would You like to select more items !</p>
          <div>
            <button
              onClick={() => {
                setShowModalAlert(false);
              }}
              type="button"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setShowModalAlert(false);
                const { wash } = props;
                const filteredItems = clothes.filter((each) => each.count > 0);
                wash(
                  filteredItems
                ); /** Call back funciton to navigate to the bookservice.js*/
              }}
              type="button"
            >
              No
            </button>
          </div>
        </div>
      </>
    );
  };

  /** Function to navigiate to the bookservice.js based on the total if total is 0 then it show error else move to the next page*/
  const washthem = () => {
    if (total >= 270) {
      setShowModalAlert(true);
    } else if (total < 270) {
      toast.error("Order Value should be 270 or above", {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        position: "top-center",
        theme: "colored",
      });
    } else {
      toast.error("Add Atleast One Item", {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        position: "top-center",
        theme: "colored",
      });
    }
  };

  /** state to store the category selected*/
  const [category, setCategory] = useState("men");

  /** Updating the total count */
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalCount = 0;
    clothes.map((each) => (totalCount = totalCount + each.price * each.count));
    setTotal(totalCount);
  }, [clothes]);

  /** Function Updated the category selected */
  const selectCategory = (event) => {
    setCategory(event.target.id);
  };

  /** Function to increment the count */
  const updateCount = (event) => {
    const recount = filterStore.filter((each) => each._id === event.target.id);

    const receivedCount = recount[0].count;
    console.log(event.target.id);

    if (receivedCount === 15) {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: 15 };
        } else {
          return each;
        }
      });

      setClothesStore(updatedItemCount);
    } else {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: each.count + 1 };
        } else {
          return each;
        }
      });
      setClothesStore(updatedItemCount);
    }
  };

  /** Function to decrement the count*/
  const decrementCount = (event) => {
    const recount = filterStore.filter((each) => each._id === event.target.id);

    const receivedCount = recount[0].count;
    console.log(event.target.id);

    if (receivedCount === 0) {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: 0 };
        } else {
          return each;
        }
      });

      setClothesStore(updatedItemCount);
    } else {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: each.count - 1 };
        } else {
          return each;
        }
      });
      setClothesStore(updatedItemCount);
    }
  };

  /** Filtering the category to display such as men,women,kids,household out of the array of items */
  const filterCategory = clothes.map((each) => each.category);

  /** Filtering the items to display based on the category that was selected by using state */
  const filterStore = clothes.filter((each) => category === each.category);

  return clothes.length > 0 ? (
    <>
      <ToastContainer />
      <div className="addClothes-A">
        {modalAlert && <ShowModalAlert />}
        <p className="counter-total-value-A">Total</p>
        <div className="counter-buttons-container-A">
          {/** Eliminating duplicates by using new Set() from the filterd category and displaying them*/}
          {[...new Set(filterCategory)].map((each) => (
            <button
              onClick={selectCategory}
              key={each}
              id={each}
              className={category === each ? "button-pick-A" : "pick-button-A"}
              type="button"
              style={{ textTransform: "capitalize" }}
            >
              {each}
            </button>
          ))}
        </div>
        <div className="clothes-add-A">
          <BiRupee className="set-counter-total1-A" />
          <p
            style={{ marginLeft: "2%" }}
            id="total-price"
            className="counter-total-price-A"
          >
            {total}
          </p>
          {/** Displaying the filterd Items*/}
          <div className="items-over-A">
            {filterStore.map((each) => (
              <div className="set-counter-A">
                <img
                  src={each.image}
                  className="set-counter-icon-A"
                  alt={each._id}
                />
                <button
                  price={each.price}
                  id={each._id}
                  onClick={decrementCount}
                  className="set-counter-button-A "
                  type="button"
                >
                  -
                </button>
                <p className="set-counter-para-A">{each.count}</p>
                <p
                  style={{ textTransform: "capitalize" }}
                  className="set-counter-name-A"
                >
                  {each.name}
                </p>
                <p className="set-counter-amount-A">
                  <BiRupee style={{ marginBottom: "8%" }} />
                  {each.price}
                </p>
                <p className="set-counter-price-A">
                  <BiRupee style={{ marginBottom: "8%" }} />
                  {each.count * each.price}
                </p>
                <BiRupee
                  className="set-couter-price-icon3-A"
                  style={{ marginBottom: "8%" }}
                />
                <p className="set-couter-price-price3-A">
                  {each.count * each.price}
                </p>
                <button
                  price={each.price}
                  id={each._id}
                  onClick={updateCount}
                  className="set-counter-button-A"
                  type="button"
                >
                  +
                </button>
              </div>
            ))}
          </div>

          <button onClick={washthem} className="wash-button-A">
            Wash Clothes <AiOutlineArrowRight className="wash-clothes-icon-A" />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="addClothes-A">
      <TailSpin color="#6759ff" height={55} width={55} />
    </div>
  );
};
export default AddClothes;
