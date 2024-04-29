import './contacts.scss'

export const ContactsCreatePost = () => {
    return (
        <div className='white-block-mt20 white-block'>
            <h4>Контакти</h4>
            <form>
                <p className='blue-text-16 white-block-mt20'>Контактна особа</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Ім'я"
                />

                <p className='blue-text-16 white-block-mt20'>Email</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Email"
                />

                <p className='blue-text-16 white-block-mt20'>Номер телефону</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Телефон"
                />
            </form>
        </div>
    )
}