import './filter.scss'

function Filter(){
    return (
        <div className="filter">
            <h1>Search results for <b>London</b></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input type="text" id="city" name="city" placeholder="City Location" />
                </div>
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        <option value="">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="language">Language</label>
                    <select name="language" id="language">
                        <option value="">any</option>
                        <option value="english">English</option>
                        <option value="punjabi">Punjabi</option>
                        <option value="hindi">Hindi</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input type="number" id="minPrice" name="minPrice" placeholder="any" />
                </div>
                <div className="item">
                <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" id="maxPrice" name="maxPrice" placeholder="any" />
                </div>
                <div className="item">
                <label htmlFor="quantity">Quantity</label>
                <select name="quantity" id="quantity">
                    <option value="">any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                </div>
                <button>
                    <img src="/search.png" alt="" />
                </button>
            </div>
        </div>  
    )
}
export default Filter 
