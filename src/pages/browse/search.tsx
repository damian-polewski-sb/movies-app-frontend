import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { debounce } from "@mui/material";

import { axiosPrivate } from "api/axios";

import { MediaGallery } from "components/media/media-gallery";
import { MediaData, MediaType } from "components/media/types";
import { TrendingMediaGallery } from "components/trending-display/trending-display";
import { Container, Box, Spinner } from "components/ui";

import { getMediaTypeFromPath } from "utils/router-utils";
import { isMovie } from "utils/media-utils";

const getSearchMediaUrl = (mediaType: MediaType, query: string, page: number) =>
  `/content/search-${
    isMovie(mediaType) ? "movies" : "shows"
  }?query=${query}&page=${page}`;

export const SearchPage = () => {
  const location = useLocation();
  const mediaType = getMediaTypeFromPath(location.pathname);

  const inputRef = useRef(null);

  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MediaData[]>([]);
  const [totalSearchResults, setTotalSearchResuts] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const resetSearch = () => {
    setSearchResults([]);
    setTotalSearchResuts(undefined);
    setPage(1);
  };

  useEffect(() => {
    resetSearch();
  }, [location, query]);

  useEffect(() => {
    setQuery("");
    /// @ts-expect-error
    inputRef.current.value = "";
  }, [location]);

  const fetchSearchResults = async (query: string, page: number) => {
    try {
      setLoading(true);

      const url = getSearchMediaUrl(mediaType, query, page);
      const response = await axiosPrivate.get(url);

      const newSearchResults = response?.data?.results ?? [];
      const numberOfResults = response?.data?.totalResults;

      setSearchResults((prevSearchResults) => [
        ...prevSearchResults,
        ...newSearchResults,
      ]);
      setTotalSearchResuts(numberOfResults);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      toast.error(error as string);
      setLoading(false);
    }
  };

  const loadMoreSearchResults = async () =>
    await fetchSearchResults(query, page);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    setSearchResults([]);
    setTotalSearchResuts(undefined);
    setPage(1);
    if (query) fetchSearchResults(query, page);
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  const searchInputPlaceholder = `Search for your favourite ${
    isMovie(mediaType) ? "movies" : "shows"
  }...`;

  const hasSearchResults = searchResults.length > 0;

  return (
    <Container className="flex flex-col max-w-screen-xl gap-4 px-4">
      <Box label="Search">
        <input
          type="text"
          ref={inputRef}
          placeholder={searchInputPlaceholder}
          className="outline-none bg-inherit"
          onChange={debouncedSearch}
        />
      </Box>
      {loading && !hasSearchResults && <Spinner />}
      {hasSearchResults && (
        <MediaGallery
          media={searchResults}
          mediaType={mediaType}
          isFetchingData={loading}
          fetchCallback={loadMoreSearchResults}
          totalElements={totalSearchResults}
        />
      )}
      {!(loading || hasSearchResults) && (
        <TrendingMediaGallery mediaType={mediaType} />
      )}
    </Container>
  );
};
