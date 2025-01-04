import React,{useState,useEffect} from 'react'
import FriendInfo from './FriendInfo'
import { useNavigate } from 'react-router-dom';

const Friendsbox = (props) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Define the fetch function
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9000/users",{
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          // Handle unauthorized response
          // console.log('Unauthorized! Redirecting to login...');
          // Redirect the user to the login page
          navigate("/login")
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const result = await response.json(); // Parse JSON response
        setUsers(result.data); // Update state
        props.setFilteredUsers(result.data);
        
      } catch (error) {
        navigate("/login")
        return
      }
    };

    fetchUsers(); // Call the fetch function
  }, []);

  const handleOnChange = (event)=>{
    const currentText = event.target.value;
    setSearchText(currentText);

    const newFilteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(currentText)
    );

    props.setFilteredUsers(newFilteredUsers);
  }



  return (
    <div className="container friends-box">
        <div className="input-group flex-nowrap my-2">
            <span className="input-group-text" id="addon-wrapping">
            <i className="fa fa-search"></i>
            </span>
            <input value={searchText} onChange={handleOnChange} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <div className="container friend-list hidden-scrollbar">
            {props.filteredUsers.map((user)=>(
              (props.loggedInUser.email !== user.email)?
              <FriendInfo key={user._id} user={user} setSelectedUser={props.setSelectedUser} selectedUser={props.selectedUser} isActive={props.isActive} setIsActive={props.setIsActive}/>
              :
              null
            ))}
        </div>
    </div>
  )
}

export default Friendsbox
