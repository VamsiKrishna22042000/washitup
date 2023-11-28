import "./issues.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAlert } from "react-icons/io";
import { VscCheckAll } from "react-icons/vsc";

import { TailSpin } from "react-loader-spinner";

const Issues = () => {
  const [obtainedIssue, setObtainedIssue] = useState(() => {
    return [];
  });

  const [filterdObtainedIssue, setFilteredObtainedIssue] = useState(() => {
    return [];
  });

  const [load, setLoading] = useState(false);

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllIssue`;

      const response = await axios.get(url);

      // console.log(response);

      if (response.status === 200) {
        const combinedData = [];
        // console.log(response?.data?.data);
        for (let each of response?.data?.data) {
          for (let e of each?.issue) {
            combinedData.push({
              address: each?.orderId?.address,
              location: each?.orderId?.location,
              date: each?.orderId?.date,
              deliverydate: each?.orderId?.deliveryDate,
              items: each?.orderId?.items,
              service: each?.orderId?.service,
              time: each?.orderId?.time,
              totalAmount: each?.orderId?.totalAmount,
              name: each?.orderId?.userId?.name,
              mobileNumber: each?.orderId?.userId?.mobileNumber,
              orderId: each?.orderId?._id,
              issueId: e?._id,
              status: e?.status,
              issueType: e?.issueType,
              describeIssue: e?.describeIssue,
              issueMainId: each?._id,
            });
          }
        }
        console.log(combinedData);
        setObtainedIssue(combinedData);

        setLoading(true);
      } else {
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const changeIssueStatus = async (issueMainId, issueId, status) => {
    setLoading(false);
    // console.log(issueMainId);
    // console.log(issueId);
    // console.log(status);

    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/changeIssueStatus`;
      const body = {
        issueMainId,
        issueId,
        status,
      };
      const response = await axios.post(url, body);

      if (response.status === 200) {
        getIssues();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeIssueStatusFilter = async (issueMainId, issueId, status) => {
    setLoading(false);
    // console.log(issueMainId);
    // console.log(issueId);
    // console.log(status);

    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/changeIssueStatus`;
      const body = {
        issueMainId,
        issueId,
        status,
      };
      const response = await axios.post(url, body);

      if (response.status === 200) {
        setFilteredObtainedIssue([
          { ...filterdObtainedIssue[0], status: status },
        ]);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // Function to filter the issue

  const filterIssueItems = (e) => {
    const filterdIssue = obtainedIssue.filter(
      (each) => each.issueId === e.target.id
    );
    console.log(filterdIssue);
    setFilteredObtainedIssue(filterdIssue);
  };

  // console.log(filterdObtainedIssue);
  return obtainedIssue.length > 0 ? (
    load ? (
      filterdObtainedIssue.length > 0 ? (
        <div className="issue-body">
          <div className="header-issues">
            <h6 style={{ fontSize: ".8rem" }}>
              Issues Id {filterdObtainedIssue[0].issueId}
            </h6>
            <select
              onChange={(e) => {
                changeIssueStatusFilter(
                  filterdObtainedIssue[0]?.issueMainId,
                  filterdObtainedIssue[0]?.issueId,
                  e.target.value
                );
              }}
              id={filterdObtainedIssue[0]?.issueId}
              value={filterdObtainedIssue[0]?.status}
            >
              <option>Active</option>
              <option>In Active</option>
            </select>
            <button
              onClick={() => {
                setLoading(false);
                setFilteredObtainedIssue([]);
                getIssues();
              }}
              type="button"
              style={{
                backgroundColor: "transparent",
                marginLeft: "1%",
                borderWidth: 0,
                color: "#6759FF",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{ textTransform: "capitalize" }}
            className="total-issue-con-sub"
          >
            <div className="total-isses-sub">
              <img src="./profile2.png" alt="Total Issues" />
              <p>{filterdObtainedIssue[0].name} </p>
              <p>{filterdObtainedIssue[0].mobileNumber}</p>
            </div>
            <div className="total-isses-sub2">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="./location2.png" alt="Total Issues" />
                <p style={{ marginLeft: "5%", fontSize: ".8rem" }}>Address</p>
              </div>
              <p style={{ overflowY: "scroll" }}>
                {filterdObtainedIssue[0].location}{" "}
              </p>
            </div>
            <div className="total-isses-sub2">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="./issues2.png" alt="Total Issues" />{" "}
                <p
                  style={{ marginLeft: "5%", fontSize: ".8rem", color: "red" }}
                >
                  Described Issue
                </p>
              </div>
              <p style={{ overflowY: "scroll" }}>
                {filterdObtainedIssue[0].describeIssue}{" "}
              </p>
            </div>
            {/* <div className="total-isses-sub2">
              <h4>Total Amount</h4>
              <p
                style={{
                  fontSize: "1rem",
                }}
              >
                ₹ {filterdObtainedIssue[0].totalAmount}
              </p>
            </div> */}
          </div>
          <div className="issues">
            <div>
              <h5 style={{ textTransform: "capitalize" }}>Items</h5>
              <h5 style={{ textTransform: "capitalize" }}>
                Type of Wash : {filterdObtainedIssue[0].service}
              </h5>
            </div>
            {/* <div id="list-of-issues">
              <p>Image</p>
              <p>Item Type</p>
              <p>Category</p>
              <p>Unique Id</p>
              <p>Unit Price</p>
            </div>
            {filterdObtainedIssue.items.map((each) => (
              <div key={each.id} className="order-body-header2">
                <div className="order-body-para">
                  <img
                    style={{ height: "100%", width: "16%" }}
                    src={each.image}
                    alt={each.productName}
                  />
                </div>
                <p
                  style={{ textTransform: "capitalize" }}
                  className="order-body-para"
                >
                  {each.itemName}
                </p>
                <p
                  style={{ textTransform: "capitalize" }}
                  className="order-body-para"
                >
                  {each.itemCategory}
                </p>
                <p
                  style={{
                    textTransform: "capitalize",
                  }}
                  className="order-body-para"
                >
                  {each.uniqueId.id.slice(0, 7)}
                </p>
                {each.price > 1000 && each.price < 100000 ? (
                  <p className="order-body-para">
                    ₹ {parseInt(each.price) / 1000} K
                  </p>
                ) : each.price > 100000 && each.price < 1000000 ? (
                  <p className="order-body-para">
                    ₹ {parseInt(each.price) / 100000} L
                  </p>
                ) : each.price > 1000000 ? (
                  <p className="order-body-para">
                    ₹ {parseInt(each.price) / 1000000} M
                  </p>
                ) : (
                  <p className="order-body-para">₹ {each.price}</p>
                )}
              </div>
            ))} */}
            <div>
              <h5 style={{ textTransform: "capitalize" }}></h5>
              <h5 style={{ textTransform: "capitalize" }}>
                Total Amount : ₹ {filterdObtainedIssue[0].totalAmount}
              </h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="issue-body">
          <div className="header-issues">
            <h6>Issues</h6>
          </div>
          <div className="total-issue-con">
            <div className="total-isses">
              <img src="./issues2.png" alt="Total Issues" />
              <p>Total Issues</p>
              <h4>{obtainedIssue.length}</h4>
            </div>
          </div>
          <div className="issues">
            <div>
              <h5>Issues</h5>
              <input placeholder="Search Issue" />
            </div>
            <div id="list-of-issues">
              <IoMdAlert color={"transparent"} />
              <p>Customer Name</p>
              <p>Issue Type</p>
              <p>Order Date & Time</p>
              <p>Delivery Date</p>
              <p>Total Amount</p>
              <p>Action</p>
            </div>
            <ul id="issues-unlisted">
              {obtainedIssue.map((each) => (
                <li key={each.issueId} id="issues-listed">
                  {each.status === "Active" ? (
                    <IoMdAlert
                      id={each.issueId}
                      onClick={filterIssueItems}
                      color={"red"}
                    />
                  ) : (
                    <VscCheckAll
                      id={each.issueId}
                      onClick={filterIssueItems}
                      color={"green"}
                    />
                  )}
                  <p id={each.issueId} onClick={filterIssueItems}>
                    {each?.name}
                  </p>
                  <p id={each.issueId} onClick={filterIssueItems}>
                    {each?.issueType}
                  </p>
                  <p id={each.issueId} onClick={filterIssueItems}>
                    {each?.date} - {each?.time}
                  </p>
                  <p id={each.issueId} onClick={filterIssueItems}>
                    {each?.deliverydate}
                  </p>
                  <p id={each.issueId} onClick={filterIssueItems}>
                    ₹ {each?.totalAmount}
                  </p>
                  <select
                    onChange={(e) => {
                      changeIssueStatus(
                        each?.issueMainId,
                        each?.issueId,
                        e.target.value
                      );
                    }}
                    id={each?.issueId}
                    value={each?.status}
                  >
                    <option color>Active</option>
                    <option>In Active</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    ) : (
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="order-body"
      >
        <TailSpin color="#6759ff" height={50} width={50} />
      </section>
    )
  ) : load ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FC",
      }}
      className="order-body"
    >
      <img src="/no-orders.gif" width={250} />
      <h2>No Issues Yet</h2>
    </div>
  ) : (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="order-body"
    >
      <TailSpin color="#6759ff" height={50} width={50} />
    </section>
  );
};

export default Issues;
