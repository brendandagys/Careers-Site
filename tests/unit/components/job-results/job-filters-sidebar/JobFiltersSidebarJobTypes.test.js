import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueJobTypes } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSidebarJobTypes from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("Renders a unique list of job types for filtering jobs", async () => {
    useUniqueJobTypes.mockReturnValue(new Set(["Full-time", "Part-time"]));

    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());

    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("When the user clicks a checkbox", () => {
    it("Communicates that the user has selected a job type checkbox", async () => {
      useUniqueJobTypes.mockReturnValue(new Set(["Full-time", "Part-time"]));

      const commit = jest.fn();

      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith(ADD_SELECTED_JOB_TYPES, [
        "Full-time",
      ]);
    });

    it("Navigates the user to the job results page to see new filtered jobs", async () => {
      useUniqueJobTypes.mockReturnValue(new Set(["Full-time", "Part-time"]));

      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
