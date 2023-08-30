import "./admin.css";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const Services = () => {
  const [items, setClothesStore] = useState([]);
  const [showAddModal, setAddModal] = useState("");

  const [showModalEdit, setEditModal] = useState("");

  const [categories, setCategories] = useState([]);

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

      let availableCategories = obtainedData.map((each) => each.category);

      setCategories([...new Set(availableCategories)]);

      console.log(obtainedData);
      setClothesStore(obtainedData);
    }
  };

  const AddNewCategoryModal = () => {
    const [toAddCategory, setCategory] = useState({
      category: "Select",
      name: "",
      price: "",
      image: "",
    });

    const addCategory = (e) => {
      if (e.target.id === "category") {
        setCategory((prevData) => ({ ...prevData, category: e.target.value }));
      } else if (e.target.id === "item") {
        setCategory((prevData) => ({ ...prevData, name: e.target.value }));
      } else if (e.target.id === "price") {
        setCategory((prevData) => ({ ...prevData, price: e.target.value }));
      } else if (e.target.id === "image") {
        setCategory((prevData) => ({ ...prevData, image: e.target.files[0] }));
      }
    };

    const [load, setLoad] = useState(true);

    const updateCategory = async () => {
      if (toAddCategory.category === "Select") {
        toast.error("Please Select Category", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (toAddCategory.name === "") {
        toast.error("Plese Enter Item name", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (toAddCategory.price === "") {
        toast.error("Plese Enter Price", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (toAddCategory.image === "") {
        toast.error("Please upload image", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else {
        let fd = new FormData();

        setLoad(false);

        for (let each in toAddCategory) {
          fd.append(`${each}`, toAddCategory[each]);
        }

        const url = "https://washitup.onrender.com/api/admin/addItem";

        const reqConfigure = {
          method: "POST",
          body: fd,
        };

        const respone = await fetch(url, reqConfigure);

        if (respone.ok) {
          setClothesStore([]);
          toast.success("Item Added", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
          getTheCategories();

          setAddModal("");
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#53545c99",
            zIndex: 2,
          }}
        ></div>
        {load ? (
          <div style={{ left: "40%" }} className="add-service-modal-box">
            <h6>Add a New Category</h6>
            <button
              onClick={() => {
                setAddModal("");
              }}
              type="button"
              style={{
                position: "absolute",
                top: "5%",
                right: "5%",
                color: "#5570F1",
                fontWeight: "bold",
                borderWidth: 0,
                backgroundColor: "transparent",
              }}
            >
              ✕
            </button>
            <p className="add-customer-titles">Select Category</p>
            <select
              id="category"
              onChange={addCategory}
              style={{ textTransform: "capitalize" }}
              className="add-customer-input-box"
            >
              <option>Select</option>
              {categories.map((each) => (
                <option>{each}</option>
              ))}
            </select>

            <p className="add-customer-titles">Item Name</p>
            <input
              id="item"
              onChange={addCategory}
              className="add-customer-input-box"
              type="text"
              placeholder="Enter Item Name"
            />
            <p className="add-customer-titles">Price</p>
            <input
              id="price"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Price"
            />
            <p className="add-customer-titles">Image</p>
            <input
              id="image"
              onChange={addCategory}
              className="add-customer-input-box"
              type="file"
              placeholder="Enter Customer Name"
            />
            <button
              onClick={updateCategory}
              className="add-cutomer-button"
              type="button"
            >
              Add
            </button>
          </div>
        ) : (
          <div
            style={{
              height: "75vh",
              width: "25vw",
              top: "12%",
              left: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="add-service-modal-box"
          >
            <TailSpin color="#6759ff" height={50} width={50} />
          </div>
        )}
      </>
    );
  };

  const EditNewCategoryModal = () => {
    const filterItemFromArray = items.filter(
      (each) => each._id === showModalEdit
    );

    console.log(filterItemFromArray);

    const [toAddCategory, setCategory] = useState({
      category: filterItemFromArray[0].category,
      name: filterItemFromArray[0].name,
      price: filterItemFromArray[0].price,
      image: filterItemFromArray[0].image,
    });

    const [toEdit, setEditCategory] = useState({
      category: filterItemFromArray[0].category,
      name: filterItemFromArray[0].name,
      price: filterItemFromArray[0].price,
      image: filterItemFromArray[0].image,
    });

    const [load, setLoad] = useState(true);

    const addCategory = (e) => {
      if (e.target.id === "category") {
        setCategory((prevData) => ({ ...prevData, category: e.target.value }));
      } else if (e.target.id === "item") {
        setCategory((prevData) => ({ ...prevData, name: e.target.value }));
      } else if (e.target.id === "price") {
        setCategory((prevData) => ({ ...prevData, price: e.target.value }));
      } else if (e.target.id === "image") {
        setCategory((prevData) => ({ ...prevData, image: e.target.files[0] }));
      }
    };

    const updateCategory = async () => {
      if (
        toAddCategory.category !== toEdit.category ||
        toAddCategory.name !== toEdit.name ||
        toAddCategory.price !== toEdit.price ||
        toAddCategory.image !== toEdit.image
      ) {
        setLoad(false);

        let fd = new FormData();

        if (toAddCategory.category !== toEdit.category) {
          fd.append("category", toAddCategory.category);
        }
        if (toAddCategory.name !== toEdit.name) {
          fd.append("name", toAddCategory.name);
        }
        if (toAddCategory.price !== toEdit.price) {
          fd.append("price", toAddCategory.price);
        }
        if (toAddCategory.image !== toEdit.image) {
          fd.append("image", toAddCategory.image);
        }

        const url = `https://washitup.onrender.com/api/admin/editItem/${showModalEdit}`;

        const reqConfigure = {
          method: "PUT",
          body: fd,
        };

        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          setClothesStore([]);
          toast.success("Item Edited", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
          getTheCategories();

          setEditModal("");
        }
      } else {
        toast.error("No Changes Made", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      }
    };

    return (
      <>
        <ToastContainer />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#53545c99",
            zIndex: 2,
          }}
        ></div>
        {load ? (
          <div style={{ left: "40%" }} className="add-service-modal-box">
            <h6>Add a New Category</h6>
            <button
              onClick={() => {
                setEditModal("");
              }}
              type="button"
              style={{
                position: "absolute",
                top: "5%",
                right: "5%",
                color: "#5570F1",
                fontWeight: "bold",
                borderWidth: 0,
                backgroundColor: "transparent",
              }}
            >
              ✕
            </button>
            <p className="add-customer-titles">Select Category</p>
            <select
              id="category"
              onChange={addCategory}
              style={{ textTransform: "capitalize" }}
              className="add-customer-input-box"
              value={toAddCategory.category}
            >
              <option>Select</option>
              {categories.map((each) => (
                <option>{each}</option>
              ))}
            </select>

            <p className="add-customer-titles">Item Name</p>
            <input
              value={toAddCategory.name}
              id="item"
              onChange={addCategory}
              className="add-customer-input-box"
              type="text"
              placeholder="Enter Item Name"
              style={{ textTransform: "capitalize" }}
            />
            <p className="add-customer-titles">Price</p>
            <input
              id="price"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Price"
              value={toAddCategory.price}
            />
            <p className="add-customer-titles">Image</p>
            <input
              id="image"
              onChange={addCategory}
              className="add-customer-input-box"
              type="file"
              placeholder="Enter Customer Name"
            />
            <button
              onClick={updateCategory}
              className="add-cutomer-button"
              type="button"
            >
              Edit
            </button>
          </div>
        ) : (
          <div
            style={{
              height: "75vh",
              width: "25vw",
              top: "12%",
              left: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="add-service-modal-box"
          >
            <TailSpin color="#6759ff" height={50} width={50} />
          </div>
        )}
      </>
    );
  };

  return items.length > 0 ? (
    <>
      {showAddModal !== "" && <AddNewCategoryModal />}
      {showModalEdit !== "" && <EditNewCategoryModal />}
      <section className="order-body">
        <div className="order-summary-head">
          <h6 style={{ color: "#53545c" }}>Services</h6>

          <button
            onClick={() => {
              setAddModal(".");
            }}
            className="assign-vendor"
            type="button"
          >
            <AiOutlinePlus />
            Add New Item
          </button>
        </div>
        <div className="order-summary-view">
          <div style={{ position: "relative" }} className="summary-view">
            <div
              style={{
                height: "25%",
                width: "12%",
                backgroundColor: "#FFCC9169",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <img
                style={{ height: "70%", width: "70%" }}
                src="/profile2.png"
                alt="Profile"
              />
            </div>
            <p
              style={{
                position: "absolute",
                bottom: "40%",
                left: "5%",
                color: "#8B8D97",
                fontSize: "0.85vw",
              }}
            >
              Total Customers
            </p>
            <p
              style={{
                position: "absolute",
                bottom: "25%",
                left: "5%",
                color: "#6759FF",
                fontSize: "1.2vw",
                fontWeight: "bold",
              }}
            >
              {items.length}
            </p>
          </div>
        </div>

        <div className="order-summary-body">
          <div className="order-body-header">
            <h6 style={{ margin: 0 }}>List Of Items</h6>
          </div>
          <div className="order-body-header1">
            <div className="order-body-para">Image</div>
            <p className="order-body-para">Item Name</p>
            <p className="order-body-para">Category</p>
            <p className="order-body-para">Unit Price</p>
            <p className="order-body-para"></p>
          </div>
          {items.map((each) => (
            <div key={each.id} className="order-body-header2">
              <div className="order-body-para">
                <img
                  style={{ height: "100%", width: "15%" }}
                  src={each.image}
                  alt={each.name}
                />
              </div>

              <p
                style={{ textTransform: "capitalize" }}
                className="order-body-para"
              >
                {each.name}
              </p>
              <p
                style={{ textTransform: "capitalize" }}
                className="order-body-para"
              >
                {each.category}
              </p>
              <p className="order-body-para">₹ {each.price}</p>
              <button
                type="button"
                style={{ backgroundColor: "transparent" }}
                className="order-body-para"
              >
                <img
                  onClick={(e) => {
                    setEditModal(e.target.id);
                  }}
                  id={each._id}
                  style={{ height: "100%", width: "13%" }}
                  src="/edit-item.png"
                  alt={each.name}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="order-body"
    >
      <TailSpin color="#6759ff" height={50} width={50} />
    </div>
  );
};

export default Services;
