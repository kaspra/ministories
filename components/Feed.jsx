"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const PromptCardList = ({ data, handleTagClick }) => {
  // const [width, setWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <ImageList variant="masonry" cols={3} gap={12}>
      {data.map((post) => (
        <ImageListItem key={post.tag}>
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center flex-col pb-12">
        <div className="flex w-full justify-center items-center">
          <div className="search_input">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for Title or UserName"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="border-none w-full focus:outline-none"
            />
          </div>
        </div>
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
