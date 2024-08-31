import './css/home.css'
import Header from './mods/Header'
function Home(){
    
    
    return(
        <div className="home-main-container">
            <Header/>
            <div className="container">
                <div className="balance"></div>
                <div className="cards"></div>
                <div className="transaction"></div>
            </div>
        </div>
    )
}
export default Home