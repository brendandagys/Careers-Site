import { mount } from "@vue/test-utils";

import Accordion from "@/components/shared/Accordion";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Test Header",
    },
    slots: {
      default: "<h3>My nested child</h3>",
    },
    ...config,
  });

  it("Renders child", async () => {
    const wrapper = mount(
      Accordion,
      createConfig({
        slots: {
          default: "<h3>My nested child</h3>",
        },
      })
    );

    expect(wrapper.text()).not.toMatch("My nested child");

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    expect(wrapper.text()).toMatch("My nested child");
  });

  describe("When we do not provide custom child content", () => {
    it("Renders default content", async () => {
      const wrapper = mount(Accordion, createConfig({ slots: {} }));

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      expect(wrapper.text()).toMatch("No options available.");
    });
  });
});
