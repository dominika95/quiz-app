<template>
    <div class="progressBar">
        <b-progress :value="value" :max="max" class="mb-3 customProgress">
            <b-progress-bar :value="value">
                <span><strong>{{ value }} / {{ max }}</strong></span>
            </b-progress-bar>
        </b-progress>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const max = store.getters.getNumberOfQuestions;
const value = computed(() => store.getters.getCurrentPage + 1);

</script>

<style lang="scss">
  .progressBar {
    .customProgress {
        height: 30px;
        border-radius: 30px;
        color: white;
    }

    .progress-bar {
        background-color: #efe4b0;
    }

    span {
        color: black;
    }
  }

  @media (max-width: 760px) {
    span {
      font-size: 0.8em;
    }
  }
  @media (max-width: 480px) {
    span {
      font-size: 0.6em;
    }
  }

</style>
