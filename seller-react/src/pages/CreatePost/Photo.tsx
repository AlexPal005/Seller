import './photo.scss'
import {InputPhoto} from "../../components/InputPhoto/InputPhoto.tsx";
import {useCallback, useContext, useEffect, useState} from "react";
import {PostContext} from "./CreatePost.tsx";

export const Photo = () => {
    const [htmlPhotos, setHtmlPhotos] = useState<string[]>([])
    const {setImages} = useContext(PostContext)

    // convert blob to base64
    const convertBlobToBase64 = useCallback((blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
        });
    }, [])

    // get blob from url and convert it to base64
    const convertBlobUrlToBase64 = useCallback(async (url: string): Promise<string> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return convertBlobToBase64(blob);
    }, [convertBlobToBase64]);

    useEffect(() => {
        const convertPhotos = () => {
            return Promise.all(htmlPhotos.map(url => convertBlobUrlToBase64(url)));
        };

        if (htmlPhotos.length > 0) {
            convertPhotos().then(base64Array => {
                const newArray = base64Array.map(base64 => {
                    return base64.split(',')[1];
                })
                setImages(newArray);
            }).catch(err => console.error(err));
        }
    }, [htmlPhotos, setImages, convertBlobUrlToBase64]);

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