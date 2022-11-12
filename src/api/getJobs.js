import axios from "axios";

const getJobs = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const { data } = await axios.get(`${baseUrl}/jobs`);
  return data;
};

export default getJobs;
