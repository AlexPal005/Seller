import './prduct-pages-images.scss'
import {useState} from "react";


type ProductPageImagesProps = {
    images: string[]
}
export const ProductPageImages = ({images}: ProductPageImagesProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
                    <div className='slideshow-container'
                         style={{transform: `translateX(-${currentImageIndex * 100}%)`}}>
                        {images.map((image, index) => (
                            <div key={index} className='slide'>
                                <img src={'data:image/jpeg;base64,' + image} alt='Product'
                                     className='slide-image'/>
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