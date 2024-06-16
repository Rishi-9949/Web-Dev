import "./Navbar.scss"
import { useState } from "react";
function Navbar() {
    const [open,setOpen] = useState(false)
    return (
        <nav>
            <div className="left">
                <a href="/" className="logo">
                    <img src="/logo.png" alt="" />
                    <span>Book Store</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contact Us</a>
                <a href="/">Stores</a>
            </div>
            <div className="right">
                <a href="/">Sign In</a>
                <div className="btn1">
                    <a href="/">Sign Up</a>
                </div>
                <div className="menuIcon">
                    <img src="public\menu.png" alt=""onClick={() => setOpen((prev) => !prev)}/>
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact Us</a>
                    <a href="/">Stores</a>
                    <a href="/">Sign In</a>
                    <a href="/">Sign Up</a>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;
