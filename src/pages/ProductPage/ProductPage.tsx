import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const { id } = useParams();

    if (isLoading) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader/>
            </div>
        )
    }


    return (
        <>
            Товар с id {id}
        </>
    )
}

export default ProductPage;