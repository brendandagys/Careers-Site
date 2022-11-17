import { useRoute } from "vue-router";
jest.mock("vue-router");

import useConfirmRoute from "@/composables/useConfirmRoute";

describe("useConfirmRoute", () => {
  it("Determines if the page route matches the specified route", () => {
    useRoute.mockReturnValue({ name: "Home" });
    const routeName = "Home";
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
