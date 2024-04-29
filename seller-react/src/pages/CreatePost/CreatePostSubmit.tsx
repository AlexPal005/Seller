import './create-post-submit.scss'
import {Button} from "../../components/Button/Button.tsx";

export const CreatePostSubmit = () => {
    return (
        <div className='create-post-submit white-block-mt20 white-block'>
            <Button className='button-underline button-submit-margin'
                    onClick={() => {
                    }}
                    text='Попередній перегляд'/>

            <Button className='button-dark'
                    onClick={() => {
                    }}
                    text='Опублікувати'/>
        </div>
    )
}