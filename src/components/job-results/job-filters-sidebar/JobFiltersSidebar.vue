<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary"></action-button>
        </div>
      </div>

      <accordion header="Degree" />

      <accordion header="Job types">
        <p>Placeholder for now</p>
      </accordion>

      <job-filters-sidebar-organizations />
    </section>
  </div>
</template>

<script>
import Accordion from "@/components/shared/Accordion.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import JobFiltersSidebarOrganizations from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue";

export default {
  name: "JobFiltersSidebar",
  components: {
    Accordion,
    ActionButton,
    JobFiltersSidebarOrganizations,
  },
};
</script>
