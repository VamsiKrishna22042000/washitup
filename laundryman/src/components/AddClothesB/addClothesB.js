import "./addClothesB.css";

import { BiRupee } from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

const AddClothesBSec = (props) => {
  const { typeOfWashing } = props;
  const [clothes, setClothesStore] = useState(() => {
    return [];
  });

  /** Updating the total count */
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setClothesStore([]);
    getTheCategories();
  }, [typeOfWashing]);

  /** Getting all the category of clothes */
  const getTheCategories = async () => {
    try {
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
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        position: "top-center",
        theme: "colored",
      });
    }
  };

  /** Function to navigiate to the bookservice.js based on the total if total is 0 then it show error else move to the next page*/
  const washthem = (updatedItems) => {
    const { getItems } = props;
    const filteredItems = updatedItems.filter((each) => each.count > 0);

    let totalCount = 0;
    filteredItems.map(
      (each) => (totalCount = totalCount + each.price * each.count)
    );

    getItems({
      itemss: filteredItems,
      total: totalCount,
    }); /** Call back funciton to navigate to the bookservice.js*/
  };

  /** state to store the category selected*/
  const [category, setCategory] = useState("men");

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
    /**console.log(event.target.id);*/

    if (receivedCount === 15) {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: 15 };
        } else {
          return each;
        }
      });

      setClothesStore(updatedItemCount);
      washthem(updatedItemCount);
    } else {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: each.count + 1 };
        } else {
          return each;
        }
      });
      setClothesStore(updatedItemCount);

      washthem(updatedItemCount);
    }
  };

  /** Function to decrement the count*/
  const decrementCount = (event) => {
    const recount = filterStore.filter((each) => each._id === event.target.id);

    const receivedCount = recount[0].count;
    /*console.log(event.target.id);*/

    if (receivedCount === 0) {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: 0 };
        } else {
          return each;
        }
      });

      setClothesStore(updatedItemCount);
      washthem(updatedItemCount);
    } else {
      const updatedItemCount = clothes.map((each) => {
        if (each._id === event.target.id) {
          return { ...each, count: each.count - 1 };
        } else {
          return each;
        }
      });

      setClothesStore(updatedItemCount);
      washthem(updatedItemCount);
    }
  };

  /** Filtering the category to display such as men,women,kids,household out of the array of items */
  const filterCategory = clothes.map((each) => each.category);

  /** Filtering the items to display based on the category that was selected by using state */
  const filterStore = clothes.filter((each) => category === each.category);

  return clothes.length > 0 ? (
    <div style={{ cursor: "pointer" }} className="add-Clothes-containerB">
      <div className="counter-buttons-container-b">
        {/** Eliminating duplicates by using new Set() from the filterd category and displaying them*/}
        {[...new Set(filterCategory)].map((each) => (
          <button
            onClick={selectCategory}
            key={each}
            id={each}
            className={category === each ? "button-pick-b" : "pick-button-b"}
            type="button"
            style={{ textTransform: "capitalize" }}
          >
            {each}
          </button>
        ))}
      </div>
      <div className="clothes-add-b">
        {/** Displaying the filterd Items*/}
        <div className="items-over-b">
          {filterStore.map((each) => (
            <div className="set-counter-b">
              <img
                src={each.image}
                className="set-counter-icon"
                alt={each._id}
              />
              <button
                style={{ cursor: "pointer" }}
                price={each.price}
                id={each._id}
                onClick={decrementCount}
                className="set-counter-button"
                type="button"
              >
                -
              </button>
              <p className="set-counter-para">{each.count}</p>
              <p
                style={{ textTransform: "capitalize" }}
                className="set-counter-name"
              >
                {each.name}
              </p>
              <p className="set-counter-amount">
                <BiRupee style={{ marginBottom: "8%" }} />
                {each.price}
              </p>
              <p className="set-counter-price">
                <BiRupee style={{ marginBottom: "8%" }} />
                {each.count * each.price}
              </p>
              <BiRupee
                className="set-couter-price-icon3"
                style={{ marginBottom: "8%" }}
              />
              <p className="set-couter-price-price3">
                {each.count * each.price}
              </p>
              <button
                style={{ cursor: "pointer" }}
                price={each.price}
                id={each._id}
                onClick={updateCount}
                className="set-counter-button"
                type="button"
              >
                +
              </button>
            </div>
          ))}
        </div>
        {/*<button onClick={washthem} className="wash-button">
          Wash Clothes <AiOutlineArrowRight className="wash-clothes-icon" />
        </button>*/}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="add-Clothes-container-D"
    >
      <TailSpin color="#6759ff" height={50} width={50} />
    </div>
  );
};
export default AddClothesBSec;
