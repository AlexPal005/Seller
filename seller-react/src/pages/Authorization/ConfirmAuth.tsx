import './auth.scss'
import {Button} from "../../components/Button/Button.tsx";

export const ConfirmAuth = () => {
    return (
        <div className='auth-container content'>
            <form className='auth-form'>
                <label htmlFor='code' className='auth-form__description'>Уведіть код підтвердження з email</label>
                <input id='code' className='auth-form__input' placeholder='Код'/>

                <p>Код не прийшов?</p>

                <Button
                    text={'Підтвердити'}
                    onClick={() => {
                    }}
                    className='auth-form__button'
                />
            </form>
        </div>
    )
}