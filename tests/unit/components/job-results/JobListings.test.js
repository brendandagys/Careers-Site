import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";

import JobListings from "@/components/job-results/JobListings.vue";

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createStore = (config = {}) => ({
    getters: { FILTERED_JOBS_BY_ORGANIZATIONS: [] },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("When the component mounts", () => {
    it("Makes a call to fetch jobs from the API", () => {
      const $route = createRoute();
      const $store = createStore({ dispatch: jest.fn() });
      shallowMount(JobListings, createConfig($route, $store));
      expect($store.dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("Creates a job listing for a maximum of 10 jobs", async () => {
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    const numJobsInStore = 15;
    const $store = createStore({
      getters: {
        FILTERED_JOBS_BY_ORGANIZATIONS: Array(numJobsInStore).fill({}),
      },
    });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");

    expect(jobListings).toHaveLength(10);
  });

  describe("When query params exclude the page number", () => {
    it("Displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));

      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("When query params include the page number", () => {
    it("Displays page number", () => {
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("When user is on the first page of job results", () => {
    it("Does not show a link to the previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("Shows a link to the next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS_BY_ORGANIZATIONS: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("When the user is on the last page of job results", () => {
    it("Does not show a link to the next page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS_BY_ORGANIZATIONS: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("Shows a link to the previous page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS_BY_ORGANIZATIONS: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
