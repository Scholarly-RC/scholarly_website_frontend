<script setup>
import {
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

const props = defineProps({
	faq_item: Object,
});
</script>

<template>
  <AccordionItem :value="faq_item.id || faq_item.question">
    <AccordionTrigger class="text-left">
      {{ props.faq_item.question }}
    </AccordionTrigger>
    <AccordionContent>
      <p class="mb-2 text-gray-600 dark:text-gray-300">{{ props.faq_item.answer }}</p>
    </AccordionContent>
  </AccordionItem>
</template>
