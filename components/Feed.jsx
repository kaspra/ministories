"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed flex justify-center w-full">
      <form className="relative w-full flex-center flex-col">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={[]}
          onChange={{}}
          required
          className="search_input peer md:max-w-[576px]"
        />

        <PromptCardList data={allPosts} handleTagClick={{}} />
      </form>
    </section>
  );
};

export default Feed;
