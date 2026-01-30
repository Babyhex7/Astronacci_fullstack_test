import { useState, useEffect, useCallback } from "react";

const useContentList = (fetchService, type = "articles") => {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (filter !== "all") params.category = filter;

      const data = await fetchService(params);
      setItems(data[type] || []);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  }, [fetchService, type, debouncedSearch, filter]);

  const fetchAllItems = useCallback(async () => {
    try {
      const data = await fetchService();
      setAllItems(data[type] || []);
    } catch (error) {
      console.error(`Error fetching all ${type}:`, error);
    }
  }, [fetchService, type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    fetchAllItems();
  }, [fetchAllItems]);

  const categories = [
    ...new Set(allItems.map((item) => item.category).filter(Boolean)),
  ];

  return {
    items,
    allItems,
    loading,
    search,
    setSearch,
    filter,
    setFilter,
    categories,
    refetch: fetchItems,
  };
};

export default useContentList;
