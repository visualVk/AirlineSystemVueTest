<template>
  <div>
    <ServiceClientDisplayMain></ServiceClientDisplayMain>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ServiceClientDisplayMain from "@/components/serviceClient/ServiceClientDisplayMain.vue";

export default defineComponent({
  components: {
    ServiceClientDisplayMain,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>