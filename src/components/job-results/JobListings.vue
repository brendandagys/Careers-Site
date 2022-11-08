<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing />
      <job-listing />
      <job-listing />
    </ol>
  </main>
</template>

<script>
import JobListing from "@/components/job-results/JobListing.vue";
export default {
  name: "JobListings",
  components: {
    JobListing,
  },
};
</script>
