import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from 'api';
import Loader from 'components/Loader';
import type { Product } from 'types';

import styles from './ProductPage.module.scss';
import BackButton from "../../components/BackButton";

const ProductPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [product, setProduct] = React.useState<Product | undefined>(undefined);
    const navigate = useNavigate();
    const { id } = useParams();

    React.useEffect(() => {
        api.fetchProduct(+id).then(product => {
            console.log(product);
            setProduct(product);
            setLoading(false);
        });
    }, []);
    

    if (isLoading) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader/>
            </div>
        )
    }


    return (
        <>
            <BackButton className={styles['back-button']}/>
            Товар с id {id}
        </>
    )
}

export default ProductPage;