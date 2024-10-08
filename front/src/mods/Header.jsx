import './../css/header.css';
import CryptoJs from 'crypto-js';
import { useState, useEffect } from 'react';

export default function Header() {
    const [name, setName] = useState('');

    useEffect(() => {
        const userDataEncrypt = localStorage.getItem('aut_data');
        if (userDataEncrypt) {
            try {
                const userDataArray = userDataEncrypt.split('~~');
                const key = '1IChqk%$1l0HQPfU0qQl1phgm#Ssq94H';
                const nameDecrypt = CryptoJs.AES.decrypt(userDataArray[0], key).toString(CryptoJs.enc.Utf8);
                setName(nameDecrypt);
            } catch (error) {
                console.error('Ошибка при расшифровке данных:', error);
            }
        } else {
            console.warn('Данные в localStorage отсутствуют');
        }
    }, []);

    return (
        <header className='main-header'>
            <div className="user-account">{name}</div>
            <a className='header-link' href="">Главная</a>
            <a className='header-link' href="">Карты</a>
            <a className='header-link' href="">Транзакции</a>
        </header>
    );
}