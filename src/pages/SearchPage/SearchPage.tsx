import Pagination from 'components/Pagination';
import React from 'react';
import styles from './SearchPage.module.scss';
import Loader from 'components/Loader';
import Text from "../../components/Text";

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
            <div className={styles['page-description']}>
                <Text className={styles.title}
                      view={'title'}
                >
                    Products
                </Text>

                <Text className={styles.subtitle}
                      color={'secondary'}
                      view={'p-20'}
                >
                    We display products based on the latest products we have, if you want
                    to see our old products please enter the name of the item
                </Text>
            </div>

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