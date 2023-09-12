import React from 'react';
import api from 'api';
import Button from 'components/Button';
import Card from 'components/Card';
import HeaderCounter from 'components/HeaderCounter';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import PagingGrid from 'components/PagingGrid';
import Text from 'components/Text';
import TextWithTitle from 'components/TextWithTitle';
import useQuery from 'hooks/useQuery';
import { Product, Category } from 'types';
import parseQuery, { PAGE_NUMBER_PARAM, FILTERS_PARAM, SEARCH_QUERY_PARAM } from 'utils/query';
// import { throttle } from 'utils/throttle';

import styles from './SearchPage.module.scss';

const ITEMS_PER_PAGE = 12;

const categoryToOption = (categories: Category[]) => categories.map(category => ({
    key: category.id,
    value: category.name
})).filter((x, i, a) => a.indexOf(x) === i)

const fetchProducts = (offset: number = 0, substring: string, filtersIds: number[], initial = false) => {
    return api.fetchProducts(initial, offset, ITEMS_PER_PAGE, substring, filtersIds);
}

const fetchCategories = () => {
    return api.fetchCategories();
}

const SearchPage: React.FC = () => {
    const [queryParams, updateParams, navigate] = useQuery();

    const [pageNumber, searchString, filtersIds] = parseQuery(queryParams);

    const [enabledFilters, setFilters] = React.useState<Option[] | undefined>(undefined);

    const [products, setProducts] = React.useState<Product[] | undefined>(undefined);
    const [totalCount, setTotalCount] = React.useState<number | undefined>(undefined);
    const [categories, setCategories] = React.useState<Option[] | undefined>(undefined);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(pageNumber);
    const [searchQuery, setSearchQuery] = React.useState<string>(searchString);

    const handlePageChanging = (nextNumber: number) => {
        fetchPage(nextNumber, searchQuery, enabledFilters);
    };

    const fetchPage = (pageNumber: number, searchQuery, enabledCategories?: Option[]) => {
        setCurrentPage(pageNumber);
        updateParams(PAGE_NUMBER_PARAM, String(pageNumber));
        setProducts(undefined);
        const offset = (pageNumber - 1) * ITEMS_PER_PAGE;

        fetchProducts(offset, searchQuery, enabledCategories?.map(category => category.key)).then(data => {
            setProducts(data.products);
            setTotalCount(value => Number.isInteger(data.totalCount) ? data.totalCount : value);
        });
    }

    React.useEffect(() => {
        Promise.all([fetchProducts((pageNumber - 1) * ITEMS_PER_PAGE, searchString, filtersIds,true), fetchCategories()])
            .then(responses => {
                setProducts(responses[0].products);
                setTotalCount(value => Number.isInteger(responses[0].totalCount) ? responses[0].totalCount : value);
                setCategories(categoryToOption(responses[1]));
                setFilters(categoryToOption(filtersIds.map(filterId => responses[1].find(category => category.id == filterId)).filter(c => c)));
                setLoading(false);
        })

    }, []);

    const onSearchInputChange = (value: string) => {
        setSearchQuery(value);
        updateParams(SEARCH_QUERY_PARAM, String(value));
        handlePageChanging(1);
        fetchPage(1, value, enabledFilters);
    }

    const getTitle = (value: Option[]) => value?.length ? value.map(v => v.value).join(', ') : 'Filter';

    const onFiltersChange = (value: Option[]) => {
        setFilters(value);
        updateParams(FILTERS_PARAM, value.map(v => v.key).join(','));
        fetchPage(1, searchQuery, value);
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

    return (
        <>
            <TextWithTitle className={styles['page-description']}
                           title={'Products'}
                           text={'We display products based on the latest products we have, if you want to see our old products please enter the name of the item'}
            />

            <div className={styles['input-w']}>
                <Input className={styles['search-input']}
                       placeholder={'Search product'}
                       onChange={onSearchInputChange}
                       value={searchQuery}
                />

                <Button>
                    <Text>
                        Find now
                    </Text>
                </Button>
            </div>

            {
                Boolean(categories) && (
                    <div className={styles['filter-wrapper']}>
                        <MultiDropdown className={styles['filter']}
                                       options={categories}
                                       onChange={onFiltersChange}
                                       getTitle={getTitle}
                                       value={enabledFilters}
                        />
                    </div>
                )
            }

            {
                Boolean(products) && (
                    <>
                        <HeaderCounter className={styles['counter']}
                                       title={'Total Product'}
                                       count={totalCount}
                        />

                        <PagingGrid className={styles['grid']}
                                    renderItem={renderCard}
                                    currentPage={currentPage}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onChangePage={handlePageChanging}
                                    totalCount={totalCount}
                                    items={products}
                        />
                    </>
                )
            }
        </>
    )
}

export default SearchPage;