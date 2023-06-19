/** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/blog/:slug",
//         headers: [
//           {
//             key: "x-slug",
//             value: ":slug", // Matched parameters can be used in the value
//           },
//           {
//             key: "x-slug-:slug", // Matched parameters can be used in the key
//             value: "my other custom header value",
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           // { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value: "*",
//           },
//         ],
//       },
//     ];
//   },
// };

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://my-open-ai-backend.vercel.app/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
