import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center sm:text-sm md:text-4xl">
      MiniStories{` `}
      <br className="max-md:hidden" />
      <span className="blue_gradient text-center">
        Unleash Your Imagination
      </span>
      <br className="max-md:hidden" />
    </h1>
    <p className="desc text-center">
      Ministories: Explore a world of bite-sized tales. Share your mini
      masterpieces and connect with a vibrant storytelling community. Unleash
      your creativity today!
    </p>
    <Feed />
  </section>
);

export default Home;
