<template>
  <div class="home">
    <Scanner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scanner from "@/components/Scanner.vue";

export default defineComponent({
  name: "Home",
  components: {
    Scanner,
  },
});
</script>
