import StoryCard from "./StoryCard";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Loader from "./Loader";
import IsMobile from "../hooks/IsMobile";

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
  const isMobile = IsMobile();

  return (
    <section className="w-full px-1 md:px-5 mt-6">
      <div className="w-full text-left">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left pb-8">{desc}</p>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : isMobile ? (
          <div className="flex flex-col">
            <ImageList
              variant="masonry"
              cols={1}
              gap={12}
              className="flex flex-col md:hidden"
            >
              {data.map((post) => (
                <ImageListItem key={post._id}>
                  <StoryCard
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        ) : (
          <ImageList
            variant="masonry"
            cols={3}
            gap={12}
            className="hidden md:flex"
          >
            {data.map((post) => (
              <ImageListItem key={post._id}>
                <StoryCard
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
