<template>
  <div style="width: 100%">
    <SearchListTitle></SearchListTitle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchListTitle from "@/components/searchList/SearchListTitle/SearchListTitle.vue";
export default defineComponent({
  components: {
    SearchListTitle,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>