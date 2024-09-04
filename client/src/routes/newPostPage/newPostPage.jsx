import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/api/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          author: inputs.author,
          city: inputs.city,
          quantity: parseInt(inputs.quantity),
          book_version: parseInt(inputs.book_version),
          type: inputs.type,
          language: inputs.language,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          condition: inputs.condition,
          other_policy: inputs.other_policy,
          pageNumber: parseInt(inputs.pageNumber),
          isbn: parseInt(inputs.isbn),
          publish_year: parseInt(inputs.publish_year),
          rating: parseInt(inputs.rating),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="author">Author</label>
              <input id="author" name="author" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="quantity">Quantity</label>
              <input min={1} id="quantity" name="quantity" type="number" />
            </div>
            <div className="item">
              <label htmlFor="book_version">Version</label>
              <input
                min={1}
                id="book_version"
                name="book_version"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Language</label>
              <select name="language">
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="punjabi">Punjabi</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Book Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="condition">Condition</label>
              <select name="condition">
                <option value="allowed">New</option>
                <option value="not-allowed">Used</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="other_policy">Other Policy</label>
              <input
                id="other_policy"
                name="other_policy"
                type="text"
                placeholder="Other Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="pageNumber">Number of (pages)</label>
              <input min={0} id="pageNumber" name="pageNumber" type="number" />
            </div>
            <div className="item">
              <label htmlFor="isbn">ISBN</label>
              <input min={0} id="isbn" name="isbn" type="number" />
            </div>
            <div className="item">
              <label htmlFor="publish_year">Publish Year</label>
              <input
                min={0}
                id="publish_year"
                name="publish_year"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="rating"> Rating</label>
              <input min={0} max={10} id="rating" name="rating" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
