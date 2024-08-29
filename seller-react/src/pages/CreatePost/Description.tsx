import './description.scss'
import React, {SetStateAction, useContext} from "react";
import {PostContext} from "./CreatePost.tsx";

type DescriptionProps = {
    errorDescription: string,
    setErrorDescription: React.Dispatch<React.SetStateAction<string>>
}
export const Description = ({errorDescription, setErrorDescription}: DescriptionProps) => {
    const {setDescription} = useContext(PostContext)
    const onChangeDescription = (e: { target: { value: SetStateAction<string> } }) => {
        if (e.target.value.length < 40) {
            setErrorDescription("Опис надто короткий. Додайте більше деталей!")
        } else {
            setErrorDescription("")
            setDescription(e.target.value)
        }
    }

    return (
        <div className='create-post-description white-block' id = "create-post-description">
            <h4>Опис оголошення</h4>

            <textarea
                className='create-post-description__text'
                placeholder='Подумайте, що б ви хотіли дізнатись з оголошення...'
                onChange={onChangeDescription}
            />
            {errorDescription && <p className="error">{errorDescription}</p>}
        </div>
    )
}