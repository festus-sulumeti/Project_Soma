import React, {useState, useEffect} from "react";
import axios from "axios"; //use axiox for the retrieving of data to be searched from the backend api
import { useAuthStore } from "@/store/authStore";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";

const renderSearchResults = (results) => {
  return results.map((result) => (
    <div key={result.id}>{/* Rendering individual search result item */}</div>
  ));
};

const Dashboard = () => {
  const { user } = useAuthStore();

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    // Add logic here to fetch and update search results based on selectedAccount and selectedFilters
    // You might want to use axios to fetch data from your API
    const fetchData = async () => {
      try {
        setSearchLoading(true);
        // Example API endpoint, replace with your actual endpoint
        const response = await axios.get(`/api/search?q=${searchQuery}`);
        setSearchResults(response.data);
        setSearchError(null);
      } catch (error) {
        console.error("Error searching:", error);
        setSearchResults([]);
        setSearchError("Error fetching search results. Please try again.");
      } finally {
        setSearchLoading(false);
      }
    };

    fetchData();
  }, [selectedAccount, selectedFilters, searchQuery]);

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
  };

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSearch = () => {
    // setSearchResults will be triggered by the useEffect
  };

  return (
    <div className="flex items-start">
        <Sidebar 
          selectedAccount={selectedAccount}
          selectedFilters={selectedFilters}
          onAccountChange={handleAccountChange}
          onFiltersChange={handleFiltersChange}
        />
      <div className="pl-14 flex-1 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[36px]">Dashboard</h1>
          <h2 className="font-semibold text-[19px]">Welcome, {user.name}</h2>
        </div>
        
        <div className="py-8 ">
          <Button className="flex " >
            <UserAddOutlined className="mr-2 w-4 h-4" /> Add Student
          </Button>
        </div>
        <div className=" space-x-2 py-5 flex item-center pl-20 "  >
          <Input 
            type="text" 
            className="px-5 py-4 w-99 " 
            placeholder="Search on Soma..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            className="px-3 py-2" 
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

          </Button>
        </div>
        {searchLoading && <p> Loading... </p>}

        {searchError && <p style={{ color: "red" }}>{searchError}</p>}
        {renderSearchResults(searchResults)}
      </div>
    </div>
  );
};

export default Dashboard;
