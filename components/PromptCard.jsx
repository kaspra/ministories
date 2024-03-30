"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [isToggled, setIsToggled] = useState([]);
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const ToggleFullView = (id) => {
    setIsToggled((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          {post.creator.image && (
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          )}

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>
      </div>
      {post.img && (
        <div className="relative mt-3 h-60 w-full">
          <Image
            className="object-cover rounded-lg"
            src={post.img}
            alt="Poster"
            layout="fill"
          />
        </div>
      )}
      {post.title && (
        <p className="my-2 font-satoshi text-gray-950 font-semibold text-center text-balance">
          {post.title}
        </p>
      )}

      <div className="my-2 font-satoshi text-sm text-gray-700">
        <p className={`${!isToggled.includes(post.tag) && "line-clamp-5"}`}>
          {post.prompt}
        </p>
        {post.prompt.length > 200 && (
          <span
            className="cursor-pointer font-semibold text-[14px]"
            onClick={() => ToggleFullView(post.tag)}
          >
            {isToggled.includes(post.tag) ? "Read less" : "Read more"}
          </span>
        )}
      </div>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
