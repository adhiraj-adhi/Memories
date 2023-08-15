import {Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setViewForm } from "../../reducers/reducerSlice";

import "./styles.css";

const Header = () => {
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    const user = useSelector(state => state.reducerSlice.user);
    const dispatch = useDispatch();
    const [navbarDesign, setNavBarDesign] = useState(false)
    const [dropDownStyle, setDropDownStyle] = useState({display:"none"})

    let headerDesignOnScroll = navbarDesign ? { backgroundColor: "var(--black-color)" } : {};
    let anchorDesignOnScroll = navbarDesign ? { color: "var(--white-color)" } : {};
    let anchorDesignOnScroll2 = navbarDesign ? { color: "var(--white-color)", border: "1.5px solid var(--white-color)" } : {};

    window.addEventListener("scroll", function () {
        window.scrollY > 0 ? setNavBarDesign(true) : setNavBarDesign(false);
    })

    function showDropDown(){
        setDropDownStyle({display: "block"})
    }
    function hideDropDown(){
        setDropDownStyle({display: "none"})
    }


    return (
        <header className="header" style={headerDesignOnScroll}>
            <div className="logo_container">
                <Link to="/" style={anchorDesignOnScroll}> Reminisces. </Link>
            </div>
            <nav className="navbar">
                <ul className="navbar_list">
                    {user === null && <li className="navbar_listItem">
                        <button className="navbar_btn" style={anchorDesignOnScroll2} onClick={() => dispatch(setViewForm(!viewForm))}> Sign In/ Up </button>
                    </li>}

                    {user!==null && <li className="navbar_listImageItem">
                       <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg" alt="user"
                            className="profile_image" onMouseEnter={showDropDown}/>
                       <ul className="dropdown_menu" style={dropDownStyle} onMouseLeave={hideDropDown}>
                           <li className="dropdown_listItem"><Link to="/profile"> My Profile </Link></li>
                           <li className="dropdown_listItem"><Link to="/" onClick={() => {dispatch(setUser(null)); localStorage.removeItem("memories")}}> Sign Out </Link></li>
                       </ul>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header