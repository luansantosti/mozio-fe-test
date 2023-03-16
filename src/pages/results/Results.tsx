import { useSearchParams } from "react-router-dom";
import SearchResults from "../../components/searchResults";

const Results = () => {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(
    new URLSearchParams(searchParams)
  );

  return <SearchResults params={params} />
}

export default Results