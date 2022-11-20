<template>
  <hero />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Hero from "@/components/job-search/Hero.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Hero,
  },
});
</script>
