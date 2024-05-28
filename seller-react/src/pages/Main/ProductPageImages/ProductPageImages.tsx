import './prduct-pages-images.scss'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useProduct} from "../../../Hooks/Product.tsx";

export const ProductPageImages = () => {
    const {productId} = useParams()
    const {getImagesByProductId, images} = useProduct()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (productId !== undefined) {
            const id = parseInt(productId, 10)
            if (!isNaN(id)) {
                getImagesByProductId(id)
            }
        }
    }, [productId])

    const handlePreviousClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className='product-page-images'>
            {images.length > 0 && (
                <div className='slideshow-wrapper'>
                    <div className='slideshow-container' style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                        {images.map((image, index) => (
                            <div key={index} className='slide'>
                                <img src={'data:image/jpeg;base64,' + image.image} alt='Product' className='slide-image' />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button className='prev' onClick={handlePreviousClick}>❮</button>
            <button className='next' onClick={handleNextClick}>❯</button>
        </div>
    )
}