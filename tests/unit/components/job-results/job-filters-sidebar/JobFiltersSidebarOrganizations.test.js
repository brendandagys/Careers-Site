import { mount } from "@vue/test-utils";

import JobFiltersSidebarOrganizations from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

describe("JobFiltersSidebarOrganizations", () => {
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

  it("Renders a unique list of organizations for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
      },
    };

    const $router = { push: jest.fn() };

    const wrapper = mount(
      JobFiltersSidebarOrganizations,
      createConfig($store, $router)
    );

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());

    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  describe("When the user clicks a checkbox", () => {
    it("Communicates that the user has selected an organization checkbox", async () => {
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
        },
        commit: jest.fn(),
      };

      const $router = { push: jest.fn() };

      const wrapper = mount(
        JobFiltersSidebarOrganizations,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect($store.commit).toHaveBeenCalledWith(ADD_SELECTED_ORGANIZATIONS, [
        "Google",
      ]);
    });

    it("Navigates the user to the job results page to see new filtered jobs", async () => {
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
        },
        commit: jest.fn(),
      };

      const $router = { push: jest.fn() };

      const wrapper = mount(
        JobFiltersSidebarOrganizations,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
