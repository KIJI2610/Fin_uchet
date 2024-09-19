import './css/home.css'
import Header from './mods/Header'
import axios from 'axios'
import { useState } from 'react';
function Home(){
    const [balance, setBalance] = useState(null)
    
    ;(function(){
        const local_storage = localStorage.getItem('aut_data')
        const local_storage_arr = local_storage.split('~~')
        
    })()
    
    return(
        <div className="home-main-container">
            <Header/>
            <div className="container">
                <div className="balance">Ваш баланс: </div>
                <div className="recent-transaction"></div>
            </div>
        </div>
    )
}
export default Home