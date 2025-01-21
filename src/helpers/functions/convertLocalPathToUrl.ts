import { baseUrl } from "../axios/axiosInstance";
// import { baseUrlForUploads } from "../axios/axiosInstance";


export const convertLocalPathToUrl = (localPath: string) => {
  return `${baseUrl}${localPath?.split("/var/www/")[1]}`;
};
