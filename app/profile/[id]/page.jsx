"use client";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
      setLoading(false);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page.`}
      data={userPosts}
      loading={loading}
    />
  );
};

export default UserProfile;
