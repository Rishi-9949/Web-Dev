import { Link } from "react-router-dom";
import "./card.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/api/login");
      return;
    }

    setSaved((prev) => !prev);

    try {
      await apiRequest.post("/api/users/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev); // Revert state if the request fails
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} Quantity</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} Version</span>
            </div>
          </div>
          <div className="icons">
            <div 
              className="icon" 
              onClick={handleSave}
              style={{
                cursor: 'pointer',
                backgroundColor: saved ? "#fece51" : "transparent",
                padding: '5px', // Optional: Add padding for better clickability
                borderRadius: '5px' // Optional: Add rounded corners if needed
              }}
            >
              <img 
                src="/save.png" 
                alt="" 
                style={{
                  backgroundColor: saved ? "#fece51" : "white",
                }}
              />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
