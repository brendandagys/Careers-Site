import { mount } from "@vue/test-utils";

import Subnav from "@/components/navigation/Subnav";

describe("Subnav", () => {
  const createConfig = (routeName, $store = {}) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("When user is on the job page", () => {
    it("Displays job count", () => {
      const routeName = "JobResults";
      const $store = {
        getters: { FILTERED_JOBS_BY_ORGANIZATIONS: [{ id: 1 }, { id: 2 }] },
      };
      const wrapper = mount(Subnav, createConfig(routeName, $store));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toBe("2 jobs matched");
    });
  });

  describe("When user is not on the job page", () => {
    it("Does not display job count", () => {
      const routeName = "Home";
      const wrapper = mount(Subnav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
