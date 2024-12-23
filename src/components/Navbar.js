import React,{useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate(); // To navigate to a different page
  // console.log("hello")

  // Load logged-in user from localStorage if not already set
  useEffect(() => {
    if (props.loggedInUser === null) {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        props.setLoggedInUser(JSON.parse(storedUser));
      }
    }
  }, [props]);

  const handleLogout = async () => {
    try {
      // Make a POST request to the /logout endpoint
      const response = await fetch('http://localhost:9000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication token or cookies here if needed
        },
        // Include credentials (cookies) in the request, if necessary
        credentials: 'include',
      });

      // Check if the logout was successful
      if (response.ok) {
        console.log('Successfully logged out!');
        
        // Optionally, clear any localStorage, cookies, or JWT tokens here

        // Redirect to the login page
        localStorage.removeItem('loggedInUser');
        props.setLoggedInUser({"name":"","email":""})
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={(props.loggedInUser)?"/":"#"}>SocialHive</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {props.loggedInUser && props.loggedInUser["_id"]?(
                <Link className="nav-link active" aria-current="page" to="/chat">Chat</Link>
              ):
              ""}
            </li>
            <li className="nav-item">
              {props.loggedInUser && props.loggedInUser["_id"] ? (
                <Link className="nav-link active" aria-current="page" to={`/profile/${props.loggedInUser["_id"]}/`}>Profile</Link>
              ) : (
                ""
              )}
            </li>

            <li className="nav-item">
              {props.loggedInUser && props.loggedInUser["_id"]?(
                  <Link className="nav-link active" aria-current="page" to="/add-post">Add Post</Link>
                ):
                ""
              }
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              {(!props.loggedInUser)||(props.loggedInUser.name==="")?<Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              :props.loggedInUser.name}
              
            </li>
            <li className="nav-item">
              {(!props.loggedInUser)||(props.loggedInUser.name==="")?<Link className="nav-link active" to="/signup">Sign up</Link>
              :<button className="mx-3 btn btn-outline-dark" onClick={handleLogout}>Logout</button>}
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
