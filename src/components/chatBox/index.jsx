import userPlaceholder from '../../assets/userplaceholder.png';


const ChatBox = ({ user, messages }) => {
    return (
        <>
            <div className="row topbar overflow-hidden position-fixed w-100 d-flex flex-column">
                <div className="p-3 d-flex align-items-center">
                    <div className="text-start col-1">
                        <img src={userPlaceholder} className="img-fluid" id="user-logo-chat" />
                    </div>
                    <div className="col-8 text-start">
                        <span className="blue-text">{user.name}</span>
                    </div>
                    <h2>teste</h2>
                </div>
                <div className='chatBody w-95' style={{ backgroundColor: '#333' }}>
                    <p>teste</p>
                </div>
            </div>
        </>
    )
}

export { ChatBox };