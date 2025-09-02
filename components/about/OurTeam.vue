<script setup>
import Founder from "./Founder.vue";
import TeamMember from "./TeamMember.vue";

const config = useRuntimeConfig();
const {
  data: our_team_header_data,
  status: our_team_header_status,
  error: our_team_header_error,
} = useFetch(`${config.public.apiBaseUrl}/items/our_team_header/`, {
  method: "get",
  server: true,
});
const {
  data: our_team_members_data,
  status: our_team_members_status,
  error: our_team_members_error,
} = useFetch(`${config.public.apiBaseUrl}/items/our_team_members/`, {
  method: "get",
  server: true,
});

const columnedMembers = computed(() => {
  const columnCount = 2;
  const result = Array.from({ length: columnCount }, () => []);

  our_team_members_data.value?.data.forEach((member, index) => {
    const columnIndex = index % columnCount;
    result[columnIndex].push(member);
  });

  return result;
});
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-lg text-center lg:py-16 lg:px-6">
      <div
        v-if="our_team_header_status === 'pending'"
        class="mx-auto mb-8 max-w-screen-sm lg:mb-16"
      >
        <div class="h-10 w-3/4 bg-gray-400 rounded mb-4 mx-auto"></div>
        <div class="h-6 w-full bg-gray-300 rounded mx-auto"></div>
      </div>
      <div v-else class="mx-auto mb-8 max-w-screen-lg">
        <div v-show="our_team_header_data?.data?.status === 'published'">
          <p
            class="mb-4 font-light text-gray-500 sm:text-xl dark:text-gray-400"
          >
            {{ our_team_header_data.data.description }}
          </p>
          <div class="inline-flex items-center justify-center w-full">
            <hr
              class="w-full h-px my-8 bg-gray-200 border-1 dark:bg-gray-700"
            />
            <span
              class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
            >
              <h2
                class="text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white"
              >
                {{ our_team_header_data.data.founders_section_title }}
              </h2>
            </span>
          </div>
          <Founder />
        </div>
      </div>
      <div
        v-if="our_team_members_status === 'pending'"
        class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3"
      >
        <div
          v-for="_ in Array(3)"
          :key="_"
          class="text-center text-gray-500 dark:text-gray-400"
        >
          <div class="mx-auto mb-4 w-36 h-36 rounded-full bg-gray-300"></div>
          <div class="h-6 w-1/2 bg-gray-400 rounded mx-auto mb-1"></div>
          <div class="h-4 w-1/3 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
      <div v-else>
        <div class="my-4 inline-flex items-center justify-center w-full">
          <hr class="w-full h-px my-8 bg-gray-200 border-1 dark:bg-gray-700" />
          <span
            class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
          >
            <h2
              class="text-xl tracking-tight font-extrabold text-gray-900 dark:text-white"
            >
              {{ our_team_header_data.data.non_founders_section_title }}
            </h2>
          </span>
        </div>
        <div class="hidden md:flex gap-8 lg:gap-10">
          <div
            v-for="(column, index) in columnedMembers"
            :key="index"
            class="flex-1 flex flex-col gap-8 lg:gap-10"
          >
            <TeamMember
              v-for="team_member in column"
              :key="team_member.id"
              :team_member="team_member"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:hidden gap-8 lg:gap-10">
          <TeamMember
            v-for="team_member in our_team_members_data.data"
            :key="team_member.id"
            :team_member="team_member"
          />
        </div>
      </div>
    </div>
  </section>
</template>
