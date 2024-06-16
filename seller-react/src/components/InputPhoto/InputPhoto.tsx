import './input-photo.scss'
import {IoCameraOutline} from "react-icons/io5";
import React, {ChangeEvent, useEffect, useState} from "react";
import {RiDeleteBin6Line} from "react-icons/ri";

interface inputPhotoProps {
    indexPhoto: number;
    htmlPhotos: string[];
    setHtmlPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

export const InputPhoto = ({indexPhoto, htmlPhotos, setHtmlPhotos}: inputPhotoProps) => {
    const [htmlImage, setHtmlImage] = useState('')

    const onChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        let file: File
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            file = e.currentTarget.files[0]
            const currHtmlImage: string = URL.createObjectURL(file);
            setHtmlImage(currHtmlImage)
            setHtmlPhotos(prev => [...prev, currHtmlImage])
        }
    }

    const deleteImage = () => {
        setHtmlPhotos(prev => {
            const index: number = prev.indexOf(htmlImage)
            const newArray: string[] = [...prev]
            if (index !== -1) {
                newArray.splice(index, 1);
                return newArray
            }
            return prev
        })
    }

    useEffect(() => {
        setHtmlImage(htmlPhotos[indexPhoto])
    }, [htmlPhotos, indexPhoto])

    return (
        <div className='input-select-photo-block'>
            {
                htmlImage ?
                    <div className='input-select-photo-block__image-block'>
                        <img alt="image" src={htmlImage} className='selected-photo'/>
                        <div className='input-select-photo-block__hover'>
                            <div className='delete-photo-circle' onClick={deleteImage}>
                                <RiDeleteBin6Line className='delete-icon'/>
                            </div>
                        </div>
                    </div>

                    :

                    <>
                        <label htmlFor="select-photo" className='label-photo'><IoCameraOutline className='icon-photo'/></label>
                        <input
                            type="file"
                            id="select-photo"
                            className="input-select-photo"
                            onChange={onChangePhoto}
                            accept="image/png, image/jpeg"
                            multiple
                        />
                    </>
            }
        </div>

    )
}