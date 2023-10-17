import React, { useState } from "react";

import './styles/app.scss'
import './styles/base.scss'

import logo from './images/Logo.png'
import carBlue from './images/carBlue.png'
import carRed from './images/carRed.png'
import carDark from './images/carDark.png'
import bus from './images/bus.png'
import ship from './images/ship.png'
import moving from './images/moving.png'
import minivan from './images/minivan.png'
import carShip from './images/carShip.png'
import whatsapp from './images/whatsapp.png'
import telegram from './images/telegram.png'
import car2 from './images/car2.png'
import car3 from './images/car3.png'
import arrow from './images/arrow.png'
import { sendOrder, sendQuery } from "./http/botApi";

const classes = [
    {
        class: 'Стандарт',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Комфорт',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Комфорт+',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Бизнес',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Минивэн',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Бус-автобус',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Перегон авто',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Трезвый водитель',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Доставка',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Мини переезд',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
    {
        class: 'Детский',
        cars: ['Lada Vesta, ', 'Lada Largus, ', 'Kia Rio, ', 'Skoda Rapid, ', 'Renault Logan, ', 'Hyundai Solaris'],
        conditions: ['В машине 4 места']
    },
]

function App() {
    const [rateClass, setRateClass] = useState(classes[0])
    const [rateChosen, setRateChosen] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumber2, setPhoneNumber2] = useState('')
    const [sendNumber, setSendNumber] = useState('')
    const [sendNumber2, setSendNumber2] = useState('')
    const [addressFrom, setAddressFrom] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const [name, setName] = useState('')
    const [rateNum, setRateNum] = useState(-1)
    const [sendError, setSendError] = useState(false)
    const [sendSuccess, setSendSuccess] = useState(false)
    const [sendError2, setSendError2] = useState(false)
    const [sendSuccess2, setSendSuccess2] = useState(false)

    const chooseRate = (e) => {
        const rates = document.getElementsByClassName('Rate')
        for (let i of rates) {
            i.classList.remove('Chosen')
        }
        const btn = document.querySelector(`.Btn${e.target.id}`)
        btn.classList.add('Chosen')
        setRateClass(classes[Number(e.target.id) - 1])
        setRateChosen(true)
        setRateNum(Number(e.target.id) - 1)
    }

    const handlePhoneChange = (e) => {
        const formattedNumber = formatPhoneNumber(e)
        const cleaned = ('' + e.target.value).replace(/\D/g, '')
        if (e.target.id === 'num1') {
            setPhoneNumber(formattedNumber)
            setSendNumber('7' + cleaned)
        }
        else {
            setPhoneNumber2(formattedNumber)
            setSendNumber2('7' + cleaned)
        }
    }

    const formatPhoneNumber = (e) => {
        const cleaned = ('' + e.target.value).replace(/\D/g, '')
        if (e.target.id === 'num1') setSendNumber('7' + cleaned)
        else setSendNumber2('7' + cleaned)
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
        let formattedNumber
        switch (cleaned.length) {
            case 10:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
                break
            case 9:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
                break
            case 8:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}-`
                break
            case 7:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}`
                break
            case 6:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-`
                break
            case 5:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}`
                break
            case 4:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}`
                break
            case 3:
                formattedNumber = !match ? '' : `(${match[1]}) `
                break
            case 2:
                formattedNumber = !match ? '' : `(${match[1]}`
                break
            case 1:
                formattedNumber = !match ? '' : `(${match[1]}`
                break
            case 0:
                formattedNumber = !match ? '' : ``
                break

            default:
                break
        }

        return formattedNumber;
    }


    const handleBackspace = (e) => {
        if (e.keyCode === 8 || e.key === 'Backspace') {
            e.preventDefault()
            const cleaned = ('' + e.target.value).replace(/\D/g, '')
            const match = cleaned.split('')
            let formattedNumber
            switch (cleaned.length) {
                case 10:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-${match[6]}${match[7]}-${match[8]}`
                    break
                case 9:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-${match[6]}${match[7]}-`
                    break
                case 8:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-${match[6]}`
                    break
                case 7:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-`
                    break
                case 6:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}`
                    break
                case 5:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}`
                    break
                case 4:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) `
                    break
                case 3:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}`
                    break
                case 2:
                    formattedNumber = !match ? '' :
                        `(${match[0]}`
                    break
                case 1:
                    formattedNumber = !match ? '' : ``
                    break
                case 0:
                    formattedNumber = !match ? '' : ``
                    break

                default:
                    break
            }
            const newCleaned = ('7' + formattedNumber).replace(/\D/g, '')
            if (e.target.id === 'num1') {
                setPhoneNumber(formattedNumber)
                setSendNumber(newCleaned)
            }
            else {
                setPhoneNumber2(formattedNumber)
                setSendNumber2(newCleaned)
            }
        }
    }

    const handleChangeAddressFrom = (e) => {
        setAddressFrom(e.target.value)
    }

    const handleChangeAddressTo = (e) => {
        setAddressTo(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const sendOrderToBot = async () => {
        try {
            if (addressFrom && addressTo && sendNumber.length === 11 && name && rateNum !== -1)
            await sendOrder(addressFrom, addressTo, sendNumber, name, classes[rateNum].class)
            setSendError(false)
            setSendSuccess(true)
        } catch (e) {
            console.log(e)
            setSendError(true)
            setSendSuccess(false)
        }
    }

    const sendNumberToBot = async () => {
        try {
            if (sendNumber2.length === 11)
            await sendQuery(sendNumber2)
            setSendError2(false)
            setSendSuccess2(true)
        } catch (e) {
            console.log(e)
            setSendError2(true)
            setSendSuccess2(false)
        }
    }

    return (
        <div className="App">
            <section className="OrderContainer">
                <img className="Logotype" src={logo} alt="ZAкаZ Вся РОССИЯ VеZёМ" />
                <div className="InputContainer">
                    <span className="InputCircle CircBlue"></span>
                    <input
                        className="InputTo"
                        type="text"
                        value={addressFrom}
                        placeholder="Откуда"
                        onChange={handleChangeAddressFrom}
                    />
                </div>
                <div className="InputContainer">
                    <span className="InputCircle CircRed"></span>
                    <input
                        className="InputTo"
                        type="text"
                        value={addressTo}
                        placeholder="Куда"
                        onChange={handleChangeAddressTo}
                    />
                </div>
                <div className="Rates">
                    <button className="Rate Btn1" onClick={chooseRate} id="1">
                        <img className="RateImg" id="1" src={carBlue} alt="Машина" />
                        <span className="RateName" id="1">Стандарт</span>
                        <span className="RatePrice" id="1">от 99₽</span>
                    </button>
                    <button className="Rate Btn2" onClick={chooseRate} id="2">
                        <img className="RateImg" id="2" src={carBlue} alt="Машина" />
                        <span className="RateName" id="2">Комфорт</span>
                        <span className="RatePrice" id="2">от 99₽</span>
                    </button>
                    <button className="Rate Btn3" onClick={chooseRate} id="3">
                        <img className="RateImg" id="3" src={carRed} alt="Машина" />
                        <span className="RateName" id="3">Комфорт+</span>
                        <span className="RatePrice" id="3">от 99₽</span>
                    </button>
                    <button className="Rate Btn4" onClick={chooseRate} id="4">
                        <img className="RateImg" id="4" src={carDark} alt="Машина" />
                        <span className="RateName" id="4">Бизнес</span>
                        <span className="RatePrice" id="4">от 99₽</span>
                    </button>
                    <button className="Rate Btn5" onClick={chooseRate} id="5">
                        <img className="RateImg" id="5" src={minivan} alt="Машина" />
                        <span className="RateName" id="5">Минивэн</span>
                        <span className="RatePrice" id="5">от 99₽</span>
                    </button>
                    <button className="Rate Btn6" onClick={chooseRate} id="6">
                        <img className="RateImg" id="6" src={bus} alt="Машина" />
                        <span className="RateName" id="6">Бус-автобус</span>
                        <span className="RatePrice" id="6">от 99₽</span>
                    </button>
                    <button className="Rate Btn7" onClick={chooseRate} id="7">
                        <img className="RateImg" id="7" src={carShip} alt="Машина" />
                        <span className="RateName" id="7">Перегон авто</span>
                        <span className="RatePrice" id="7">от 99₽</span>
                    </button>
                    <button className="Rate Btn8" onClick={chooseRate} id="8">
                        <img className="RateImg" id="8" src={carBlue} alt="Машина" />
                        <span className="RateName" id="8">Трезвый водитель</span>
                        <span className="RatePrice" id="8">от 99₽</span>
                    </button>
                    <button className="Rate Btn9" onClick={chooseRate} id="9">
                        <img className="RateImg" id="9" src={ship} alt="Машина" />
                        <span className="RateName" id="9">Доставка</span>
                        <span className="RatePrice" id="9">от 99₽</span>
                    </button>
                    <button className="Rate Btn10" onClick={chooseRate} id="10">
                        <img className="RateImg" id="10" src={moving} alt="Машина" />
                        <span className="RateName" id="10">Мини переезд</span>
                        <span className="RatePrice" id="10">от 99₽</span>
                    </button>
                    <button className="Rate Btn11" onClick={chooseRate} id="11">
                        <img className="RateImg" id="11" src={carBlue} alt="Машина" />
                        <span className="RateName" id="11">Детский</span>
                        <span className="RatePrice" id="11">от 99₽</span>
                    </button>
                </div>
                <div className="ArrowRight">
                    <img src={arrow} alt="Стрелка" />
                </div>
                {rateChosen &&
                    <div className="RateDescription">
                        <span className="RateClass">Тариф "{rateClass.class}"</span>
                        <span className="RateCars">
                            {rateClass.cars.map((car, i) => {
                                return (
                                    <span key={i}>{car}</span>
                                )
                            })}
                        </span>
                        {rateClass.conditions.map((condition, i) => {
                            return (
                                <span key={i} className="RateConditions">{condition}</span>
                            )
                        })}
                    </div>
                }
                <div className="InputContainer">
                    <span className="PreNum">+7&nbsp;</span>
                    <input
                        className="InputNumber"
                        id="num1"
                        type="text"
                        maxLength="15"
                        value={phoneNumber}
                        onChange={(e) => {
                            handlePhoneChange(e)
                        }}
                        onKeyDown={handleBackspace}
                        placeholder="(999) 999-99-99"
                    />
                </div>
                <div className="InputContainerName">
                    <input
                        className="InputName"
                        type="text"
                        value={name}
                        placeholder="Имя"
                        onChange={handleChangeName}
                    />
                </div>
                <button className="OrderTaxi" onClick={sendOrderToBot}>Заказать</button>
                {sendError &&
                    <span className="SendError">Ошибка отправки!</span>
                }
                {sendSuccess &&
                    <span className="SendSuccess">Успешно отправлено!</span>
                }
            </section>
            <div className="CarImage">
                <img className="CarAbsolute1" src={car2} alt="Car" />
                <img className="CarAbsolute2" src={car3} alt="Car" />
            </div>
            <section className="ContactsContainer">
                <div className="InputContainer">
                    <span className="PreNum">+7&nbsp;</span>
                    <input
                        className="InputNumber"
                        id="num2"
                        type="text"
                        maxLength="15"
                        value={phoneNumber2}
                        onChange={(e) => {
                            handlePhoneChange(e)
                        }}
                        onKeyDown={handleBackspace}
                        placeholder="(999) 999-99-99"
                    />
                </div>
                <button className="GetCall" onClick={sendNumberToBot}>Заказать звонок</button>
                {sendError2 &&
                    <span className="SendError2">Ошибка отправки!</span>
                }
                {sendSuccess2 &&
                    <span className="SendSuccess2">Успешно отправлено!</span>
                }
                <div className="MediaLinks">
                    <a href="https://wa.me/79515110167" target="_blank" rel="noreferrer" className="WhatsappLink">
                        <img className="MediaImg" src={whatsapp} alt="Whatsapp" />
                        <span className="MediaName">Whatsapp</span>
                    </a>
                    <a href="https://t.me/amigo761" target="_blank" rel="noreferrer" className="TelegramLink">
                        <img className="MediaImg" src={telegram} alt="Telegram" />
                        <span className="MediaName">Telegram</span>
                    </a>
                </div>
            </section>
        </div>
    );
}

export default App;
