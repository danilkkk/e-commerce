import { useLocation, useNavigate } from 'react-router-dom';

export default function useQuery() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const updateParam = (name: string, value: string) => {
        queryParams.set(name, value);
        const newSearch = `?${queryParams.toString()}`;
        navigate({ search: newSearch });
    }

    return [queryParams, updateParam];
}