export const PAGE_NUMBER_PARAM = 'page';
export const FILTERS_PARAM = 'filters';
export const SEARCH_QUERY_PARAM = 'query';

const parseFilters = (queryParams: URLSearchParams): number[] => {
    const filtersIds = queryParams.get(FILTERS_PARAM);

    if (filtersIds) {
        return filtersIds.split(',')
            .map(id => Number(id))
            .filter(id => Number.isInteger(id));
    }

    return [];
}

const parseQuery = (queryParams: URLSearchParams): [number, string, number[]] => {
    const queryPageNumber = +queryParams.get(PAGE_NUMBER_PARAM);
    const pageNumber = Number.isInteger(queryPageNumber) && queryPageNumber > 0 ? queryPageNumber : 1;
    const searchString = queryParams.get(SEARCH_QUERY_PARAM) ?? '';
    const filtersIds = parseFilters(queryParams);

    return [
        pageNumber,
        searchString,
        filtersIds
    ]
}

export default parseQuery;
