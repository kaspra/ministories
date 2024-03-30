import Link from "next/link";
import { FileInput, Label } from "flowbite-react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const ImgConvertor = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPost({ img: reader.result });
    };
  };

  const hashtagcreator = (str) => {
    const hashtag = str.trim().replace(/#/g, "");
    if (hashtag) {
      setPost({ ...post, tag: hashtag });
    } else {
      setPost({ ...post, tag: str.trim() });
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left px-4">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md px-4">
        {type} and share amazing stories with the world, and let your
        imagination run wild with MiniStories
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <div className="mb-2 block">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Upload Storie Pic
            </span>
          </div>
          <FileInput
            id="file-upload"
            accept="image/*"
            onChange={ImgConvertor}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Storie Title
          </span>
          <input
            type="text"
            value={post.title}
            placeholder="Title goes here"
            required
            className="form_input"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Storie
          </span>

          <textarea
            rows="5"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your storie here"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Storie{" "}
            <span className="font-normal">(adventure, horror, kids, etc.)</span>
          </span>
          <input
            type="text"
            value={post.tag}
            placeholder="Tag"
            required
            className="form_input"
            onChange={(e) => hashtagcreator(e.target.value)}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm blue_btn rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
