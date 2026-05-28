<script setup lang="ts">
import { useUserControllerUsers } from "@repo/api/client"

const { data, isLoading } = useUserControllerUsers()
</script>

<template>
  <h1>You did it!</h1>
  <span v-if="isLoading">Loading...</span>
  <pre v-else-if="data">{{ data }}</pre>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
