/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["backend", "ally-image-bucket.s3.ap-northeast-1.amazonaws.com"],
  },
};
