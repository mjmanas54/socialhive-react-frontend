import React, {useState}from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [emailValidity,setEmailValidity] = useState(true)
  const [passwordValidity,setPasswordValidity] = useState(true)
  const [responseStyle,setResponseStyle] = useState({display:"none"})
  const [response,setResponse] = useState("")
  const [alertType,setAlertType] = useState("")
  const navigate = useNavigate();

  const handleOnChangeEmail = (event)=>setEmail(event.target.value)
  const handleOnChangePassword = (event)=>setPassword(event.target.value)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailValidity(true)
    setPasswordValidity(true)
    if(email === ""){
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

    setEmailValidity(true)
    setPasswordValidity(true)

    // JSON data to be sent
    const jsonData = {
      "Email": email,
      "Password": password,
    };

    try {
      const res = await fetch("http://localhost:9000/login", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Ensures the data is sent as JSON
        },
        credentials: "include",
        body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
      });

      const result = await res.json();
      const status = res.status;

      if(status === 200){
        setAlertType("alert-success")
        setResponse("Logged in successfully.")
        setEmailValidity(true)
        setPasswordValidity(true)
        setResponseStyle({display:"block"})
        props.setLoggedInUser({"name":result.data.name,"email":result.data.email})
        console.log(result.data)
        localStorage.setItem('loggedInUser', JSON.stringify({"_id":result.data._id,"name":result.data.name,"email":result.data.email}));
        navigate("/")
      }
      else{
        setAlertType("alert-danger")
        
        if (result["error"] === "user does not exists"){
          setEmailValidity(false)
          setResponse("please enter correct email id")
        }
        else if(result["error"] === "invalid password"){
          setPasswordValidity(false)
          setResponse("please enter correct password")
        }else{
          setEmailValidity(false)
          setPasswordValidity(false)
          setResponse(result["error"])
        }
        setResponseStyle({display:"block"})
      }
    } catch (error) {
      setAlertType("alert-danger")
      setResponse("Server is down please try after some time")
      setEmailValidity(true)
      setPasswordValidity(true)
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
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example1"
                      className={`form-control ${emailValidity?"":"is-invalid"}`}
                      onChange={handleOnChangeEmail}
                      required
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Email address
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example2"
                      className={`form-control ${passwordValidity?"":"is-invalid"}`}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
