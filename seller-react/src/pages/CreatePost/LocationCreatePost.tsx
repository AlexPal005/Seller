import './location.scss'
import {SearchRegion} from "../../components/SearchRegion/SearchRegion.tsx";

export const LocationCreatePost = () => {
    return (
        <div className='white-block-mt20 white-block search-region-create-post-block'>
            <h4>Місцезнаходження</h4>
            <SearchRegion classForBlock={'search-region-create-post'} classForInput={'create-post-city'}
                          classForIcon={'search-icon-add-post'}/>
        </div>
    )
}