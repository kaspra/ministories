"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
      setLoading(false);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-story?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Story?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/story/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      loading={loading}
    />
  );
};

export default MyProfile;
