const getBasePath = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ally-api.onrender.com";

  return base_url;
};

export default getBasePath;
