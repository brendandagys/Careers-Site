import { state, mutations, actions } from "@/store";
import getJobs from "@/api/getJobs";

jest.mock("@/api/getJobs");

describe("State", () => {
  it("Keeps track of whether or not the user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("Stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });
});

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
});

describe("Actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([
        {
          id: 1,
          title: "Software engineer",
        },
      ]);
    });

    it("Makes a request to fetch jobs", async () => {
      const context = { commit: jest.fn() };

      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("Sends message to save received jobs in the Vuex store", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(context.commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        { id: 1, title: "Software engineer" },
      ]);
    });
  });
});
