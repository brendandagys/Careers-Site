import getters from "@/store/getters";

describe("Getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("Finds unique organizations from a list of jobs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };

      const result = getters.UNIQUE_ORGANIZATIONS(state);

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("Identifies jobs that are associated with the given organizations", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ],
        selectedOrganizations: ["Google", "Microsoft"],
      };

      const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);

      expect(filteredJobs).toEqual([
        { organization: "Google" },
        { organization: "Microsoft" },
      ]);
    });

    describe("When the user has not selected any organizations", () => {
      it("Returns all jobs", () => {
        const state = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Microsoft" },
          ],
          selectedOrganizations: [],
        };

        const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);

        expect(filteredJobs).toBe(state.jobs);
      });
    });
  });
});
