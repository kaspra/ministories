import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Image
        src={"assets/icons/loader.svg"}
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
};

export default Loader;
