import { useEffect, useState, useContext } from 'react';
import { api } from '../../http';
import { useAuth } from '../../context/context';
import { PresentationCard } from '../../components/presentationCard';

import userPlaceholder from '../../assets/userplaceholder.png';

import './style.css';
import { ChatBox } from '../../components/chatBox';

const Home = () => {
    const [loggedUser, setLoggedUser] = useState({});
    const [userList, setUserList] = useState([]);
    const [messageReceived, setMessageReceived] = useState([]);
    const [messageSent, setMessageSent] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const context = useAuth();

    const getSentMessages = async () => {
        api.get('messages/sent').then((response) => {
            setUserList(response.data);
        })
    }

    const getReceivedMessages = async () => {
        api.get('messages/received').then((response) => {
            setUserList(response.data);
        })
    }

    const getPlataformUsers = async () => {
        api.get('user').then((response) => {
            setUserList(response.data);
            setSelectedUser(response.data[0])
        })
        
    }

    useEffect(() => {
        getSentMessages();
        getReceivedMessages();
        getPlataformUsers();

        const fetchData = async () => {
            let [user] = await context.getLoggedUser();
            setLoggedUser(user);
        }

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="col col-lg-4 col-12 d-none d-lg-block">
                <div className="col " id="config-messages">
                    <div className="row sidebar ps-4 pb-3 pt-3 pe-3 d-flex align-items-center" id="user-config">
                        <div className="text-center col-2">
                            <img src={userPlaceholder} className="img-fluid" id="user-logo" />
                        </div>
                        <div className="col-6 text-start">
                            <span className="blue-text">{loggedUser.name}</span>
                        </div>
                        <div className="col-2 text-center">
                            <i className="fa-solid fa-comment-dots"></i>
                        </div>
                        <div className="col-2 text-center">
                            <i className="fa-solid fa-gear"></i>
                        </div>
                    </div>

                    <div className="text-center ps-3 pb-2 pt-2 pe-2 border-bottom border-dark" id="search">
                        <form className="d-flex" role="search">
                            <input className="form-control border-0 " type="search" placeholder="Pesquisar..."
                                aria-label="Search" />
                        </form>
                    </div>
                </div>

                {userList.map((user, key) => {
                    return <PresentationCard key={`user${key}`} user={user} />
                })}

                <div id="chats"></div>
            </div>

            <div className="col-lg-8 col-md-12" id="chat">
                <ChatBox messages={{}} user={selectedUser} />
            </div>
        </div>
    )
}

export { Home }