import { mount } from "@vue/test-utils";

import TextInput from "@/components/shared/TextInput.vue";

describe("TextInput", () => {
  it("Communicates that the user has entered a character", () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = wrapper.find("input");

    input.setValue("B");
    input.setValue("Br");
    input.setValue("Bre");

    const messages = wrapper.emitted()["update:modelValue"];

    expect(messages).toEqual([["B"], ["Br"], ["Bre"]]);
  });
});
