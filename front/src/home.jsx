import './css/home.css'
import Header from './mods/Header'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import CryptoJs from 'crypto-js';


function Home(){
    const [balance, setBalance] = useState(null)
    const balance_el = useRef(null)
    const add_transaction_el = useRef(null)
    
    useEffect(() => {
        const local_storage = localStorage.getItem('aut_data')
        const userDataArray = local_storage.split('~~');
        const key = '1IChqk%$1l0HQPfU0qQl1phgm#Ssq94H';
        const balanceDecrypt = CryptoJs.AES.decrypt(userDataArray[2], key).toString(CryptoJs.enc.Utf8);
        setBalance(balanceDecrypt)
    }, [])

    function AddTransaction(){
        location.href = '/add_tr'
    }

    
    return(
        <div className="home-main-container">
            <Header/>
            <div className="container">
                <div ref={balance_el} className="balance">Ваш баланс: {balance}</div>
                <div ref={add_transaction_el} className="add-transaction">
                    <button onClick={AddTransaction} className='add-transaction-btn'>Добавить транзакцию</button>
                </div>
            </div>
        </div>
    )
}
export default Home