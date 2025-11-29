import React, { useEffect, useState } from 'react'
import { InputGroup } from '../../components/ui/input-group.jsx'
import { InputRightElement } from '../../components/ui/InputRightElement.jsx'
import { SearchIcon } from 'lucide-react'
import { Input } from '../../components/ui/input.jsx';
import { useNavigate } from 'react-router';

export default function SearchInput({ setSearchParams, q }) {
  const nav = useNavigate();
  const [searchInput, setSearchInput] = useState(q || "");

  const handleSearch = (e) => {
    e.preventDefault();


    const params = new URLSearchParams();

    if (searchInput.trim()) {
      params.set("q", searchInput.trim());
    } else {
      delete params.q;
    }

    params.set("page", "1");
    nav(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchInput("");

    // Create new URLSearchParams
    const params = new URLSearchParams();

    // Reset page to 1 (optional)
    params.set("page", "1");

    // Update the URL
    setSearchParams(params);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <InputGroup className="mx-auto w-full max-w-3xs ">
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pr-10"
            style={{ outline: "none", boxShadow: "none" }} />
          <InputRightElement>
            {searchInput ? (<button
              type='button'
              onClick={handleClear}
              className="pointer-events-auto text-gray-500 hover:text-black"
            >
              ✕
            </button>) : (<SearchIcon className="h-4 w-4 text-gray-400 pointer-events-none" />)}
          </InputRightElement>
        </InputGroup>
      </form>
    </div>
  )
}
