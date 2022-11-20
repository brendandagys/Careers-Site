import { useRoute } from "vue-router";
jest.mock("vue-router");

import useCurrentPage from "@/composables/useCurrentPage";

const useRouteMock = useRoute as jest.Mock;

describe("useCurrentPage", () => {
  describe("When the query params include the page", () => {
    it("Returns the page", () => {
      useRouteMock.mockReturnValue({
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
      useRouteMock.mockReturnValue({
        query: {},
      });

      const result = useCurrentPage();
      expect(result.value).toBe(1);
    });
  });
});
