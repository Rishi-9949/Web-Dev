import './chat.scss';

function Chat(){
    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                <div className="message">
                    <img src="https://shorturl.at/pbHNU" alt="" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="message">
                    <img src="https://shorturl.at/pbHNU" alt="" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="message">
                    <img src="https://shorturl.at/pbHNU" alt="" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="message">
                    <img src="https://shorturl.at/pbHNU" alt="" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src="https://shorturl.at/pbHNU" alt="" />
                        John Doe
                    </div>
                    <span className="close">X</span>
                </div>
                <div className="center">
                    <div className="chatMessage">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="bottom">
                    <textarea></textarea>
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat