import './singlePage.scss'
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/map";
import { singlePostData, userData } from "../../lib/dummydata";

function SinglePage(){
    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={singlePostData.images}/>
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{singlePostData.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{singlePostData.address}</span>
                                </div>
                                <div className="price">{singlePostData.price}</div>
                            </div>
                            <div className="user">  
                                <img src={userData.img} alt="" />
                                <span>{userData.name}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            {singlePostData.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featuresText">
                                <span>Utilities</span>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featuresText">
                                <span>pet</span>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featuresText">
                                <span>properties</span>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                    <div className="size">
                            <img src="/size.png" alt="" />
                            <span>80sqt</span>
                        </div>

                        <div className="size">
                            <img src="/target_audience.png" alt="" />
                            <span>Adult</span>
                        </div>

                        <div className="size">
                            <img src="/language.png" alt="" />
                            <span>English</span>
                        </div>
                    </div>

                    <p className="title">Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/language.png" alt="" />
                            <div className="featureText">
                                <span>English</span>
                                <p>200m away</p>
                            </div>
                        </div>

                        <div className="feature">
                            <img src="/language.png" alt="" />
                            <div className="featureText">
                                <span>English</span>
                                <p>200m away</p>
                            </div>
                        </div>

                        <div className="feature">
                            <img src="/language.png" alt="" />
                            <div className="featureText">
                                <span>English</span>
                                <p>200m away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[singlePostData]} />
                    </div>

                    <div className="buttons">
                        <button>
                            <img src="./chat.png" alt="" />
                            Send A Message
                        </button>
                        <button>
                            <img src="./save.png" alt="" />
                            Save The Place
                        </button>
                    </div>

                </div>
            </div>
        </div>  
    );    
}
export default SinglePage 

