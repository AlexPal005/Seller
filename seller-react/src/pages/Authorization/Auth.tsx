import './auth.scss'
import {Button} from "../../components/Button/Button.tsx";
import axios from 'axios';
import {useEffect} from "react";

export const Auth = () => {

    useEffect(() => {
        axios.get(`http://localhost:8081/api/product/readAll`)
            .then(res => {
                console.log(res)
            })
    })
    return (
        <div className='auth-container content'>
            <form className='auth-form'>
                <div className='auth-form__menu'>
                    <p className='auth-form__menu-item'>Увійти</p>
                    <p className='auth-form__menu-item'>Зареєструватися</p>
                </div>
                <hr className='auth-form__underline'/>

                <label htmlFor='email' className='auth-form__description'>Електронна пошта чи телефон</label>
                <input id='email' className='auth-form__input' type='text'/>

                <label htmlFor='password' className='auth-form__description'>Пароль</label>
                <input id='password' className='auth-form__input' type='password'/>

                <p>Забули пароль?</p>

                <Button
                    text={'Увійти'}
                    onClick={() => {
                    }}
                    className='auth-form__button'
                />
            </form>
        </div>
    )
}