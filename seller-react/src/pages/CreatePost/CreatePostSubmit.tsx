import './create-post-submit.scss'
import {Button} from "../../components/Button/Button.tsx";

type CreatePostSubmit = {
    createPost: () => void
}
export const CreatePostSubmit = ({createPost}: CreatePostSubmit) => {

    const onClickCreatePost = () => {
        createPost()
    }
    return (
        <div className='create-post-submit white-block-mt20 white-block'>
            <Button className='button-underline button-submit-margin'
                    text='Попередній перегляд'/>

            <Button className='button-dark'
                    onClick={onClickCreatePost}
                    text='Опублікувати'
            />

        </div>
    )
}