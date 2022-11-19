import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFetchJobsDispatch,
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
} from "@/store/composables";

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("Retrieves filtered jobs from store", () => {
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });

      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("Retrieves unique job types from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time"]),
        },
      });

      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(["Full-time"]));
    });
  });

  describe("useUniqueOrganizations", () => {
    it("Retrieves unique organizations from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Apple"]),
        },
      });

      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(["Apple"]));
    });
  });

  describe("useFetchJobsDispatch", () => {
    it("Sends a call a fetch jobs from the API", () => {
      const dispatch = jest.fn();

      useStore.mockReturnValue({
        dispatch,
      });

      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });
});
