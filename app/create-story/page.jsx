"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateStory = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    img: "",
    title: "",
    story: "",
    tag: "",
  });

  const createStory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/story/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          img: post.img,
          title: post.title,
          story: post.story,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createStory}
    />
  );
};

export default CreateStory;
