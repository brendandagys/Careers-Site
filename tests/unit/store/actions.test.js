import actions from "@/store/actions";

import getJobs from "@/api/getJobs";
jest.mock("@/api/getJobs");

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
