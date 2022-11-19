import { useRoute } from "vue-router";
jest.mock("vue-router");

import useCurrentPage from "@/composables/useCurrentPage";

describe("useCurrentPage", () => {
  describe("When the query params include the page", () => {
    it("Returns the page", () => {
      useRoute.mockReturnValue({
        query: {
          page: "5",
        },
      });

      const result = useCurrentPage();
      expect(result.value).toBe(5);
    });
  });

  describe("When the query params exclude the page", () => {
    it("Defaults to page 1", () => {
      useRoute.mockReturnValue({
        query: {},
      });

      const result = useCurrentPage();
      expect(result.value).toBe(1);
    });
  });
});
