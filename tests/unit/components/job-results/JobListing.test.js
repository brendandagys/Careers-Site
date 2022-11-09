import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/job-results/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    locations: ["Chicago"],
    minimumQualifications: ["Reading"],
    ...jobProps,
  });

  const createConfig = (jobProps) => ({
    props: {
      job: jobProps,
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("Renders job title", () => {
    const wrapper = mount(JobListing, createConfig(createJobProps()));
    expect(wrapper.text()).toMatch("Vue Developer");
  });

  it("Renders job organization", () => {
    const wrapper = mount(JobListing, createConfig(createJobProps()));
    expect(wrapper.text()).toMatch("AirBnB");
  });

  it("Renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Orlando", "Jacksonville"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Orlando");
    expect(wrapper.text()).toMatch("Jacksonville");
  });

  it("Renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Code", "Develop"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Develop");
  });

  it("Links to individual job's page", () => {
    const jobProps = createJobProps({
      id: 15,
    });

    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
