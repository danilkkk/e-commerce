import React from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import HeaderCounter from 'components/HeaderCounter';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import PagingGrid from 'components/PagingGrid';
import Text from 'components/Text';
import useQuery from 'hooks/useQuery';
import { Product, Category } from 'types';
import parseQuery, { PAGE_NUMBER_PARAM, FILTERS_PARAM, SEARCH_QUERY_PARAM } from 'utils/query';

import styles from './SearchPage.module.scss';

import { data } from './data';

const products0 = data.products as Product[];
const categories0 = data.categories as Category[];

const ITEMS_PER_PAGE = 12;

const categoryToOption = (categories: Category[]) => categories.map(category => ({
    key: category.id,
    value: category.name
})).filter((x, i, a) => a.indexOf(x) === i)

const fetchProducts = () => {
    return Promise.resolve(products0);
}

const fetchCategories = () => {
    return Promise.resolve(categories0);
}

function getCurrentPageItems<T> (items: T[], pageNumber: number = 1) {
    return items.slice((pageNumber - 1) * ITEMS_PER_PAGE, pageNumber * ITEMS_PER_PAGE);
}

const SearchPage: React.FC = () => {
    const [queryParams, updateParams, navigate] = useQuery();

    const [pageNumber, searchString, filtersIds] = parseQuery(queryParams);

    const [enabledFilters, setFilters] = React.useState<Option[] | undefined>(undefined);

    const [products, setProducts] = React.useState<Product[] | undefined>(undefined);
    const [displayedProducts, setDisplayedProducts] = React.useState<Product[] | undefined>(undefined);
    const [categories, setCategories] = React.useState<Option[] | undefined>(undefined);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState<number>(pageNumber);

    const handlePageChanging = (nextNumber: number) => {
        setCurrentPage(nextNumber);
        setDisplayedProducts(getCurrentPageItems(products!, nextNumber));
        updateParams(PAGE_NUMBER_PARAM, String(nextNumber));
    };

    React.useEffect(() => {
        Promise.all([fetchProducts(), fetchCategories()])
            .then(responses => {
                setProducts(responses[0]);
                setDisplayedProducts(getCurrentPageItems(responses[0], currentPage))
                setCategories(categoryToOption(responses[1]));
                setFilters(categoryToOption(filtersIds.map(filterId => categories.find(category => category.id == filterId)).filter(c => c)));
        })

    }, []);

    const onSearchInputChange = (value: string) => {
        updateParams(SEARCH_QUERY_PARAM, String(value));
    }

    const getTitle = (value: Option[]) => value?.length ? value.map(v => v.value).join(', ') : 'Filter';

    const onFiltersChange = (value: Option[]) => {
        setFilters(value);
        updateParams(FILTERS_PARAM, value.map(v => v.key).join(','));
    };

    if (isLoading) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader/>
            </div>
        )
    }

    const renderCard = (product: Product) => (
        <Card key={product.id}
              title={product.title}
              subtitle={product.description}
              captionSlot={product.category}
              contentSlot={product.price}
              image={product.images}
              onClick={() => navigate(`/product/${product.id}`)}
              actionSlot={<Button>Add to Cart</Button>}
        />
    );


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
            <Input className={styles['search-input']}
                   placeholder={'Search product'}
                   onChange={onSearchInputChange}
                   value={searchString}
            />

            <Button>
                <Text>
                    Find now
                </Text>
            </Button>
        </div>
    );

    const productsFilter = categories ? (
        <div className={styles['filter-wrapper']}>
            <MultiDropdown className={styles['filter']}
                           options={categories}
                           onChange={onFiltersChange}
                           getTitle={getTitle}
                           value={enabledFilters}
            />
        </div>
    ) : null;

    const productsList = products ? (
        <>
            <HeaderCounter className={styles['counter']}
                           title={'Total Product'}
                           count={products?.length}
            />

            <PagingGrid className={styles['grid']}
                        renderItem={renderCard}
                        currentPage={pageNumber}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onChangePage={handlePageChanging}
                        totalCount={products.length}
                        items={displayedProducts}
            />
        </>
    ) : null;

    return (
        <>
            { pageDescription }

            { searchInput }

            { productsFilter }

            { productsList }
        </>
    )
}

export default SearchPage;