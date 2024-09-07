import './css/home.css'
import Header from './mods/Header'
import axios from 'axios'
function Home(){
    let balance = 0
    ;(function (){
        axios('http://localhost:3000')
    }
    )()
    
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