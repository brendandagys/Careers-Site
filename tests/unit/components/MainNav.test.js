import { mount } from "@vue/test-utils";

import MainNav from "@/components/MainNav";

describe("MainNav", () => {
  it("Displays company name", async () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Bobo Careers");
  });
});
