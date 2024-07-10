import { useState } from "react"
import "./SearchBar.scss"

const types = ["buy","rent"];

function SearchBar() {
  const[query,setQuery] = useState({
    type:"buy",
    Location:"",
    minPrice:0,
    maxPrice:0,
  });

  const switchType = (val) => {
    setQuery((prev)=>({...prev,type:val}));
  };

  return ( 
  <div className='SearchBar'>
    <div className="type">
      {types.map((type) => (
        <button key={type} onClick={()=> switchType(type)} className={query.type === type ? "active" : "" }>
          {type}
        </button>
      ))}
    </div>
    <form>
      <input type="text" name="location" placeholder="City Location"/>
      <input type="text" name="minPrice" min={0} max={1000} placeholder="Min Price"/>
      <input type="text" name="maxPrice" min={0} max={1000} placeholder="Max Price"/>
      <button>
        <img src="search.png"/>
      </button>
    </form>
  </div>
  ) 
}

export default SearchBar
