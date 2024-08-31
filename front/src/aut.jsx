import './css/aut.css'
import { useRef, useState } from 'react'
import axios from 'axios'

function Aut(){
    const [regForm, setRegForm] = useState(false)
    const MOVE = useRef(null)
    const MOVE_BTN = useRef(null)
    const REG_USERNAME = useRef(null)
    const REG_PASSWORD = useRef(null)
    // const REG_RETYPE_PASSWORD = useRef(null)
    const AUT_USERNAME = useRef(null)
    const AUT_PASSWORD = useRef(null)

    function Move(regForm){
        if(regForm === false){
            MOVE.current.classList.add('move-left')
            MOVE.current.classList.remove('move-right')
            MOVE_BTN.current.textContent = ''
            MOVE_BTN.current.classList.add('move-left-btn')
            MOVE_BTN.current.classList.remove('move-right-btn')
            setTimeout(() => {
                MOVE_BTN.current.textContent = 'Авторизоваться'
            },800)
            setRegForm(true)
        }  
        else{
            MOVE.current.classList.add('move-right')
            MOVE.current.classList.remove('move-left')
            MOVE_BTN.current.textContent = ''
            MOVE_BTN.current.classList.add('move-right-btn')
            MOVE_BTN.current.classList.remove('move-left-btn')
            setTimeout(() => {
                MOVE_BTN.current.textContent = 'Зарегистрироваться'
            },800)
            setRegForm(false)
        }
    }

    function registrationSend(username, password){
        const data_user = {
            username: username.current.value,
            password: password.current.value
        }
        console.log(data_user)
        axios.post('http://localhost:3000/reg', data_user, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                console.log('Response:', response.data)
            })
            .catch(error => {
                console.error('Error:', error.message)
            });
    }

    function autorisationSend(username, password){
        const data_user = {
            username: username.current.value,
            password: password.current.value
        }
        console.log(data_user)
        axios.post('http://localhost:3000/aut', data_user, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                console.log('Response:', response.data)
            })
            .catch(error => {
                console.error('Error:', error.message)
            });
    }

    


    return(
        <div className="aut-main-container">
            <div className="reg-container form-container">
                
                <div className="form">
                    <label className='aut-label'>Авторизация</label>
                    <input ref={AUT_USERNAME} className='aut-inp' type="text" name="username" placeholder='username' />
                    <input ref={AUT_PASSWORD} className='aut-inp' type="password" name="password" placeholder='password' />
                    <button onClick={() => autorisationSend(AUT_USERNAME, AUT_PASSWORD)} className='aut-btn'>Авторизоваться</button>
                </div>
            </div>

            <div className="aut-container form-container">
                <div className="form">
                    <label className='aut-label'>Регистрация</label>
                    <input ref={REG_USERNAME} className='aut-inp' type="text" name="username" placeholder='username' />
                    <input ref={REG_PASSWORD} className='aut-inp' type="password" name="password" placeholder='password' />
                    <input className='aut-inp' type="password" placeholder='retype password' />
                    <button onClick={() => registrationSend(REG_USERNAME, REG_PASSWORD)} className='aut-btn'>Зарегистрироваться</button>
                </div>

                

                <div  ref={MOVE} className='move'>
                    <button ref={MOVE_BTN} onClick={() => Move(regForm)} id='move-aut-btn'>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
}
export default Aut