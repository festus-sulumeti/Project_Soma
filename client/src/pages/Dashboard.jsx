import { useAuthStore } from "@/store/authStore";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";

import AccountSummary from "@/components/AccountSummary";
import CreateAccount from "@/components/CreateAccount";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserAddOutlined } from "@ant-design/icons";

import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/store/accountsStore";
import { useNavigate } from "react-router-dom";

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
  const { user, setUser, setIsAuthenticated } = useAuthStore();
  const [students, setStudents, classes, setClasses] = useAccountStore(
    (state) => [
      state.students,
      state.setStudents,
      state.classes,
      state.setClasses,
    ]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate('/login')
  },[user])

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

  // useEffect(() => {
  //   api
  //     .get(`/students`)
  //     .then((response) => setStudents(response.data));
  // }, []);

  // useEffect(() => {
  //   api
  //     .get(`/classes`)
  //     .then((response) => setClasses(response.data));
  // }, []);

  // const [properties, setProperties] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:5000/property")
      .then((res) => console.log(res.data));
  }, []);


  return (
    <div className="flex items-start">
      <div className="pl-4 flex-1 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[36px]">Dashboard</h1>
          {user && (<h2 className="font-semibold text-[19px]">
            Welcome, {user.first_name} {user.last_name}
          </h2>)}
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
