import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

const mutations = {
  [LOGIN_USER](state: GlobalState) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state: GlobalState, jobs: Job[]) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state: GlobalState, newOrganizations: string[]) {
    state.selectedOrganizations = newOrganizations;
  },
  [ADD_SELECTED_JOB_TYPES](state: GlobalState, newJobTypes: string[]) {
    state.selectedJobTypes = newJobTypes;
  },
};

export default mutations;
