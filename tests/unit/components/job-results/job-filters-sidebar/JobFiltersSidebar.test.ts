import { shallowMount } from "@vue/test-utils";

import { useUniqueJobTypes, useUniqueOrganizations } from "@/store/composables";
jest.mock("@/store/composables");

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

import JobFiltersSidebar from "@/components/job-results/job-filters-sidebar/JobFiltersSidebar.vue";

describe("JobFiltersSidebar", () => {
  it("Allows the user to filter jobs by job types", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["AirBnB"]));

    const wrapper = shallowMount(JobFiltersSidebar);
    const jobTypesFilter = wrapper.findComponent(
      "[data-test='job-types-filter']"
    );

    // @ts-ignore
    const { header, uniqueValues, mutation } = jobTypesFilter.props();

    expect(header).toBe("Job Types");
    expect(uniqueValues).toEqual(new Set(["Full-time", "Part-time"]));
    expect(mutation).toBe("ADD_SELECTED_JOB_TYPES");
  });

  it("Allows the user to filter jobs by organization", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["AirBnB"]));

    const wrapper = shallowMount(JobFiltersSidebar);
    const organizationsFilter = wrapper.findComponent(
      "[data-test='organizations-filter']"
    );

    // @ts-ignore
    const { header, uniqueValues, mutation } = organizationsFilter.props();

    expect(header).toBe("Organizations");
    expect(uniqueValues).toEqual(new Set(["AirBnB"]));
    expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  });
});
