import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/job-results/JobListing.vue";
import { Job } from "@/api/types";

import { createJob } from "../../store/utils";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    props: { job: { ...job } },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("Renders job title", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJob({ title: "Vue Developer" }))
    );

    expect(wrapper.text()).toMatch("Vue Developer");
  });

  it("Renders job organization", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJob({ organization: "AirBnB" }))
    );

    expect(wrapper.text()).toMatch("AirBnB");
  });

  it("Renders job locations", () => {
    const job = createJob({ locations: ["Orlando", "Jacksonville"] });

    const wrapper = mount(JobListing, createConfig(job));

    expect(wrapper.text()).toMatch("Orlando");
    expect(wrapper.text()).toMatch("Jacksonville");
  });

  it("Renders job qualifications", () => {
    const job = createJob({
      minimumQualifications: ["Code", "Develop"],
    });

    const wrapper = mount(JobListing, createConfig(job));

    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Develop");
  });

  it("Links to individual job's page", () => {
    const job = createJob({ id: 15 });

    const wrapper = mount(JobListing, createConfig(job));

    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");

    expect(toProp).toBe("/jobs/results/15");
  });
});
