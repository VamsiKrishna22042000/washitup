import "./addClothes.css";

import { BiRupee } from "react-icons/bi";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

const clothesStore = [
  {
    id: 1,
    category: "Men",
    name: "Shirt",
    imgUrl: "Men-shirt",
    price: 10,
  },
  {
    id: 2,
    category: "Men",
    name: "T-Shirt",
    imgUrl: "Men-tshirt",
    price: 10,
  },
  {
    id: 3,
    category: "Men",
    name: "Trousers",
    imgUrl: "Men-trousers",
    price: 10,
  },
  {
    id: 4,
    category: "Men",
    name: "Shorts",
    imgUrl: "Men-shorts",
    price: 10,
  },
  {
    id: 5,
    category: "Men",
    name: "Jeans",
    imgUrl: "Men-jeans",
    price: 10,
  },
  {
    id: 6,
    category: "Men",
    name: "Breifs",
    imgUrl: "Men-breifs",
    price: 10,
  },

  {
    id: 7,
    category: "Women",
    name: "Shirt",
    imgUrl: "Women-shirt",
    price: 10,
  },
  {
    id: 8,
    category: "Women",
    name: "T-shirt",
    imgUrl: "Women-tshirt",
    price: 10,
  },
  {
    id: 9,
    category: "Women",
    name: "Shorts",
    imgUrl: "Women-shorts",
    price: 10,
  },
  {
    id: 10,
    category: "Women",
    name: "Leggins",
    imgUrl: "Women-leggins",
    price: 10,
  },
  {
    id: 11,
    category: "Women",
    name: "Jeans",
    imgUrl: "Women-jeans",
    price: 10,
  },
  {
    id: 12,
    category: "Women",
    name: "Jumpsuit",
    imgUrl: "Women-jumpsuit",
    price: 10,
  },
  {
    id: 13,
    category: "Kids",
    name: "Combo",
    imgUrl: "kids-tshirtShort",
    price: 10,
  },
  {
    id: 14,
    category: "Kids",
    name: "Frock",
    imgUrl: "kids-frock",
    price: 10,
  },
  {
    id: 15,
    category: "Kids",
    name: "Jumpsuit",
    imgUrl: "kids-jumpsuit",
    price: 10,
  },
  {
    id: 16,
    category: "Kids",
    name: "Boy's Dress",
    imgUrl: "baby-boy-dress",
    price: 10,
  },
  {
    id: 17,
    category: "Kids",
    name: "Girl's Dress",
    imgUrl: "baby-girl-dress",
    price: 10,
  },
  {
    id: 18,
    category: "Kids",
    name: "Hoodie",
    imgUrl: "baby-hoodie",
    price: 10,
  },
  {
    id: 19,
    category: "Household",
    name: "Arpon",
    imgUrl: "household-apron",
    price: 10,
  },
  {
    id: 20,
    category: "Household",
    name: "Towel",
    imgUrl: "household-towel",
    price: 10,
  },
  {
    id: 21,
    category: "Household",
    name: "Blankets",
    imgUrl: "household-blankets",
    price: 10,
  },
  {
    id: 22,
    category: "Household",
    name: "Pillow covers",
    imgUrl: "household-pillowcovers",
    price: 10,
  },
  {
    id: 23,
    category: "Household",
    name: "Carpet",
    imgUrl: "household-carpet",
    price: 10,
  },
  {
    id: 24,
    category: "Household",
    name: "Bed cover",
    imgUrl: "household-bedcover",
    price: 10,
  },
];

const AddClothes = (props) => {
  const [clothes, setClothesStore] = useState([]);

  useEffect(() => {
    getTheCategories();
  }, []);

  /** Getting all the category of clothes */
  const getTheCategories = async () => {
    const url = `https://washitup.onrender.com/api/user/getAllCategories`;

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
      const obtainedData = data.data.map((each) => ({
        ...each,
        count: 0,
        imgUrl: "/Men-shirt.png",
      }));

      setClothesStore(obtainedData);
    }
  };

  /** Function to navigiate to the bookservice.js based on the total if total is 0 then it show error else move to the next page*/
  const washthem = () => {
    if (total > 0) {
      const errorMessage = document.getElementById("add-clothes-err");
      errorMessage.classList.add("add-clothes-error-msg-disable");
      const { wash } = props;
      const filteredItems = clothes.filter((each) => each.count > 0);
      wash(
        filteredItems
      ); /** Call back funciton to navigate to the bookservice.js*/
    } else {
      const errorMessage = document.getElementById("add-clothes-err");
      errorMessage.classList.remove("add-clothes-error-msg-disable");
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
    <div className="add-Clothes">
      <p className="counter-total-value">Total</p>
      <div className="counter-buttons-container">
        {/** Eliminating duplicates by using new Set() from the filterd category and displaying them*/}
        {[...new Set(filterCategory)].map((each) => (
          <button
            onClick={selectCategory}
            key={each}
            id={each}
            className={category === each ? "button-pick" : "pick-button"}
            type="button"
            style={{ textTransform: "capitalize" }}
          >
            {each}
          </button>
        ))}
      </div>
      <div className="clothes-add">
        <BiRupee className="set-counter-total-price-icon" />
        <p id="total-price" className="counter-total-price">
          {total}
        </p>
        {/** Displaying the filterd Items*/}
        {filterStore.map((each) => (
          <div className="set-counter">
            <img
              src={each.imgUrl}
              className="set-counter-icon"
              alt={each._id}
            />
            <button
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
            <BiRupee className="set-counter-price-icon" />
            <p className="set-counter-price">{each.count * each.price}</p>
            <button
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
        <p
          id="add-clothes-err"
          className="add-clothes-error-msg add-clothes-error-msg-disable"
        >
          *Add atleast one item to wash
        </p>
        <button onClick={washthem} className="wash-button">
          Wash Clothes <AiOutlineArrowRight className="wash-clothes-icon" />
        </button>
      </div>
    </div>
  ) : (
    <div className="spinner-con">
      <TailSpin color="#6759ff" height={50} width={50} />
    </div>
  );
};
export default AddClothes;
