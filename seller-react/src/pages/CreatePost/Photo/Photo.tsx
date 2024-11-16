import './photo.scss'
import {InputPhoto} from "../../../components/InputPhoto/InputPhoto.tsx";
import {useCallback, useContext, useEffect, useState} from "react";
import {PostContext} from "../CreatePost/CreatePost.tsx";

export const Photo = () => {
    const [htmlPhotos, setHtmlPhotos] = useState<string[]>([])
    const {setProductToCreate, productToCreate} = useContext(PostContext)

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

    useEffect(() => {
        if (productToCreate.images && productToCreate.images.length > 0) {
            const base64ToBlob = (base64String: string) => {
                const byteCharacters = atob(base64String)
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                const byteArray = new Uint8Array(byteNumbers)
                return new Blob([byteArray], {type: 'image/jpeg'})
            };

            const blobUrls = productToCreate.images.map((base64String: string) => {
                const blob = base64ToBlob(base64String)
                return URL.createObjectURL(blob)
            });

            setHtmlPhotos(blobUrls)
        }
    }, [])

    // get blob from url and convert it to base64
    const convertBlobUrlToBase64 = useCallback(async (url: string): Promise<string> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return convertBlobToBase64(blob);
    }, [convertBlobToBase64]);

    useEffect(() => {
        const convertPhotos = () => {
            return Promise.all(htmlPhotos.map(url => convertBlobUrlToBase64(url)))
        }

        if (htmlPhotos.length > 0) {
            convertPhotos().then(base64Array => {
                const newArray = base64Array.map(base64 => {
                    return base64.split(',')[1]
                })
                setProductToCreate(prev => ({
                    ...prev, images: newArray
                }))
            }).catch(err => console.error(err))
        }
    }, [htmlPhotos, convertBlobUrlToBase64])

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