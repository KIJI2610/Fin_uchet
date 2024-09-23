import './css/aut.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'

function Aut(){
    const [regForm, setRegForm] = useState(false)
    const MOVE = useRef(null)
    const MOVE_BTN = useRef(null)
    const REG_USERNAME = useRef(null)
    const REG_PASSWORD = useRef(null)
    const REG_PASSWORD_RETYPE = useRef(null)
    const AUT_USERNAME = useRef(null)
    const AUT_PASSWORD = useRef(null)
    const ERROR_WINDOW = useRef(null)
    const SAVE_PASS = useRef(null)
    const [response_error, set_response_error] = useState('')
    const [ShowPassword, set_ShowPassword] = useState(false)

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

    //Регистрация
    function registrationSend(username, password, retype_password){
        axios.get('http://localhost:3000/key')
            .then(KEY_response => KEY_response.data)
            .then(KEY => {
                const name = username.current.value
                const pass = password.current.value
                const pass_encrypt = CryptoJS.AES.encrypt(pass, String(KEY)).toString()
                const data_user = {
                    username: name,
                    password: pass_encrypt
                }
                if(password.current.value === retype_password.current.value){
                    console.log(data_user)
                    axios.post('http://localhost:3000/reg', data_user, {headers: {'Content-Type': 'application/json'}})
                        .then(response => {
                            console.log('Response:', response.data)
                            if(response.data === 'registration_was_successful'){
                                const name_encrypt = CryptoJS.AES.encrypt(name, String(KEY)).toString()
                                const balance_encrypt = CryptoJS.AES.encrypt('0', String(KEY)).toString()
                                const aut_data = name_encrypt + '~~' + pass_encrypt + '~~' + balance_encrypt
                                localStorage.setItem('aut_data', aut_data)
                                setTimeout(() => {
                                    window.location.href = '/'
                                },300)
                            }
                            else{
                                Show(ERROR_WINDOW)
                                set_response_error(response.data)
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error.message)
                        });

                }
                else{
                    Show(ERROR_WINDOW)
                    set_response_error('Пароли не совпадают')
                }
                    })
                .catch(error => {
                    console.error('Error key:', error.message)
                })
                
    }

    //Авторизация
    function autorisationSend(username, password){
        const name = username.current.value
        const pass = password.current.value
        const data_user = {
            username: name,
            password: pass
        }
        console.log(data_user)
        axios.post('http://localhost:3000/aut', data_user, {headers: {'Content-Type': 'application/json'}})

            .then(response => {
                console.log('Response:', response.data)
                if(response.data[0] === 'Авторизация прошла успешно'){
                    axios.get('http://localhost:3000/key')
                        .then(KEY_response => KEY_response.data)
                        .then(KEY => {
                            const name_encrypt = CryptoJS.AES.encrypt(name, String(KEY)).toString()
                            const pass_encrypt = CryptoJS.AES.encrypt(pass, String(KEY)).toString()
                            const balance_encrypt = CryptoJS.AES.encrypt(String(response.data[1]), String(KEY)).toString()
                            const aut_data_encrypt = name_encrypt + '~~' + pass_encrypt + '~~' + balance_encrypt
                            localStorage.setItem('aut_data', aut_data_encrypt)
                            setTimeout(() => {
                                window.location.href = '/'
                            },1000)
                        })
                }
                else{
                    Show(ERROR_WINDOW)
                    set_response_error(response.data)
                }
            })
    }

    function Show(element){
        element.current.style.opacity = 100
        setTimeout(() => {
            element.current.style.opacity = 0
        },4000)
    }

    function GeneratePassword(){
        const compulsory_chars = ['@', '#', '$', '&', '?'];
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';

        function generatePassword(length = 15) {
            // Убедимся, что в пароле есть обязательные символы
            const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
            
            let password = [];
            
            // Добавляем по одному обязательному символу
            password.push(getRandomElement(compulsory_chars));
            password.push(getRandomElement(lowercaseLetters));
            password.push(getRandomElement(uppercaseLetters));
            
            // Заполняем оставшуюся длину пароля случайными символами
            const allChars = compulsory_chars.concat(lowercaseLetters.split(''), uppercaseLetters.split(''), numbers.split(''));
            
            for (let i = password.length; i < length; i++) {
              password.push(getRandomElement(allChars));
            }
        
            // Перемешиваем массив для случайного порядка
            password = password.sort(() => Math.random() - 0.5);
            SAVE_PASS.current.id = 'save-pass-active'

            return password.join('');
        }
        set_ShowPassword(true)
        const newPassword = generatePassword();
        REG_PASSWORD.current.value = newPassword
        REG_PASSWORD_RETYPE.current.value = newPassword
        

    }

    function HiddenPassword(){
        set_ShowPassword(false)
    }

    const DownloadButton = () => {
        const handleDownload = () => {
          const text = `${REG_PASSWORD.current.value}`;
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
      
          const link = document.createElement('a');
          link.href = url;
          link.download = 'password.txt';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      
          // Освобождаем URL после скачивания
          URL.revokeObjectURL(url);
        };
        handleDownload()
    }

    return(
    <div className="aut-double-main-container">
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
                    <input ref={REG_PASSWORD} onInput={HiddenPassword} className='aut-inp' type={ShowPassword ? 'text':'password'} name="password" placeholder='password' />
                    <input ref={REG_PASSWORD_RETYPE} className='aut-inp' type={ShowPassword ? 'text':'password'} placeholder='retype password' />
                    <button onClick={() => registrationSend(REG_USERNAME, REG_PASSWORD, REG_PASSWORD_RETYPE)} className='aut-btn'>Зарегистрироваться</button>
                    <button title='Сгенерировать пароль' onClick={GeneratePassword} className='auto-pass'>A</button>
                    <button title='Сохранить пароль' ref={SAVE_PASS} onClick={DownloadButton} className='save-pass'>S</button>
                </div>

                <div  ref={MOVE} className='move'>
                    <button ref={MOVE_BTN} onClick={() => Move(regForm)} id='move-aut-btn'>Зарегистрироваться</button>
                </div>
            </div>
        </div>
        <div ref={ERROR_WINDOW} className="error-window">
            {response_error}
        </div>
        
    </div>
        
    )
}
export default Aut