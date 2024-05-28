import './create-post-submit.scss'
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

type CreatePostSubmit = {
    createPost: () => void
}
export const CreatePostSubmit = ({createPost}: CreatePostSubmit) => {
    const navigate = useNavigate()
    const onClickCreatePost = () => {
        createPost()
        navigate('/account/posts')
    }
    return (
        <div className='create-post-submit white-block-mt20 white-block'>
            <Button className='button-underline button-submit-margin'
                    onClick={() => {
                    }}
                    text='Попередній перегляд'/>

            <Button className='button-dark'
                    onClick={onClickCreatePost}
                    text='Опублікувати'/>

        </div>
    )
}