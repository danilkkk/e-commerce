import React from 'react';
import styles from './CategoriesPage.module.scss';
import Loader from 'components/Loader';
import HorizontalCard from 'components/HorizontalCard';;
import api from 'api';
import { Category } from 'types';
import { useNavigate } from "react-router-dom";

const CategoriesPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [categories, setCategories] = React.useState<Category[] | undefined>(undefined);
    const navigate = useNavigate();

    React.useEffect(() => {
        api.fetchCategories().then(categories => {
            setCategories(categories);
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
        <div className={styles['categories-wrapper']}>
            {
                categories.map(category => (
                    <HorizontalCard className={styles['card']}
                                    key={category.id}
                                    title={category.name}
                                    image={category.image}
                                    onClick={() => navigate(`/?filters=${category.id}`)}
                    />
                ))
            }
        </div>
    )
}

export default CategoriesPage;