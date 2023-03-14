import { useParams, useSearchParams } from "react-router-dom";

import { formattedCities } from "../../data/cities";
import SearchForm from "../../components/searchForm";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries(
    new URLSearchParams(searchParams)
  );

  return <SearchForm/>
}

export default Home