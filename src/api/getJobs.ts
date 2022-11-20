import axios from "axios";
import { Job } from "./types";

const getJobs = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const { data } = await axios.get<Job[]>(`${baseUrl}/jobs`);
  return data;
};

export default getJobs;
