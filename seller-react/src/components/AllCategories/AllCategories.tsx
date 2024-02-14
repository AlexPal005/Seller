import './all-categories.scss'
import {useEffect, useState} from "react";

interface allCategoriesProps {
    index: number;
}

export const AllCategories = ({index}: allCategoriesProps) => {
    const [currPositionStyle, setCurrPositionStyle] = useState('')
    useEffect(() => {
        if (index < 8) {
            setCurrPositionStyle('all-categories_2-position')
        } else {
            setCurrPositionStyle('all-categories_4-position')
        }
    }, [index])
    return (
        <div className={'all-categories ' + currPositionStyle}>
            ghbsn
        </div>
    )
}
