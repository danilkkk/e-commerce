import Pagination from 'components/Pagination';
import React from 'react';
import styles from './SearchPage.module.scss';
import Loader from 'components/Loader';

const SearchPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const handlePageChanging = (nextNumber: number) => setCurrentPage(nextNumber);

    if (isLoading) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader/>
            </div>
        )
    }


    return (
        <>
            <div>
                поисковая строка
            </div>

            <div>
                контент
            </div>

            <Pagination className={styles.pagination}
                        currentPage={currentPage}
                        pagesCount={10}
                        onItemClick={handlePageChanging}
            />
        </>
    )
}

export default SearchPage;