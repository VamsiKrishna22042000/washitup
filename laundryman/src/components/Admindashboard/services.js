import "./admin.css";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const Services = () => {
  /**items is state to store all the available items which are provided for the service */
  const [items, setClothesStore] = useState([]);

  /**state which is used to show add new item modal box*/
  const [showAddModal, setAddModal] = useState("");

  /**state which is used  */
  const [showModalEdit, setEditModal] = useState("");

  /**state to store the available category of items to display as a dropdown in the edit or adding a new item*/
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getTheCategories();
  }, []);

  /** function to get all the category of clothes */
  const getTheCategories = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/user/getAllCategories`;

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

  /**Function to show add modal box component add an item*/
  const AddNewCategoryModal = () => {
    /**State to store the date entered in the additem modalbox*/
    const [toAddCategory, setCategory] = useState({
      category: "Select",
      name: "",
      drycleaning: "",
      washfold: "",
      washiron: "",
      image: "",
    });

    /**Function that update's the input date to the state*/
    const addCategory = (e) => {
      if (e.target.id === "category") {
        setCategory((prevData) => ({ ...prevData, category: e.target.value }));
      } else if (e.target.id === "item") {
        setCategory((prevData) => ({ ...prevData, name: e.target.value }));
      } else if (e.target.id === "type") {
        setCategory((prevData) => ({ ...prevData, type: e.target.value }));
      } else if (e.target.id === "drycleaning") {
        setCategory((prevData) => ({
          ...prevData,
          drycleaning: e.target.value,
        }));
      } else if (e.target.id === "washfold") {
        setCategory((prevData) => ({
          ...prevData,
          washfold: e.target.value,
        }));
      } else if (e.target.id === "washiron") {
        setCategory((prevData) => ({
          ...prevData,
          washiron: e.target.value,
        }));
      } else if (e.target.id === "image") {
        setCategory((prevData) => ({ ...prevData, image: e.target.files[0] }));
      }
    };

    const [load, setLoad] = useState(true);

    /**Function to add the a new item */
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
      } else if (toAddCategory.type === "") {
        toast.error("Please Enter Type", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (toAddCategory.drycleaning === "") {
        toast.error("Plese Enter Dry Cleaning Price", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (toAddCategory.washfold === "") {
        toast.error("Plese Enter Wash & Fold Price", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (toAddCategory.washiron === "") {
        toast.error("Plese Enter Wash & Iron Price", {
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
        try {
          let fd = new FormData();

          setLoad(false);

          for (let each in toAddCategory) {
            fd.append(`${each}`, toAddCategory[each]);
          }

          const url = `${
            process.env.REACT_APP_ROOT_URL
          }/api/admin/addItem/${Cookies.get("jwt_adminId")}`;

          const reqConfigure = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
            },
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
        } catch (error) {
          toast.error(`${error}`, {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            position: "top-center",
            theme: "colored",
          });
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
            <h6 style={{ fontSize: "1rem", marginBottom: "2%" }}>
              Add a New Category
            </h6>
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
            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Select Category
            </p>
            <select
              id="category"
              onChange={addCategory}
              style={{
                textTransform: "capitalize",
                marginTop: "1.5%",
                marginBottom: "1.5%",
              }}
              className="add-customer-input-box"
            >
              <option>Select</option>
              {categories.map((each) => (
                <option>{each}</option>
              ))}
            </select>

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Item Name
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
              id="item"
              onChange={addCategory}
              className="add-customer-input-box"
              type="text"
              placeholder="Enter Item Name"
            />
            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Type
            </p>
            <input
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
              id="type"
              onChange={addCategory}
              className="add-customer-input-box"
              type="text"
              placeholder="Enter Type"
            />
            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Dry Cleaning Price
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
              id="drycleaning"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Dry Cleaning Price"
            />

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Wash & Fold Price
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
              id="washfold"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Wash & Iron Price"
            />

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Wash & Iron Price
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
              id="washiron"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Wash & Iron Price"
            />

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Image
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
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

  /**Function to show edit modal box component to edit an item */
  const EditNewCategoryModal = () => {
    const filterItemFromArray = items.filter(
      (each) => each._id === showModalEdit
    );

    console.log(filterItemFromArray);

    /**Main state to store the edited Data*/
    const [toAddCategory, setCategory] = useState({
      category: filterItemFromArray[0].category,
      name: filterItemFromArray[0].name,
      drycleaning: filterItemFromArray[0].drycleaning,
      type: filterItemFromArray[0].type,
      washfold: filterItemFromArray[0].washfold,
      washiron: filterItemFromArray[0].washiron,
      image: filterItemFromArray[0].image,
    });

    /**Demo state to check weather there is any change in the data enter and the data that already exists */
    const [toEdit, setEditCategory] = useState({
      category: filterItemFromArray[0].category,
      name: filterItemFromArray[0].name,
      drycleaning: filterItemFromArray[0].drycleaning,
      type: filterItemFromArray[0].type,
      washfold: filterItemFromArray[0].washfold,
      washiron: filterItemFromArray[0].washiron,
      image: filterItemFromArray[0].image,
    });

    const [load, setLoad] = useState(true);

    /**Function to update the date to toEdit state */
    const addCategory = (e) => {
      if (e.target.id === "category") {
        setCategory((prevData) => ({ ...prevData, category: e.target.value }));
      } else if (e.target.id === "item") {
        setCategory((prevData) => ({ ...prevData, name: e.target.value }));
      } else if (e.target.id === "type") {
        setCategory((prevData) => ({ ...prevData, type: e.target.value }));
      } else if (e.target.id === "drycleaning") {
        setCategory((prevData) => ({
          ...prevData,
          drycleaning: parseInt(e.target.value),
        }));
      } else if (e.target.id === "washfold") {
        setCategory((prevData) => ({
          ...prevData,
          washfold: parseInt(e.target.value),
        }));
      } else if (e.target.id === "washiron") {
        setCategory((prevData) => ({
          ...prevData,
          washiron: parseInt(e.target.value),
        }));
      } else if (e.target.id === "image") {
        setCategory((prevData) => ({ ...prevData, image: e.target.files[0] }));
      }
    };

    /**Function make an api call to edit the existing data*/
    const updateCategory = async () => {
      if (
        toAddCategory.category !== toEdit.category ||
        toAddCategory.name !== toEdit.name ||
        toAddCategory.type !== toEdit.type ||
        toAddCategory.drycleaning !== toEdit.drycleaning ||
        toAddCategory.washfold !== toEdit.washfold ||
        toAddCategory.washiron !== toEdit.washiron ||
        toAddCategory.image !== toEdit.image
      ) {
        try {
          setLoad(false);

          let fd = new FormData();

          if (toAddCategory.category !== toEdit.category) {
            fd.append("category", toAddCategory.category);
          }
          if (toAddCategory.name !== toEdit.name) {
            fd.append("name", toAddCategory.name);
          }

          if (toAddCategory.type !== toEdit.type) {
            fd.append("type", toAddCategory.type);
          }

          if (toAddCategory.drycleaning !== toEdit.drycleaning) {
            fd.append("drycleaning", toAddCategory.drycleaning);
          }
          if (toAddCategory.washfold !== toEdit.washfold) {
            fd.append("washfold", toAddCategory.washfold);
          }
          if (toAddCategory.washfold !== toEdit.washfold) {
            fd.append("washiron", toAddCategory.washiron);
          }

          if (toAddCategory.image !== toEdit.image) {
            fd.append("image", toAddCategory.image);
          }

          const url = `${
            process.env.REACT_APP_ROOT_URL
          }/api/admin/editItem/${showModalEdit}/${Cookies.get("jwt_adminId")}`;

          const reqConfigure = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
            },
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
        } catch (error) {
          toast.error(`${error}`, {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            position: "top-center",
            theme: "colored",
          });
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
            <h3>Edit Category</h3>
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
            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Select Category
            </p>
            <select
              id="category"
              onChange={addCategory}
              style={{
                textTransform: "capitalize",
                marginTop: "2%",
                marginBottom: "2%",
              }}
              className="add-customer-input-box"
              value={toAddCategory.category}
            >
              <option>Select</option>
              {categories.map((each) => (
                <option>{each}</option>
              ))}
            </select>

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Item Name
            </p>
            <input
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
              id="item"
              onChange={addCategory}
              className="add-customer-input-box"
              type="text"
              placeholder="Enter Item Name"
              value={toAddCategory.name}
            />
            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Type
            </p>
            <input
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
              id="type"
              onChange={addCategory}
              className="add-customer-input-box"
              type="text"
              placeholder="Enter Type"
              value={toAddCategory.type}
            />
            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Dry Cleaning Price
            </p>
            <input
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
              id="drycleaning"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Dry Cleaning Price"
              value={toAddCategory.drycleaning}
            />

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Wash & Fold Price
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
              id="washfold"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              placeholder="Enter Wash & Fold Price"
              value={toAddCategory.washfold}
            />

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Wash & Iron Price
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
              id="washiron"
              onChange={addCategory}
              className="add-customer-input-box"
              type="number"
              value={toAddCategory.washiron}
              placeholder="Enter Wash & Iron Price"
            />

            <p
              style={{ marginTop: "1%", marginBottom: "1%" }}
              className="add-customer-titles"
            >
              Image
            </p>
            <input
              style={{ marginTop: "2%", marginBottom: "2%" }}
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
              Total Items
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
            <div style={{ width: "10%" }} className="order-body-para">
              Image
            </div>
            <p className="order-body-para">Item Name</p>
            <p className="order-body-para">Category</p>
            <p className="order-body-para">Type</p>
            <p className="order-body-para">Dry Cleaning Price</p>
            <p className="order-body-para">Wash & Fold Price</p>
            <p className="order-body-para">Wash & Iron Price</p>
            <p style={{ width: "10%" }} className="order-body-para"></p>
          </div>
          {items.map((each) => (
            <div key={each.id} className="order-body-header2">
              <div style={{ width: "10%" }} className="order-body-para">
                <img
                  style={{ height: "100%", width: "41%" }}
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
              <p
                style={{ textTransform: "capitalize" }}
                className="order-body-para"
              >
                {each.type}
              </p>
              <p className="order-body-para">₹ {each.drycleaning}</p>
              <p className="order-body-para">₹ {each.washfold}</p>
              <p className="order-body-para">₹ {each.washiron}</p>
              <button
                type="button"
                style={{ backgroundColor: "transparent", width: "10%" }}
                className="order-body-para"
              >
                <img
                  onClick={(e) => {
                    setEditModal(e.target.id);
                  }}
                  id={each._id}
                  style={{ height: "100%", width: "40%" }}
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
