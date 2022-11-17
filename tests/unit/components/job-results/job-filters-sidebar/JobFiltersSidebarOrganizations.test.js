import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueOrganizations } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSidebarOrganizations from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("Renders a unique list of organizations for filtering jobs", async () => {
    useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));

    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());

    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  describe("When the user clicks a checkbox", () => {
    it("Communicates that the user has selected an organization checkbox", async () => {
      useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));

      const commit = jest.fn();

      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect(commit).toHaveBeenCalledWith(ADD_SELECTED_ORGANIZATIONS, [
        "Google",
      ]);
    });

    it("Navigates the user to the job results page to see new filtered jobs", async () => {
      useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
      useStore.mockReturnValue({ commit: jest.fn() });

      const push = jest.fn();

      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
