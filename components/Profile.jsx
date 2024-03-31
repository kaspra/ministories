import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return (
    <section className="w-full px-1 md:px-5 mt-6">
      <div className="w-full text-left">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left pb-8">{desc}</p>
      </div>
      <div>
        {width < 450 ? (
          <ImageList variant="masonry" cols={1} gap={12}>
            {data.map((post) => (
              <ImageListItem key={post._id}>
                <PromptCard
                  key={post._id}
                  post={post}
                  handleEdit={() => handleEdit && handleEdit(post)}
                  handleDelete={() => handleDelete && handleDelete(post)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <ImageList variant="masonry" cols={3} gap={12}>
            {data.map((post) => (
              <ImageListItem key={post._id}>
                <PromptCard
                  key={post._id}
                  post={post}
                  handleEdit={() => handleEdit && handleEdit(post)}
                  handleDelete={() => handleDelete && handleDelete(post)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </div>
    </section>
  );
};

export default Profile;
