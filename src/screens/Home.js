import React, { useState, useEffect } from "react";

import { Header } from "../common/Header";
import { generateToken } from "../Service";
import { CALLBACK_URL, MID, URL_SCHEME } from "../Constant";

import { Helmet } from "react-helmet";
import { MdCancel } from "react-icons/md";

import { TailSpin } from "react-loader-spinner";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function Home() {
  const [loader, setloader] = useState(false);
  const [fineloader, setfineloader] = useState(false);
  const [hideUserDetails, sethideUserDetails] = useState(false);
  const [email, setemail] = useState("vijender.pandita@celect.in");
  const [fullName, setfullName] = useState("");
  const [phone, setphone] = useState("");
  const [memberId, setmemberId] = useState("");
  const [fine, setfine] = useState("");
  const [libraryName, setlibraryName] = useState(
    "Central Library - BITS School of Management, Powai, Mumbai"
  );
  const [isOrderIdUpdated, setOrderIdUpdated] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [responseData, setresponseData] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!isOrderIdUpdated) {
      const id = searchParams.get("orderId");
      console.log('back_end data :- ',id)
      generateOrderId();
      setOrderIdUpdated(true);
    }
  });

  const generateOrderId = () => {
    const r = Math.random() * new Date().getMilliseconds();
    setOrderId(
      "CELECT" +
        (1 + Math.floor(r % 2000) + 10000) +
        "dk" +
        (Math.floor(r % 100000) + 10000)
    );
  };

  const check = () => {
    if (email === "") {
      alert("Please Enter Email Id");
    } else {
      setloader(true);
      initiatePayment();
      // makePayment()
      // getUserAllData();
    }
  };

  const getUserAllData = () => {
    fetch(
      `https://bitsomapi.libcon.in/api/getResponse?rptName=LIBCON-PATINFO&parameter=${email}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    )
      .then((result) => {
        result.json().then(async (resp) => {
          console.log("resp : ", resp.data.response[0]);
          if (resp.status === "success") {
            setfullName(
              resp.data.response[0][2] + " " + resp.data.response[0][3]
            );
            setphone(resp.data.response[0][6]);
            setmemberId(resp.data.response[0][1]);
            setfine(resp.data.response[0][12]);
            setloader(false);
            sethideUserDetails(true);
          } else {
            setloader(false);
            alert("Something went wrong. Please try again.");
          }
        });
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

  const payFine = async (e) => {
    // e.preventDefault();
    try {
      let amount = "1" + ".00";
      const token = await generateToken(orderId, amount);
      console.log("token :- ", token);
    } catch (error) {
      console.log(error);
    }
  };

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const getData = (data) => {
    return fetch(`http://localhost:8080/web_payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const makePayment = () => {
    getData({
      amount: "1.00",
      email: email,
      orderId: orderId,
      phone: "9811929305",
    }).then((response) => {
      setresponseData(response);
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response,
      };
      post(information);
    });
  };

  const initiatePayment = async () => {
   try {
    let amount = "1" + ".00";
    const token = await generateToken(orderId, amount);
    console.log("token :- ", token);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: orderId /* update order id */,
        token: token /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: amount /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    console.log(config)
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
        console.log("config :- ",config)
      }).catch(function onError(error) {
        console.log("error => ", error);
      })
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <>
      <>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
          />

          <script
            type="application/javascript"
            crossorigin="anonymous"
            src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/Contin18571014125103.js`}
          >
            {" "}
          </script>

          <title>
            LIBCON - Library Convergence, automation, KOHA, RFID, bibliotheca
            official distributor
          </title>
        </Helmet>
        <Header />
      </>
      <main className="main">
        <section id="hero">
          <div
            className="carousel slide carousel-fade"
            style={{ overflow: "auto" }}
          >
            <div className="carousel-item active">
              <div className="carousel-container">
                <div className="container mb-5">
                  <div className="main-card mb-0 card">
                    <div className="titledetails  text-white">DETAILS</div>

                    <div className="pd-1rem">
                      {/*-----------------------SELECT-COUNTRY-AND-STATE---------------------------------  */}

                      <div className="form-row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="">Library Name</label>
                          <span className="text-danger">*</span>

                          <input
                            disabled={true}
                            type="Text"
                            className="form-control"
                            placeholder="Enter Text"
                            value={libraryName}
                            // onClick={(e)=>setemail(e.target.value )}
                          />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="">Email</label>
                          <span className="text-danger">*</span>

                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Email"
                            required=""
                            autoFocus=""
                            autoComplete="on"
                          />
                        </div>
                      </div>
                    </div>

                    {/* -------------------------SEARCH-BUTTON------------------------------- */}

                    <div className="card-footer center">
                      <button
                        disabled={loader ? true : false}
                        type="button"
                        className="btn btn-danger"
                        onClick={() => check()}
                      >
                        {!loader ? (
                          <span>Search</span>
                        ) : (
                          <div className="loader_center">
                            <TailSpin
                              color="#fff"
                              height={30}
                              width={50}
                              ariaLabel="loading"
                            />
                          </div>
                        )}
                      </button>
                    </div>

                    {/*-------------------------------USER-DETAILS---------------------------------------------*/}
                    {hideUserDetails && (
                      <>
                        <div className="titledetails  text-white brd-0">
                          USER DETAILS{" "}
                          <MdCancel
                            className="fl-r size"
                            onClick={() => {
                              sethideUserDetails(false);
                              setemail("");
                            }}
                          />
                        </div>

                        <div className="pd-1rem">
                          <div className="form-row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="">Full Name</label>

                              <input
                                disabled={true}
                                type="Text"
                                value={fullName}
                                className="form-control"
                                placeholder="Full Name"
                                // onClick={(e)=>setemail(e.target.value )}
                              />
                            </div>

                            <div className="col-md-6 mb-4">
                              <label htmlFor="">Phone Number</label>

                              <input
                                type="text"
                                value={phone}
                                disabled={true}
                                className="form-control"
                                placeholder="Enter Email"
                                required=""
                                autoFocus=""
                                autoComplete="on"
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="">Member Id</label>

                              <input
                                disabled={true}
                                type="Text"
                                value={memberId}
                                className="form-control"
                                placeholder="Full Name"
                                // onClick={(e)=>setemail(e.target.value )}
                              />
                            </div>

                            <div className="col-md-6 mb-4">
                              <label htmlFor="">Total Fine</label>

                              <input
                                type="text"
                                value={fine}
                                disabled={true}
                                className="form-control"
                                placeholder="Enter Email"
                                required=""
                                autoFocus=""
                                autoComplete="on"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="card-footer center">
                          <h1>{responseData}</h1>
                          <button
                            disabled={fineloader ? true : false}
                            type="submit"
                            className="btn btn-danger"
                            onClick={() => makePayment()}
                          >
                            {!fineloader ? (
                              <span>Pay Fine</span>
                            ) : (
                              <div className="loader_center">
                                <TailSpin
                                  color="#fff"
                                  height={30}
                                  width={50}
                                  ariaLabel="loading"
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
