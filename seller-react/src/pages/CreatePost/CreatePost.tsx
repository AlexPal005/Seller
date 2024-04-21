import './create-post.scss'
import {DetailsCreatePost} from "./DetailsCreatePost.tsx";
import {Photo} from "./Photo.tsx";
import {Description} from "./Description.tsx";

export const CreatePost = () => {
    return (
        <div className='create-post-container'>
            <h2 className='create-post-container__title'>Створити оголошення</h2>
            <DetailsCreatePost/>
            <Photo/>
            <Description/>
        </div>
    )
}