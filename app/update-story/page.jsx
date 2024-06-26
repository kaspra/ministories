"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditStory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    img: "",
    title: "",
    story: "",
    tag: "",
  });

  useEffect(() => {
    const getStoryDetails = async () => {
      const response = await fetch(`/api/story/${storyId}`);
      const data = await response.json();
      setPost({
        img: data.img,
        title: data.title,
        story: data.story,
        tag: data.tag,
      });
    };

    if (storyId) getStoryDetails();
  }, [storyId]);

  const updateStory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!storyId) return alert("Missing StoryId!");

    try {
      const response = await fetch(`/api/story/${storyId}`, {
        method: "PATCH",
        body: JSON.stringify({
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
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateStory}
      />
    </Suspense>
  );
};

export default EditStory;
