<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-solid border-brand-gray-3 rounded-3xl select-none"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-5 mr-3" />

    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label class="absolute left-0 -top-10">Role</label>
        <text-input v-model="role" placeholder="Software engineer" />
      </div>

      <span
        class="flex items-center h-full px-3 border-l border-r border-brand-gray-3"
      >
        in
      </span>

      <div class="relative flex items-center flex-1 h-full pl-3">
        <label class="absolute left-3 -top-10">Where?</label>
        <text-input v-model="location" placeholder="Los Angeles" />
      </div>
    </div>

    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from "@/components/shared/ActionButton.vue";
import TextInput from "@/components/shared/TextInput.vue";

export default {
  name: "JobSearchForm",
  components: {
    ActionButton,
    TextInput,
  },
  data() {
    return {
      role: "",
      location: "",
    };
  },
};
</script>
