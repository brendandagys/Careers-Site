import { GlobalState } from "@/store/types";

const state = (): GlobalState => ({
  isLoggedIn: false,
  jobs: [],
  selectedOrganizations: [],
  selectedJobTypes: [],
});

export default state;
