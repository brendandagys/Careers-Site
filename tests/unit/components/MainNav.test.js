import { mount } from "@vue/test-utils";

import MainNav from "@/components/MainNav";

describe("MainNav", () => {
  it("Displays company name", async () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("ABC Careers");
  });

  it("Displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at ABC",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });
});
