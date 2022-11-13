import { mount } from "@vue/test-utils";

import JobFiltersSidebarJobTypes from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("Renders a unique list of job types for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
      },
    };

    const $router = {
      push: jest.fn(),
    };

    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router)
    );

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());

    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("When the user clicks a checkbox", () => {
    it("Communicates that the user has selected a job type checkbox", async () => {
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
        },
        commit: jest.fn(),
      };

      const $router = {
        push: jest.fn(),
      };

      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect($store.commit).toHaveBeenCalledWith(ADD_SELECTED_JOB_TYPES, [
        "Full-time",
      ]);
    });

    it("Navigates the user to the job results page to see new filtered jobs", async () => {
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
        },
        commit: jest.fn(),
      };

      const $router = {
        push: jest.fn(),
      };

      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
