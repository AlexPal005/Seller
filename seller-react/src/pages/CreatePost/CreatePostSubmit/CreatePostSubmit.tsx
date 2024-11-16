import './create-post-submit.scss'
import {Button} from "../../../components/Button/Button.tsx";

type CreatePostSubmit = {
    createPost: () => void
    previewHandler: () => void
}
export const CreatePostSubmit = ({createPost, previewHandler}: CreatePostSubmit) => {

    const onClickCreatePost = () => {
        createPost()
    }

    return (
        <div className='create-post-submit white-block-mt20 white-block'>
            <Button className='button-underline button-submit-margin'
                    text='Попередній перегляд'
                    onClick={previewHandler}
            />

            <Button className='button-dark'
                    onClick={onClickCreatePost}
                    text='Опублікувати'
            />

        </div>
    )
}