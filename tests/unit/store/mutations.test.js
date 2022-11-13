import mutations from "@/store/mutations";

describe("Mutations", () => {
  describe("LOGIN_USER", () => {
    it("Logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("Receives jobs from an API response", () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, ["Job 1", "Job 2"]);
      expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("Updates organizations that the user has chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, [
        "Organization 1",
        "Organization 2",
      ]);

      expect(state).toEqual({
        selectedOrganizations: ["Organization 1", "Organization 2"],
      });
    });
  });
});
