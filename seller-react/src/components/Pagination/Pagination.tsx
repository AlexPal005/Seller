import './Pagination.scss'
import React, {useEffect, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


interface PaginationProps {
    countProductsOnPage: number;
    countProducts: number;
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
    currPage: number;
}

// need to create currPage state and set default value to 1
export const Pagination = ({countProductsOnPage, countProducts, setCurrPage, currPage}: PaginationProps) => {
    const [pageNumbers, setPageNumbers] = useState<number[]>([])
    const [countPages] = useState(Math.ceil(countProducts / countProductsOnPage))

    useEffect(() => {
        if (countPages > 7) {
            const pageNumbersNew: number[] = []
            pageNumbersNew.push(1)
            if (currPage > 4 && currPage < countPages - 3) {
                pageNumbersNew.push(-1)
                for (let i = currPage - 1; i <= currPage + 1 && i < countPages; i++) {
                    pageNumbersNew.push(i)
                }
                pageNumbersNew.push(-1)
            } else if (currPage > 4 && currPage >= countPages - 3) {
                pageNumbersNew.push(-1)
                for (let i = countPages - 4; i < countPages; i++) {
                    pageNumbersNew.push(i)
                }
            } else if (currPage <= 4) {
                for (let i = 2; i < 6; i++) {
                    pageNumbersNew.push(i)
                }
                pageNumbersNew.push(-1)
            }
            pageNumbersNew.push(countPages)
            setPageNumbers(pageNumbersNew)
        } else {
            const array = Array.from(Array(countPages).keys()).map(num => num + 1)
            setPageNumbers(array)
        }
    }, [currPage, countPages])

    const prev = () => {
        if (currPage > 1) {
            setCurrPage(prev => prev - 1)
        }
    }

    const next = () => {
        if (currPage < countPages) {
            setCurrPage(prev => prev + 1)
        }
    }
    if (countPages >= 2) {
        return (
            <div className='pagination'>
                <IoIosArrowBack onClick={prev} className='pagination__button'/>
                <ul className='pagination__list'>
                    {
                        pageNumbers &&
                        pageNumbers.map((pageNumber, index) => {
                            if (pageNumber === -1) {
                                return (
                                    <li key={index} className='pagination__list-item'>...</li>
                                )
                            } else {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => setCurrPage(pageNumber)}
                                        className={
                                            'pagination__list-item-numbers ' +
                                            (currPage === pageNumber ? 'pagination__list-item-active' : '')
                                        }
                                    >
                                        {pageNumber}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <IoIosArrowForward onClick={next} className='pagination__button'/>
            </div>
        )
    }
}