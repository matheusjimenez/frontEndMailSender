import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { api } from '../../http';
import { useNavigate } from 'react-router-dom';

import './style.css';

const Login = () => {
    const [show, setShow] = useState(false);
    const [showSignup, setSignupShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    let navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignupClose = () => setSignupShow(false);
    const handleSignupShow = () => setSignupShow(true);

    const handleTeste = async ()=>{
        api.get('/messages/received').then((response)=>{
            debugger;
            console.log(response);
        })
    }

    const handleLogin = async () => {
        api.post('login', { email, password })
            .then((response) => {
                console.log('context',context);
                if (response.status === 204) {
                    alert('invalid user');
                    return;
                }

                window.localStorage.setItem('userIdentifier', response.data.useridentifier);

                navigate('/home');
                handleClose();

            }).catch((error) => {
                alert(error);
            })
    }

    const handleSignup = async () => {
        api.post('user', { name: userName, password, email, birthDate })
            .then((response) => {
                debugger;
                console.log(response);
                handleSignupClose();
            }).catch((error) => {
                alert(error);
            })
    }

    const handleClickLoginBtn = () => {
        alert('login');
    }

    const handleClickSignUpBtn = () => {
        alert('signup');
    }

    return (
        <div class="header">
            <div class="row">
                <div class="topbar ps-4  d-flex align-items-center" id="barra">
                    <div class="col-6">
                        <a class="navbar-brand text-center" href="#" id="logo-icon">
                            <i class="fa-brands fa-squarespace"></i>
                            <span>Chat App</span>
                        </a>
                    </div>

                    <div class="col-6 d-inline-flex ps-3 pb-2 pt-2 pe-2" id="search">
                        <div class="col-lg-8 col-10 d-none d-lg-block" id="join-groups">
                        </div>

                        <div class="col-lg-4 col-md-12 col-12 sign-in-up ps-lg-3 ps-md-5 text-end" id="user-login">
                            <i class="fa-solid fa-user-astronaut col-lg-1"></i>
                            <button class="login-button ps-3 pe-1" onClick={handleShow}>
                                Login
                            </button>
                            <button class="sign-in-button rounded-pill btn-primary btn-lg" onClick={handleSignupShow}>
                                Sign up
                            </button>
                            <button onClick={handleTeste}>teste</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-12">
                        <div class="presentation">
                            <div class="presentation-text">
                                JUNTE-SE AO NOSSO CHAT APP<br />
                                Serviço de chat perfeito para se comunicar com quem você quiser.
                                O CÉU É O LIMITE!
                            </div>
                            <div class="text-center p-2 col-11 d-flex" id="email">
                                <button class="btn btn-outline-secondary" type="button" id="sign-up-email-submit"
                                    onClick={handleClickSignUpBtn}>Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ENTRE E COMECE JÁ!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='input-group mb-3'>
                            <input onChange={(event) => { setEmail(event.target.value) }} type='email' className='form-control' placeholder='Email'></input>
                        </div>
                        <div className='input-group'>
                            <input onChange={(event) => { setPassword(event.target.value) }} type='password' className='form-control' placeholder='Senha'></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Sair
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Entrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSignup} onHide={handleSignupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>INSCREVA-SE E COMECE JÁ!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='input-group'>
                            <input onChange={(event) => { setUserName(event.target.value) }} type='text' className='form-control' placeholder='Nome'></input>
                        </div>
                        <div className='input-group'>
                            <input onChange={(event) => { setBirthDate(event.target.value) }} type='date' className='form-control' placeholder='Data de Nascimento'></input>
                        </div>
                        <div className='input-group mb-3'>
                            <input onChange={(event) => { setEmail(event.target.value) }} type='email' className='form-control' placeholder='Email'></input>
                        </div>
                        <div className='input-group'>
                            <input onChange={(event) => { setPassword(event.target.value) }} type='password' className='form-control' placeholder='Senha'></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSignup}>
                        Cadastrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export { Login }