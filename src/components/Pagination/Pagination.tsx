import React from 'react';
import styles from './Pagination.module.scss';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import classNames from "classnames";

export interface PaginationProps {
    className?: string;
    currentPage: number;
    pagesCount: number;
    onItemClick: (pageNumber: number) => void;
}

const RANGE = 2;

const Pagination: React.FC<PaginationProps> = ({ className, pagesCount, currentPage, onItemClick }) => {
    const activeLeftArrow = currentPage !== 1;
    const activeRightArrow = currentPage !== pagesCount;

    const itemClickWrapper = (item: PaginationItem) => {
        if (item.pageNumber) {
            onItemClick(item.pageNumber);
        }
    }

    const onLeftArrowClick = () => {
        if (activeLeftArrow) {
            onItemClick(currentPage - 1);
        }
    }

    const onRightArrowClick = () => {
        if (activeRightArrow) {
            onItemClick(currentPage + 1);
        }
    }

    return (
        <div className={classNames(styles.wrapper, className)}>
            <ArrowDownIcon className={classNames(styles.arrow, styles.__left, activeLeftArrow && styles.__active)}
                           onClick={onLeftArrowClick}
            />
            {
                getPaginationItems(pagesCount, currentPage).map((item, index) => (
                    <div className={classNames(styles.item, item.active  && styles.__active)}
                         key={index}
                         onClick={() => itemClickWrapper(item)}
                    >
                        <Text view={'p-18'} className={classNames()} >
                            {
                                item.displayedText
                            }
                        </Text>
                    </div>
                ))
            }
            <ArrowDownIcon className={classNames(styles.arrow, styles.__right, activeRightArrow && styles.__active)}
                           onClick={onRightArrowClick}
            />
        </div>
    )
}

interface PaginationItem {
    active?: boolean;
    displayedText: string;
    pageNumber?: number;
}

const ELLIPSIS =  getPaginationItem(undefined, false, '...');

function getPaginationItems(pagesCount: number, currentPage: number): PaginationItem[] {
    console.log(pagesCount, currentPage);

    const items: PaginationItem[] = [];

    const leftBound = currentPage > RANGE * 2 ? Math.max(1, currentPage - RANGE) : 1;
    const rightBound = Math.min(pagesCount, currentPage + RANGE);

    for (let pageNumber = leftBound; pageNumber <= rightBound; pageNumber++) {
        items.push(getPaginationItem(pageNumber, currentPage === pageNumber));
    }

    if (items[0]?.pageNumber !== 1) {
        items.unshift(getPaginationItem(1, currentPage === 1), ELLIPSIS);
    }

    if (items[items.length - 1]?.pageNumber !== pagesCount) {
        items.push(ELLIPSIS, getPaginationItem(pagesCount, currentPage === pagesCount))
    }

    return items;
}

function getPaginationItem(pageNumber?: number, active: boolean = false, displayedText?: string) {
    return {
        pageNumber,
        displayedText: displayedText ? displayedText : String(pageNumber),
        active
    }
}

export default Pagination;