import axios from "axios";

/**
 * Fetches the URL of an image from the Picsum API.
 * @returns string The URL of the image.
 */
export const fetchImageUrl = async () => {
    try {
      const response = await axios.get('https://picsum.photos/200', {
        responseType: 'blob',
      });
      return response?.request?.responseURL;
    } catch (error) {
      console.log("error: ", error);
      return ""
    }
};


  
/**
 * Fetches a specified number of images.
 *
 * @param count - The number of images to fetch.
 * @returns A promise that resolves to an array of fetched images.
 */
export const fetchImages = async (count: number) => {
    const newImages: any = [];
    for (let i = 0; i < 10; i++) {
    const imageUrl = await fetchImageUrl();
    imageUrl && newImages.push({ url: imageUrl, key: Date.now() + i });
    }
    // console.log("newImages: ....", newImages)
    return newImages;
};
  