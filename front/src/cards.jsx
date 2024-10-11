import Header from "./mods/Header";
import './css/cards.css';

export default function Cards() {
    const card_arr = []

    function AddCard(){
        location.href = '/add_card'
    }

    return (
        <div className="home-main-container">
            <Header />
            <div className="container container-card">
                {card_arr.length > 0 ? (
                    card_arr.map((card, index) => (
                        <div key={index} className="card-main-container">
                            {card}
                        </div>
                        
                    ))
                ) : (
                    <div className="empty-card-container">
                        <label className="no-cards">Нет доступных карт</label>
                        
                    </div>
                )}
                <button onClick={AddCard} className="add-card-btn">Добавить карту</button>
            </div>
        </div>
    );
}