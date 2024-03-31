"use client";
import { useState, useEffect } from "react";
import StoryCard from "./StoryCard";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const StoryCardList = ({ data, handleTagClick }) => {
  return (
    <>
      <div className="hidden md:flex">
        <ImageList variant="masonry" cols={3} gap={12}>
          {data.map((post) => (
            <ImageListItem key={post._id}>
              <StoryCard
                key={post.id}
                post={post}
                handleTagClick={handleTagClick}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <div className="flex flex-col md:hidden">
        <ImageList variant="masonry" cols={1} gap={12}>
          {data.map((post) => (
            <ImageListItem key={post._id}>
              <StoryCard
                key={post.id}
                post={post}
                handleTagClick={handleTagClick}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/story");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterstories = (searchText) => {
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
        const searchResults = filterstories(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterstories(tagName);
    setSearchResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center flex-col">
        <div className="flex w-full justify-center items-center flex-col">
          <div className="search_input mb-16">
            <svg
              className="w-4 h-4 text-gray-500"
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
              className="border-none placeholder:font-light placeholder:text-gray-400 w-full focus:border-none focus:outline-none"
            />
          </div>
          <div>
            {searchText ? (
              <StoryCardList
                data={searchedResults}
                handleTagClick={handleTagClick}
              />
            ) : (
              <StoryCardList data={allPosts} handleTagClick={handleTagClick} />
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Feed;
