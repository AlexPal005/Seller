import './description.scss'
import {SetStateAction, useContext} from "react";
import {PostContext} from "./CreatePost.tsx";

export const Description = () => {
    const {setDescription} = useContext(PostContext)
    const onChangeDescription = (e: { target: { value: SetStateAction<string>; }; }) => {
        setDescription(e.target.value)
    }
    return (
        <div className='create-post-description white-block'>
            <h4>Опис оголошення</h4>

            <textarea
                className='create-post-description__text'
                placeholder='Подумайте, що б ви хотіли дізнатись з оголошення...'
                onChange={onChangeDescription}
            />
        </div>
    )
}