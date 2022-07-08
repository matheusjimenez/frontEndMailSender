import { useState } from 'react';
import { Button, InputGroup, Input } from 'reactstrap';
import userPlaceholder from '../../assets/userplaceholder.png';


const ChatBox = ({ user, messages = [], sendMessage }) => {
    const [message, setMessage] = useState();

    return (
        <>
            <div className="row topbar overflow-hidden position-fixed w-100 d-flex flex-column">
                <div className="p-3 d-flex align-items-center">
                    <div className="text-start col-1">
                        <img src={user.profilePicture?? userPlaceholder} className="img-fluid" id="user-logo-chat" />
                    </div>
                    <div className="col-8 text-start">
                        <span className="blue-text">{user.name}</span>
                    </div>
                </div>
                <div className='chatBody w-100' style={{ backgroundColor: '#333' }}>
                    {messages.map((message) => {
                        if (message.sender_identifier === user.id)
                            return (
                                <div className='row'>
                                    <div className='col text-white bg-secondary'>
                                        <p>{user.name}:</p>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            )
                        else
                            return (
                                <div className='row d-flex'>
                                    <div className='col text-white bg-primary'>
                                        <p className=''>You:</p>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            )
                    })}
                </div>
                <div className='card-footer'>
                    <InputGroup>
                        <input onChange={(event)=>{setMessage(event.target.value)}} type='text' placeholder='Digite sua mensagem'/>
                        <Button onClick={()=>sendMessage(message)}>Enviar</Button>
                    </InputGroup>
                </div>
            </div>
        </>
    )
}

export { ChatBox };