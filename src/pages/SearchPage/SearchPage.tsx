import React from 'react';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { Product, Category } from 'types';

import styles from './SearchPage.module.scss';

import { data } from './data';

const products = data.products as Product[];
const categories = data.categories as Category[];

const SearchPage: React.FC = () => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const handlePageChanging = (nextNumber: number) => setCurrentPage(nextNumber);

    const itemsCount = products.length;

    const categoriesAsOptions = categories.map(category => ({
        key: category.id,
        value: category.name
    }));

    console.log(products);
    console.log(categories);

    if (isLoading) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader/>
            </div>
        )
    }

    const pageDescription = (
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
    );

    const searchInput = (
        <div className={styles['input-w']}>
            <Input className={styles['search-input']} placeholder={'Search product'} />

            <Button>
                <Text>
                    Find now
                </Text>
            </Button>
        </div>
    );

    const getTitle = (value: Option[]) => value?.length ? value.map(v => v.value).join(', ') : 'Filter';

    const onFiltersChange = (value: Option[]) => console.log('filters changed', value);

    const productsFilter = (
        <div className={styles['filter-wrapper']}>
            <MultiDropdown className={styles['filter']}
                           options={categoriesAsOptions}
                           onChange={onFiltersChange}
                           getTitle={getTitle}
            />
        </div>
    );

    const productsList = (
        <div>
            контент
        </div>
    );

    return (
        <>
            { pageDescription }

            { searchInput }

            { productsFilter }

            { productsList }

            <Pagination className={styles.pagination}
                        currentPage={currentPage}
                        pagesCount={10}
                        onItemClick={handlePageChanging}
            />
        </>
    )
}

export default SearchPage;