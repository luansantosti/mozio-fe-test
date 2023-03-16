import { useSearchParams } from "react-router-dom";

import SearchForm from "../../components/searchForm";

const Home = () => {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(
    new URLSearchParams(searchParams)
  );

  return <SearchForm params={params} />
}

export default Home