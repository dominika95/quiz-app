<template>
  <div class="home">
    <h1>Welcome!</h1>
    <QuizSetupForm/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuizSetupForm from '@/components/QuizSetupForm.vue';

export default defineComponent({
  components: {
    QuizSetupForm,
  },
});
</script>
