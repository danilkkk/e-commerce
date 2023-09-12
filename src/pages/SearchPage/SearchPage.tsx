import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
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
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const handleParamUpdate = () => {
        const newSearch = `?${queryParams.toString()}`;
        navigate({ search: newSearch });
    }

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
        queryParams.set(PAGE_NUMBER_PARAM, String(nextNumber));
        handleParamUpdate();
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

    const onSearchInputChange = (value: string) => {
        queryParams.set(SEARCH_QUERY_PARAM, String(value));
        handleParamUpdate();
    }

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

    const getTitle = (value: Option[]) => value?.length ? value.map(v => v.value).join(', ') : 'Filter';

    const onFiltersChange = (value: Option[]) => {
        setFilters(value);
        queryParams.set(FILTERS_PARAM, value.map(v => v.key).join(','));
        handleParamUpdate();
    };

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
            <div className={styles['total-count']}>
                <Text view={'title'}>Total Product</Text>
                <Text className={styles['count']} view={'p-20'} color={'accent'}>{products?.length}</Text>
            </div>

            <div className={styles['cards-wrapper']}>
                {
                    displayedProducts.map((product: Product) => (
                        <Card key={product.id}
                              title={product.title}
                              subtitle={product.description}
                              captionSlot={product.category}
                              contentSlot={product.price}
                              image={product.images}
                              onClick={() => navigate(`/product/${product.id}`)}
                              actionSlot={<Button>Add to Cart</Button>}
                        />
                    ))
                }
            </div>

            <Pagination className={styles.pagination}
                        currentPage={pageNumber}
                        pagesCount={Math.ceil(products.length / ITEMS_PER_PAGE)}
                        onItemClick={handlePageChanging}
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