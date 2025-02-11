// import React, { useState , useRef} from "react";
// import "../searchbar/Searchbar.css";
// import { CiLocationOn } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { NavLink,useNavigate  } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import { SearchList } from "./SearchList";
// import { set } from "firebase/database";

// const SearchBar = ({ user ,setUser, setLoader, setSearchLocationCoordinates}) => {
//   const [term, setTerm] = useState("");
//   const [input, setInput] = useState("");

//   const handleChange = (value) => {
//     setInput(value);
//   };

//   const [items, setItems] = useState([]);

//   const searchTimeoutRef = useRef(null);

//   const onChangeRoute = async (e) => {
// 		clearTimeout(searchTimeoutRef.current);

// 		const url = 'https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q';
// 		searchTimeoutRef.current = setTimeout(async () => {
// 			try {
// 				const response = await fetch(`${url}=${encodeURI(e.target.value)}`);
// 				if (!response.ok) {
// 					throw new Error(`HTTP error! Status: ${response.status}`);
// 				}
// 				const responseData = await response.json();
// 				const results = responseData.features.map((ele) => ({
// 					coordinates: ele.geometry.coordinates,
// 					label: ele.properties.display_name
// 				}));
//         console.log(results)
//         setItems(results)
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		}, 500);
// 	};
//   console.log(items)

//   const onFormSubmit = (event) => {
//     event.preventDefault();
//     console.log(term);
//   };

//   const navigate = useNavigate();
//   const logout = async () => {
//     const auth = getAuth();

//     try {
//       await signOut(auth);
//       alert('user signout successfully!')
//       setUser(null);
//       setLoader(false);
//       navigate('/')
      
//     } catch (err) {
//       alert('Error occured in signout')
//     }
      
//   };
// const [showList, setShowList] = useState(true);

//   const handleItem = (item)=> {
//     console.log(item)
//     setSearchLocationCoordinates(item);
//     setShowList(!showList)
//   }

//   return (
//     <>
//       <div className="search">
//         <Link>
//           <img src="./logo.png" style={{ height: "4rem", width: "7rem" }} />
//         </Link>
//         <div className="searchbarInput" style={{display: 'flex', flexDirection: "column",}}>
          
//           <input type="text" placeholder="Search River" value={input} onChange={(e) => {
//             setShowList(true)
//             setItems([]);
//             handleChange(e.target.value);
//             onChangeRoute(e);
//           }}/>
//           <div style={{ backgroundColor: '#eee', }}>

//             {
//              showList && items.length > 0 && items.map((item)=> (<div onClick={()=>handleItem(item)} style={{marginTop: '9px', }}>{item.label}</div>))
//             }
//           </div>
          
    
//         </div>
//         <button type="submit">
//           {user ? (
//             <div type="submit" onClick={logout}>
//               Logout
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               style={{
//                 textDecoration: "none",
//                 color: "black",
//                 fontSize: "17px",
//               }}
//             >
//               Sign In
//             </Link>
//           )}
//         </button>
//       </div>
//     </>
//   );
// };
// export default SearchBar;

import React, { useState, useRef } from "react";
import "../searchbar/Searchbar.css";
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const SearchBar = ({ user, setUser, setLoader, setSearchLocationCoordinates }) => {
  const [term, setTerm] = useState("");
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(true);

  const searchTimeoutRef = useRef(null);

  const handleChange = (value) => {
    setInput(value);
  };

  const onChangeRoute = async (e) => {
    clearTimeout(searchTimeoutRef.current);

    const url = 'https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q';
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`${url}=${encodeURI(e.target.value)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const results = responseData.features.map((ele) => ({
          coordinates: ele.geometry.coordinates,
          label: ele.properties.display_name,
        }));
        setItems(results);
      } catch (error) {
        console.error(error);
      }
    }, 500);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(term);
  };

  const navigate = useNavigate();
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert('User signed out successfully!');
      setUser(null);
      setLoader(false);
      navigate('/');
    } catch (err) {
      alert('Error occurred during signout');
    }
  };

  const handleItem = (item) => {
    setSearchLocationCoordinates(item);
    setShowList(false); // Hide the dropdown after selection
  };

  return (
    <div className="search">
      <Link>
        <img src="./logo.png" style={{ height: "4rem", width: "7rem" }} />
      </Link>
      <div className="searchbarInput">
        <input
          type="text"
          placeholder="Search River"
          value={input}
          onChange={(e) => {
            setShowList(true);
            setItems([]);
            handleChange(e.target.value);
            onChangeRoute(e);
          }}
        />
        <div className="dropdown" style={{ display: showList && items.length > 0 ? "block" : "none" }}>
          {items.map((item) => (
            <div key={item.label} onClick={() => handleItem(item)}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <button>
        {user ? (
          <div onClick={logout}>Logout</div>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "black", fontSize: "17px" }}>
            Sign In
          </Link>
        )}
      </button>
    </div>
  );
};

export default SearchBar;