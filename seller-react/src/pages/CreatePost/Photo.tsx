import './photo.scss'
import {InputPhoto} from "../../components/InputPhoto/InputPhoto.tsx";
import {useEffect, useState} from "react";

export const Photo = () => {
    const [htmlPhotos, setHtmlPhotos] = useState<string[]>([])

    useEffect(() => {
        console.log(htmlPhotos)
    }, [htmlPhotos])

    return (
        <div className='create-post-photo white-block'>
            <h4>Фото</h4>
            <p className='grey-text-16'>Перше фото буде на обкладинці оголошення</p>
            <div className='create-post-photo__photo-list'>
                <InputPhoto indexPhoto={0} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={1} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={2} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={3} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={4} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={5} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={6} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
                <InputPhoto indexPhoto={7} setHtmlPhotos={setHtmlPhotos} htmlPhotos={htmlPhotos}/>
            </div>
        </div>
    )
}