import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { api } from '../../http';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const handleLogin = async () => {
        api.post('login', { email, password })
            .then((response) => {

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

    return (
        <div className="header">
            <div className="row">
                <div className="topbar ps-4 d-flex align-items-center" id="barra">
                    <div className="col-6">
                        <a className="navbar-brand text-center" href="#" id="logo-icon">
                            <FontAwesomeIcon icon="fa-solid fa-earth-africa" />
                            <i className="fa-solid fa-earth-africa"></i>
                            <span>Chat App</span>
                        </a>
                    </div>
                    <div class="col-6 d-inline-flex p-1 offset-md-4" id="search">
                        <div class="col-lg-4" id="user-login">
                            <button class="btn btn-warning btn-lg" onClick={handleShow}>
                                Login
                            </button>
                            <button class="btn btn-primary btn-lg" onClick={handleSignupShow}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <div class="presentation">
                            <div class="presentation-text text-center">
                                Que fazer parte do melhor serviço de chat do brasil?
                                Cadastre-se agora e descubra pessoas ao redor do mundo!
                            </div>
                            <div class="text-center" id="email">
                                <button class="btn btn-primary" type="button"
                                    onClick={handleSignupShow}>Sign up
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
                    <Modal.Title>Faça seu cadastro agora!</Modal.Title>
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
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
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