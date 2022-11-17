import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import JobFiltersSidebarCheckboxGroup from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup";

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Some header",
      uniquevalues: new Set(["ValueA", "ValueB"]),
      mutation: "Some mutation",
      ...props,
    },
  });

  it("Renders a unique list of job types for filtering jobs", async () => {
    const props = {
      uniqueValues: new Set(["ValueA", "ValueB"]),
    };
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig(props));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());

    expect(inputValues).toEqual(["ValueA", "ValueB"]);
  });

  describe("When the user clicks a checkbox", () => {
    it("Communicates that the user has selected a job type checkbox", async () => {
      const commit = jest.fn();

      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });

      const props = {
        mutation: "SOME_MUTATION",
        uniqueValues: new Set(["Full-time"]),
      };

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Full-time"]);
    });

    it("Navigates the user to the job results page to see new filtered jobs", async () => {
      useStore.mockReturnValue({ commit: jest.fn() });

      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const props = {
        uniqueValues: new Set(["Full-time"]),
      };

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
