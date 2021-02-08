<template>
  <div class="container">
    <ServiceSearchBar></ServiceSearchBar>
    <ServiceHotQUestion></ServiceHotQUestion>
    <ServiceCommonQuestion></ServiceCommonQuestion>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ServiceSearchBar from "@/components/serviceClient/ServiceSearchBar/ServiceSearchBar.vue";
import ServiceHotQUestion from "@/components/serviceClient/ServiceHotQuestion/ServiceHotQuestion.vue";
import ServiceCommonQuestion from "@/components/serviceClient/ServiceCommonQuestion/ServiceCommonQuestion.vue";
export default defineComponent({
  components: {
    ServiceSearchBar,
    ServiceHotQUestion,
    ServiceCommonQuestion,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  width: inherit;
}
</style>