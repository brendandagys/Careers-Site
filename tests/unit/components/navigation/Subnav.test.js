import { mount } from "@vue/test-utils";

import { useFilteredJobs } from "@/store/composables";
jest.mock("@/store/composables");

import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

import Subnav from "@/components/navigation/Subnav";

describe("Subnav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("When user is on the job page", () => {
    it("Displays job count", () => {
      useConfirmRoute.mockReturnValue(true); // Works, even if not in a `ref()`
      useFilteredJobs.mockReturnValue([{ id: 1 }, { id: 2 }]);

      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toBe("2 jobs matched");
    });
  });

  describe("When user is not on the job page", () => {
    it("Does not display job count", () => {
      useConfirmRoute.mockReturnValue(false);
      useFilteredJobs.mockReturnValue([]);

      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
