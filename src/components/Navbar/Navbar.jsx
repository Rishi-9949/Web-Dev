import "./Navbar.scss"
function Navbar() {
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
            </div>
        </nav>
    );
}


export default Navbar;
