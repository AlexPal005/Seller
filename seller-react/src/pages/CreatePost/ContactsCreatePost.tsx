import './contacts.scss'
import {SetStateAction, useContext} from "react";
import {PostContext} from "./CreatePost.tsx";

export const ContactsCreatePost = () => {
    const {
        setUserName,
        setEmail,
        setPhoneNumber
    } = useContext(PostContext)
    const onChangeUserName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUserName(e.target.value)
    }
    const onChangeEmail = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value)
    }
    const onChangePhoneNumber = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPhoneNumber(e.target.value)
    }
    return (
        <div className='white-block-mt20 white-block'>
            <h4>Контакти</h4>
            <form>
                <p className='blue-text-16 white-block-mt20'>Контактна особа</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Ім'я"
                       onChange={onChangeUserName}
                />

                <p className='blue-text-16 white-block-mt20'>Email</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Email"
                       onChange={onChangeEmail}
                />

                <p className='blue-text-16 white-block-mt20'>Номер телефону</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Телефон"
                       onChange={onChangePhoneNumber}
                />
            </form>
        </div>
    )
}