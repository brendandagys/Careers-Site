import { mount } from "@vue/test-utils";

import ActionButton from "@/components/shared/ActionButton";

describe("ActionButton", () => {
  it("Renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I can be clicked",
        type: "primary",
      },
    });

    expect(wrapper.text()).toMatch("I can be clicked");
  });

  it("Applies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I can be clicked",
        type: "primary",
      },
    });

    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
