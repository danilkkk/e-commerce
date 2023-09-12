import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from 'api';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import OutlineButton from 'components/OutlineButton';
import type { Product } from 'types';

import styles from './ProductPage.module.scss';

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

            <div className={styles['product']}>
                <div className={styles['image-w']}>
                    <img className={styles['image']} src={product.images} alt=""/>
                </div>

                <div className={styles['info']}>
                    <Text className={styles['title']}
                          view={'title'}
                    >
                        { product.title }
                    </Text>

                    <Text className={styles['title']}
                          view={'p-20'}
                          color={'secondary'}
                    >
                        { product.description }
                    </Text>

                    <Text className={styles['price']}
                          view={'title'}
                    >
                        { product.price }
                    </Text>

                    <div className={styles['buttons-w']}>
                        <Button className={styles['button']}>
                            <Text view={'button'}>
                                Buy now
                            </Text>
                        </Button>

                        <OutlineButton className={styles['button']}>
                            <Text view={'button'}>
                                Add to card
                            </Text>
                        </OutlineButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage;