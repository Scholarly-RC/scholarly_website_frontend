<script setup>
import FeatureItem from "./FeatureItem.vue";

const props = defineProps({
	feature_items: [Object],
});
</script>

<template>
  <div
    class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
  >
    <FeatureItem
      v-for="(item, index) in props.feature_items"
      :key="index"
      :feature_item="item"
    />
  </div>
</template>
ß
