import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

import RectPlot from "./Components/ReactPloty";
import { useDebounce } from "./hooks/useDebounce";
import DataTable from "./Components/Table";

import "./App.css";
import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
} from "./Styled/SearchInput";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [rowSelection, setRowSelectionModel] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchData = useCallback(
    async (pageNo) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/users?skip=${pageNo * paginationModel.pageSize
          }&limit=${paginationModel.pageSize}`
        );
        const data = response?.data;
        setIsLoading(false);
        setUsers(data?.users);
        setTotalCount(data?.total);
        if (pageNo === 0) {
          setRowSelectionModel(
            data?.users.filter((r) => r.id <= 5).map((r) => r.id)
          );
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [paginationModel.pageSize]
  );

  const onSearchData = async (value) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/users/search?q=${value}`
      );
      const searchData = response?.data;
      setIsLoading(false);
      setUsers(searchData?.users);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching search data:", error);
    }
  };

  useEffect(() => {
    fetchData(paginationModel.page);
  }, [fetchData, paginationModel.page]);

  useEffect(() => {
    onSearchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const yAxis = useMemo(() => {
    return users
      .filter((user) => rowSelection.includes(user.id))
      .map((u) => u?.age);
  }, [rowSelection, users]);

  const xAxis = useMemo(() => {
    return users
      .filter((user) => rowSelection.includes(user.id))
      .map((u) => u?.firstName);
  }, [rowSelection, users]);

  return (
    <Box>
      <Box component="main" sx={{ p: 4 }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search User..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <DataTable
              users={users}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              dataSelection={rowSelection}
              setRowSelectionModel={setRowSelectionModel}
              isLoading={isLoading}
              totalCount={totalCount}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ float: 'right' }}>
              <RectPlot xAxis={xAxis} yAxis={yAxis} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
