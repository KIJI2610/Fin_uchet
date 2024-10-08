import './css/TrWindow.css';
import axios from 'axios';
import { useState, useRef } from 'react';
import Header from './mods/Header';

export default function TrWindow(){
    const SUM = useRef(null)
    const CURRENCY = useRef(null)
    const INCOME = useRef(null)
    const EXPENDITURE = useRef(null)
    const CATEGORY = useRef(null)
    const IMPORTANCE = useRef(null)
    const DATE_TR = useRef(null)
    const COMMENT = useRef(null)
    const CARDS = useRef(null)

    const [selectedValue, setSelectedValue] = useState('')
    const optionsDataCard = [
        { value: '1', text: 'Card 1' },
        { value: '2', text: 'Card 2' },
        { value: '3', text: 'Card 3' },
        { value: '4', text: 'Card 4' },
    ]
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    function PushDataTransaction(){
        const sum = SUM.current.value
        const currency = CURRENCY.current.value
        const type_oper_arr = [INCOME.current, EXPENDITURE.current]
        let type_oper = null
        const categoru = CATEGORY.current.value
        const importance = IMPORTANCE.current.value
        const date_tr = DATE_TR.current.value
        const comment = COMMENT.current.value
        const cards = CARDS.current.value

        for(let i = 0; i < type_oper_arr.length; i++){
            if(type_oper_arr[i].checked){
                type_oper = type_oper_arr[i].value
            }
        }

        const data = {
            sum: sum,
            currency: currency,
            typeOperation: type_oper,
            categoru: categoru,
            importance: importance,
            date_tr: date_tr,
            comment: comment,
            cards: cards
        }
        console.log(data)

        axios.post('http://localhost:3000/transaction/', data, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(`Error code: ${err}`)
            })
    }

    function return_home(){
        location.href = '/'
    }

    return(
        <div className='home-main-container'>
        <Header/>
        <div className="add-transaction-window">
            <div className="window-el-header"><label onClick={return_home} className='window-el-header-label'>Назад</label></div>
            <div className='sum'>
                <input ref={SUM} placeholder='Введите сумму транзакции' className='sum-inp' type="number" name="" id="" />
                <select ref={CURRENCY}  className='sum-inp-select' name="" id="">
                    <option value="rouble">&#8381;</option>
                    <option value="euro">&#8364;</option>
                    <option value="dollar">$</option>
                </select>
            </div>
            <div className="type-operation">
                <div className='operation-checkbox income'><input className='checkbox-operation' ref={INCOME} type="radio" name="option" value={"Income"}/> Доход</div>
                <div className='operation-checkbox expense'><input className='checkbox-operation' ref={EXPENDITURE} type="radio" name="option" value={"expenditure"}/> Расход</div>
            </div>
            <div className="category">
            <input ref={CATEGORY} placeholder='Выберите категорию или введите новую' className='category-input' type="text" list="options" />
                <datalist className='dropdown-content' id="options">
                  <option className='content-option' value={'test'} />
                </datalist>
            </div>
            <div className="importance">
                <select ref={IMPORTANCE} className='importance-list'>
                    <option className='importance-list' value="low">Низкая значимость</option>
                    <option className='importance-list' value="middle">Средняя значимость</option>
                    <option className='importance-list' value="top">Высокая значимость</option>
                </select>
            </div>
            <div className="date">
                <input ref={DATE_TR} type="date" />
            </div>
            <div className="comment">
                <textarea ref={COMMENT} className='comment-input' type="text" placeholder='Комментарий' />
            </div>
            <div className="card-transaction">
                <select ref={CARDS} className='card-transaction-select' value={selectedValue} onChange={handleChange}>
                    {optionsDataCard.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
            <div className="submit-transaction-container">
                <button onClick={PushDataTransaction} className='submit-transaction'>Добавить транзакцию</button>
            </div>
            
        </div>
        </div>
    )
}