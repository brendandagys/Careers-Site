import mutations from "@/store/mutations";
import { createJob, createState } from "./utils";

describe("Mutations", () => {
  describe("LOGIN_USER", () => {
    it("Logs the user in", () => {
      const startingState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(startingState);
      expect(startingState.isLoggedIn).toBe(true);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("Receives jobs from an API response", () => {
      const startingState = createState({ jobs: [] });
      const jobOne = createJob();
      const jobTwo = createJob();
      mutations.RECEIVE_JOBS(startingState, [jobOne, jobTwo]);
      expect(startingState.jobs).toEqual([jobOne, jobTwo]);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("Updates organizations that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedOrganizations: [] });
      mutations.ADD_SELECTED_ORGANIZATIONS(startingState, [
        "Organization 1",
        "Organization 2",
      ]);

      expect(startingState.selectedOrganizations).toEqual([
        "Organization 1",
        "Organization 2",
      ]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("Updates job types that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedJobTypes: [] });
      mutations.ADD_SELECTED_JOB_TYPES(startingState, [
        "Full-time",
        "Part-time",
      ]);

      expect(startingState.selectedJobTypes).toEqual([
        "Full-time",
        "Part-time",
      ]);
    });
  });
});
