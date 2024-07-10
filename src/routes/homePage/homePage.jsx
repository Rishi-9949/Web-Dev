import SearchBar from "../../components/searchBar/SearchBar"
import "./homePage.scss"

function HomePage() {
  return ( 
  <div className='homePage'>
    <div className="textContainer">
      <div className="wrapper">
        	<h1 className="tittle" >
            Browse Your Favourite Books
            </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam voluptates, consectetur, eum itaque repellendus vel deleniti reiciendis non sit tempore aut optio, rem exercitationem veniam!</p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>+16</h1>
                <h2>Years of Expericne</h2>
              </div>
              <div className="box">
                <h1>+200</h1>
                <h2>Award Gianed</h2>
              </div>
              <div className="box">
                <h1>+1200</h1>
                <h2>Books Sold</h2>
              </div>
            </div>
      </div>
    </div>
    <div className="imgContainer">
      <img src="/bg.png" alt="" />
    </div>
  </div>
  )
}

export default HomePage
