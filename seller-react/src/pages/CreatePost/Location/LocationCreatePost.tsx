import './location.scss'
import {SearchRegion} from "../../../components/SearchRegion/SearchRegion.tsx";

type LocationCreatePostProps = {
    locationError: string
}
export const LocationCreatePost = ({locationError}: LocationCreatePostProps) => {
    return (
        <div className='white-block-mt20 white-block search-region-create-post-block' id='create-post-location'>
            <h4>Місцезнаходження</h4>
            <SearchRegion classForBlock={'search-region-create-post'} classForInput={'create-post-city'}
                          classForIcon={'search-icon-add-post'}/>
            {locationError && <p className="error">{locationError}</p>}
        </div>
    )
}