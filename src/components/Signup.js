import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [nameText,setNameText] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [emailValidity,setEmailValidity] = useState(true)
  const [passwordValidity,setPasswordValidity] = useState(true)
  const [nameValidity,setNameValidity] = useState(true)
  const [otpValidity,setOtpValidity] = useState(true)
  const [responseStyle,setResponseStyle] = useState({display:"none"})
  const [response,setResponse] = useState("")
  const [alertType,setAlertType] = useState("")
  const [otp,setOtp] = useState("")
  const nevigate = useNavigate()
  const [typeOtp,setTypeOtp] = useState(false)

  const handleOnChangeName = (event)=>setNameText(event.target.value)
  const handleOnChangeEmail = (event)=>setEmail(event.target.value)
  const handleOnChangePassword = (event)=>setPassword(event.target.value)
  const handleOnChangeOtp = (event)=>{
    if(event.target.value.length<=6){
      setOtp(event.target.value)
    }
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailValidity(true)
    setPasswordValidity(true)
    setNameValidity(true)
    if(nameText === ""){
      setAlertType("alert-danger")
      setResponse("please enter name")
      setResponseStyle({display:"block"})
      setNameValidity(false)
      return
    }
    else if(email === ""){
      setAlertType("alert-danger")
      setResponse("please enter email")
      setResponseStyle({display:"block"})
      setEmailValidity(false)
      return
    }else if(password === ""){
      setAlertType("alert-danger")
      setResponseStyle({display:"block"})
      setResponse("please enter password")
      setPasswordValidity(false)
      return
    }





    // JSON data to be sent
    const jsonData = {
      "Name": nameText,
      "Email": email,
      "Password": password,
    };

    try {
      const res = await fetch("http://localhost:9000/signup", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Ensures the data is sent as JSON
        },
        body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
      });

      const result = await res.json();
      const status = res.status;

      if(status === 200){
        setAlertType("alert-success")
        setResponse("OTP sent to your email.")
        setEmailValidity(true)
        setResponseStyle({display:"block"})
        setTypeOtp(true)
        // nevigate("/login")
      }
      else{
        setAlertType("alert-danger")
        setResponse(result["error"])
        setEmailValidity(false)
        setResponseStyle({display:"block"})
      }

    } catch (error) {
      setAlertType("alert-danger")
      setResponse("Server is down please try after some time")
      setEmailValidity(true)
      setResponseStyle({display:"block"})
    }
  };

  const handleSubmitOtp = async (event)=>{
    event.preventDefault()
    setOtpValidity(true)
    console.log("otp submitted :",otp)
    // JSON data to be sent
    const jsonData = {
      "otpNumber":otp
    };

    try {
      const res = await fetch("http://localhost:9000/createuser", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Ensures the data is sent as JSON
        },
        body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
      });

      const result = await res.json();
      const status = res.status;

      if(status === 200){
        nevigate("/login")
        setResponse("User created successfully")
        setResponseStyle({display:"block"})
      }
      else{
        setAlertType("alert-danger")
        setResponse("Enter correct otp")
        setOtpValidity(false)
        setResponseStyle({display:"block"})
      }

    } catch (error) {
      setAlertType("alert-danger")
      setResponse("Server is down please try after some time")
      setEmailValidity(true)
      setResponseStyle({display:"block"})
    }
  };



  return (
    <div className="container mt-3">
      <section className=" text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .rounded-t-5 {\n      border-top-left-radius: 0.5rem;\n      border-top-right-radius: 0.5rem;\n    }\n\n    @media (min-width: 992px) {\n      .rounded-tr-lg-0 {\n        border-top-right-radius: 0;\n      }\n\n      .rounded-bl-lg-5 {\n        border-bottom-left-radius: 0.5rem;\n      }\n    }\n  ",
          }}
        />
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              />
            </div>
            <div className="col-lg-8">
              {!typeOtp?
              (
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="input"
                      className={`form-control ${nameValidity?"":"is-invalid"}`}
                      value={nameText}
                      onChange={handleOnChangeName}
                      required
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Name
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="email"
                      className={`form-control ${emailValidity?"":"is-invalid"}`}
                      value={email}
                      onChange={handleOnChangeEmail}
                      required
                    />
                    <label className="form-label" htmlFor="form2Example1 ">
                      Email address
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example2"
                      className={`form-control ${passwordValidity?"":"is-invalid"}`}
                      value={password}
                      onChange={handleOnChangePassword}
                      required
                    />
                    <label className="form-label" htmlFor="form2Example2">
                      Password
                    </label>
                  </div>
                  <div className={`alert ${alertType} mt-3`} role="alert" style={responseStyle}>
                    {response}
                  </div>
                  <button
                    type="submit"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-primary btn-block mb-4 ms-4 w-50"
                  >
                    Sign in
                  </button>
                </form>
              </div>
              )
              :(
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmitOtp}>
                    <div className="input-group mb-3">
                      <input value={otp} onChange={handleOnChangeOtp} type="number" max={999999} className="form-control" placeholder="Enter OTP" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Submit</button>
                    </div>
                  </form>
                  <div className={`alert ${alertType} mt-3`} role="alert" style={responseStyle}>
                    {response}
                  </div>
                </div>
              )
            }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
