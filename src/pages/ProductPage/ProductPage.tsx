import React from 'react';
import { useParams } from 'react-router-dom';
import api from 'api';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import ImageSlider from 'components/ImageSlider';
import Loader from 'components/Loader';
import OutlineButton from 'components/OutlineButton';
import Text from 'components/Text';
import type { Product } from 'types';

import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [product, setProduct] = React.useState<Product | undefined>(undefined);
    const { id } = useParams();

    React.useEffect(() => {
        api.fetchProduct(+id).then(product => {
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
                <ImageSlider className={styles['slider']}
                             images={product.images}
                             width={600}
                             height={600}
                />

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