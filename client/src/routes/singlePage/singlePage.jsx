import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/api/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/api/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const startNewChat = async () => {
    const receiverId = post.userId; // Use post.userId instead of post.user.id
  
    if (!receiverId) {
      console.error("Error: Receiver ID is missing! Post data:", post);
      return; // Prevent further execution if receiverId is not available
    }
  
    console.log("Starting new chat with receiverId:", receiverId);
  
    try {
      // Send a request to create a new chat with the receiver's ID
      const res = await apiRequest.post("/api/chats", { receiverId });
  
      // Check if the chat was successfully created
      if (res.status === 201) {
        const chatId = res.data.id;
        console.log("New chat created with ID:", chatId);
  
        // Send an initial message in the new chat    
        const messageRes = await apiRequest.post(`/api/messages/${chatId}`, { text: "Hello! I am interested in your post." });
  
        // Check if the message was sent successfully
        if (messageRes.status === 200) {
          console.log("Message sent successfully");
          // Navigate to the chat page
          navigate(`/api/chats`);
        } else {
          console.error("Failed to send the initial message:", messageRes.status);
          throw new Error("Failed to send the initial message");
        }
      } else {
        console.error("Failed to create chat, unexpected status:", res.status);
        throw new Error("Failed to create chat");
      }
    } catch (err) {
      // Log errors clearly to understand any potential issues
      console.error("Error creating chat:", err.response ? err.response.data : err.message);
    }
  };
  
  
  
  

  
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span> Book Policy </span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Condition</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>New</p>
                ) : (
                  <p>Used</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Other Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">About The Book</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} pages</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} Quanity</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} Version</span>
            </div>
          </div>
          <p className="title">Other Info</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>ISBN</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + " "}{" "}
                  
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Publish year</span>
                <p>{post.postDetail.bus} </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Weight</span>
                <p>{post.postDetail.restaurant} grams</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
          <button onClick={startNewChat}>
            <img src="/chat.png" alt="" />
            Send a Message
          </button>

          <button
            onClick={handleSave}
            style={{
              backgroundColor: saved ? "#fece51" : "white",
            }}
          >
            <img src="/save.png" alt="" />
            {saved ? "Place Saved" : "Save the Place"}
          </button>
        </div>
      </div>
        </div>
    </div>
  );
}

export default SinglePage;
