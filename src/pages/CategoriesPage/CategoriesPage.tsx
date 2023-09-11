import React from 'react';
import styles from './CategoriesPage.module.scss';
import Loader from 'components/Loader';

const CategoriesPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(false);

    if (isLoading) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader/>
            </div>
        )
    }


    return (
        <>
            Категории
        </>
    )
}

export default CategoriesPage;