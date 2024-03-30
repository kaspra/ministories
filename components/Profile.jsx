import PromptCard from "./PromptCard";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left pb-8">{desc}</p>

      <ImageList variant="masonry" cols={3} gap={16}>
        {data.map((post) => (
          <ImageListItem key={post.tag}>
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </section>
  );
};

export default Profile;
