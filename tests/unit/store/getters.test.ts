import getters from "@/store/getters";
import { createJob, createState } from "./utils";

describe("Getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("Finds unique organizations from a list of jobs", () => {
      const jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];

      const state = createState({ jobs });
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("Finds unique job types from a list of jobs", () => {
      const jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Temporary" }),
        createJob({ jobType: "Temporary" }),
      ];

      const state = createState({ jobs });
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("When the user has not selected any organizations", () => {
      it("Includes job", () => {
        const state = createState({ selectedOrganizations: [] });

        const job = createJob({ organization: "Google" });
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);

        expect(includeJob).toBe(true);
      });

      it("Identifies if the job is associated with the given organizations", () => {
        const state = createState({
          selectedOrganizations: ["Google", "Amazon"],
        });

        const job = createJob({ organization: "Google" });
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);

        expect(includeJob).toBe(true);
      });
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("When the user has not selected any job types", () => {
      it("Includes job", () => {
        const state = createState({ selectedJobTypes: [] });

        const job = createJob({ organization: "Full-time" });
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);

        expect(includeJob).toBe(true);
      });

      it("Identifies if the job is associated with the given job types", () => {
        const state = createState({
          selectedJobTypes: ["Full-time", "Part-time"],
        });

        const job = createJob({ jobType: "Part-time" });
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);

        expect(includeJob).toBe(true);
      });
    });
  });

  describe("FILTERED_JOBS", () => {
    it("Filters jobs by organization and job type", () => {
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_ORGANIZATION,
      };

      const job = createJob({ id: 1, title: "Best job ever" });
      const state = createState({ jobs: [job] });
      const result = getters.FILTERED_JOBS(state, mockGetters);

      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
