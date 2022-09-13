<template>
  <div class="home">
    <h1>Welcome!</h1>
  </div>
    <QuizSetupForm/>
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

<style lang="scss">

</style>
