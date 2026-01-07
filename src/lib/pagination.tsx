import { useSearchParams } from "react-router";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function usePaginationParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

    const setPage = (newPage: number) => {
        searchParams.set("page", String(newPage));
        setSearchParams(searchParams);
    };

    return { page, limit, setPage };
}
