import React, { useState, useEffect } from "react";
import axios from "axios"; //use axiox for the retrieving of data to be searched from the backend api
import { useAuthStore } from "@/store/authStore";

import AccountSummary from "@/components/AccountSummary";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { UserAddOutlined } from "@ant-design/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAccount from "@/components/CreateAccount";

import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/store/accountsStore";
import { BASE_URL } from "@/lib/utils";

// const renderSearchResults = (results) => {
//   if (!Array.isArray(results)) {
//     // Handle the case where results is not an array
//     return <p></p>;
//   }

//   return results.map((result) => (
//     <div key={result.id}>{/* Rendering individual search result item */}</div>
//   ));
// };

const Dashboard = () => {
  const { user } = useAuthStore();
  const [students, setStudents, classes, setClasses] = useAccountStore((state) => [
    state.students,
    state.setStudents,
    state.classes,
    state.setClasses
  ]);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [searchLoading, setSearchLoading] = useState(false);
  // const [searchError, setSearchError] = useState(null);

  // const handleSearch = async () => {
  //   // try {
  //   //   setSearchLoading(true);
  //   //   const response = await axios.get(`/api/search?q=${searchQuery}`);
  //   //   setSearchResults(response.data);
  //   //   setSearchError(null);
  //   // } catch (error) {
  //   //   console.error("Error searching:", error);
  //   //   setSearchResults([]);
  //   //   setSearchError("Error fetching search results. Please try again.");
  //   // } finally {
  //   //   setSearchLoading(false);
  //   // }
  // };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/students`)
      .then((response) => setStudents(response.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/classes`)
      .then((response) => setClasses(response.data));
  }, []);

  return (
    <div className="flex items-start">
      <div className="pl-4 flex-1 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[36px]">Dashboard</h1>
          <h2 className="font-semibold text-[19px]">Welcome, {user.name}</h2>
        </div>

        <div className="space-x-2 py-5 flex item-center">
          <Input
            type="text"
            className="px-5 py-4 w-96"
            placeholder="Search on Soma..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="px-3 py-2"
            // onClick={handleSearch}
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
        {/* {searchLoading && <p> Loading... </p>}

        {searchError && <p style={{ color: "red" }}>{searchError}</p>}
        {renderSearchResults(searchResults)} */}
        <Dialog>
          <DialogTrigger>
            <Button className="mt-4">
              <UserAddOutlined className="mr-2 w-4 h-4" /> Add account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateAccount />
          </DialogContent>
        </Dialog>
        <AccountSummary />
      </div>
    </div>
  );
};

export default Dashboard;
