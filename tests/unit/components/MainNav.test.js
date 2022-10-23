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

  describe("When user is logged out", () => {
    it("Prompts the user to sign in", () => {
      const wrapper = mount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("When user logs in", () => {
    it("Displays user profile picture", async () => {
      const wrapper = mount(MainNav);
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
  });
});