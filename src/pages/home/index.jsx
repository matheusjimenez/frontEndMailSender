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
    const [selectedUserMessages, setSelectedUserMessages] = useState([]);
    const context = useAuth();

    const handleSendMessage = (message) =>{

    }

    const getSentMessages = async () => {
        api.get('messages/sent').then((response) => {
            setMessageSent(response.data);
        })
    }

    const getReceivedMessages = async () => {
        api.get('messages/received').then((response) => {
            setMessageReceived(response.data);
        })
    }

    const getPlataformUsers = async () => {
        api.get('user').then((response) => {
            let filteredResponse = response.data.filter((value)=> value.id !== loggedUser.id);
            debugger;
            setUserList(filteredResponse);
            setSelectedUser(response.data[0])
        })
    }

    const handleContactClick = (contactId) => {
        let [user] = userList.filter(x => x.id === contactId);
        setSelectedUser(user);
    }

    const combineSentAndReceivedMessageWithOrdenation = (contactId) => {
        let received = messageReceived.filter((value) =>
        (
            value.receiver_identifier === contactId || value.sender_identifier === contactId
        ));

        let sent = messageSent.filter((value) =>
        (
            value.receiver_identifier === contactId || value.sender_identifier === contactId
        ));

        let concatArrays = received.concat(sent);

        concatArrays.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setSelectedUserMessages(concatArrays);
    }

    useEffect(() => {
        combineSentAndReceivedMessageWithOrdenation(selectedUser.id);
    }, [selectedUser]);

    useEffect(() => {
        const fetchData = async () => {
            let [user] = await context.getLoggedUser();
            setLoggedUser(user);
        }

        fetchData();
    }, []);

    useEffect(()=>{
        getSentMessages();
        getReceivedMessages();
        getPlataformUsers();
    }, [loggedUser])

    return (
        <div className="row">
            <div className="col col-lg-4 col-12 d-none d-lg-block">
                <div className="col " id="config-messages">
                    <div className="row sidebar ps-4 pb-3 pt-3 pe-3 d-flex align-items-center" id="user-config">
                        <div className="text-center col-2">
                            <img src={loggedUser.profilePicture ??userPlaceholder} className="img-fluid" id="user-logo" />
                        </div>
                        <div className="col-6 text-start">
                            <span className="white-text">Bem vindo, {loggedUser.name}!</span>
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
                    return <PresentationCard key={`user${key}`} user={user} clickEvent={handleContactClick} />
                })}

                <div id="chats"></div>
            </div>

            <div className="col-lg-8 col-md-12" id="chat">
                <ChatBox messages={selectedUserMessages} user={selectedUser} />
            </div>
        </div>
    )
}

export { Home }