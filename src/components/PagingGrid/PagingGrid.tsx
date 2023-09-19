import classNames from 'classnames';
import React from 'react';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';

import styles from './PagingGrid.module.scss';

export interface PagingGridProps<T> {
    className?: string;
    items: T;
    totalCount: number;
    renderItem: (item: T) => JSX.Element;
    currentPage: number;
    itemsPerPage: number;
    onChangePage: (nextPage: number) => void;
    // isLoading: boolean;
}

const PagingGrid = <T,>({ items, totalCount, renderItem, itemsPerPage, currentPage, className, onChangePage }: PagingGridProps<T>) => {
    const pagesCount = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            <div className={classNames(className, styles['grid'])}>
                {
                    items.map(item => renderItem(item))
                }
            </div>

            {
                totalCount > 0 && (
                    <Pagination className={styles.pagination}
                                currentPage={currentPage}
                                pagesCount={pagesCount}
                                onItemClick={onChangePage}
                    />
                )
            }
        </>
    )
}

export default PagingGrid;