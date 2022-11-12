import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import Spotlight from "@/components/job-search/Spotlight";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "Some image",
          title: "Some title",
          description: "Some description",
          ...data,
        },
      ],
    });
  };

  it("Provides the `img` attribute to the parent component", async () => {
    mockSpotlightResponse({ img: "Some image" });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps"><h1>{{ slotProps.img }}</h1></template>`,
      },
    });

    await flushPromises();

    expect(wrapper.text()).toMatch("Some image");
  });

  it("Provides the `title` attribute to the parent component", async () => {
    mockSpotlightResponse({ title: "Some title" });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps"><h1>{{ slotProps.title }}</h1></template>`,
      },
    });

    await flushPromises();

    expect(wrapper.text()).toMatch("Some title");
  });

  it("Provides the `description` attribute to the parent component", async () => {
    mockSpotlightResponse({ description: "Some description" });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps"><h1>{{ slotProps.description }}</h1></template>`,
      },
    });

    await flushPromises();

    expect(wrapper.text()).toMatch("Some description");
  });
});
