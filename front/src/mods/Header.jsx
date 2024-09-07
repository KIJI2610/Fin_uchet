import './../css/header.css'

export default function Header(){
    return(
        <header className='main-header'>
            <div className="user-account">Username</div>
            <a className='header-link' href="">Главная</a>
            <a className='header-link' href="">Кредитные карты</a>
            <a className='header-link' href="">Транзакции</a>
        </header>
    )
}