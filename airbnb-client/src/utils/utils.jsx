export function isImageUrl(url) {
  const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i;
  // const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

  return imageUrlRegex.test(url);
}

// export async function isImageUrl(url) {
//   const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|tiff)(\?.*)?$/i;

//   try {
//     const response = await axios.head(url);

//     const contentType = response.headers["content-type"];

//     return (
//       contentType?.startsWith("image/") ||
//       (contentType?.startsWith("application/json") &&
//         imageUrlRegex.test(`${url}`))
//     );
//   } catch (error) {
//     return false;
//   }
// }
