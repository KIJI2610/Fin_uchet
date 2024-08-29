import './css/aut.css'
import { useRef } from 'react'
function Aut(){
    const MOVE = useRef(null)

    function Move(event){

    }

    return(
        <div className="aut-main-container">
            <div className="reg-container form-container">
                
                <div className="form">
                    <label className='aut-label'>Авторизация</label>
                    <input className='aut-inp' type="text" name="username" placeholder='username' />
                    <input className='aut-inp' type="password" name="password" placeholder='password' />
                    <button className='aut-btn'>Войти</button>
                </div>
            </div>

            <div className="aut-container form-container">
                <div className="form">
                    <label className='aut-label'>Регистрация</label>
                    <input className='aut-inp' type="text" name="username" placeholder='username' />
                    <input className='aut-inp' type="password" name="password" placeholder='password' />
                    <button className='aut-btn'>Зарегистрироваться</button>
                </div>

                

                <div className='move'>
                    <button ref={MOVE} id='move-aut-btn'>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
}
export default Aut