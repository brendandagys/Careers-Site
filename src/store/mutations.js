import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants";

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, newOrganizations) {
    state.selectedOrganizations = newOrganizations;
  },
  [ADD_SELECTED_JOB_TYPES](state, newJobTypes) {
    state.selectedJobTypes = newJobTypes;
  },
};

export default mutations;
