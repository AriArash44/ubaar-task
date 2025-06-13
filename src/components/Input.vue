<script setup>
    import { useId, watch, computed, ref } from 'vue';
    import { toPersianNumbers, toEnglishNumbers } from '../utils/enfanum';
    const props = defineProps({
        title: String,
        leftTitle: String,
        regex: String,
        data: String,
        error: String,
        placeholder: String,
        onlyNumeric: { type: Boolean, default: false }
    });
    const emit = defineEmits(['update:data']);
    const isCorrect = defineModel(false);
    const inputId = useId();
    const value = ref();
    watch(value, (newValue) => {
        try {
            isCorrect.value = new RegExp(props.regex).test(toEnglishNumbers(newValue));
        } catch (e) {
            console.error("Invalid regex:", e);
            isCorrect.value = false;
        }
    }, { immediate: true }
    );
    const inputClass = computed(() => {
        if (!value.value) return 'border-grey-border';
        return isCorrect.value ? 'border-primary-green' : 'border-secondary-red';
    });
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mb-1">
      <label :for="inputId" class="d-block">{{ title }}</label>
      <span class="">{{ leftTitle }}</span>
    </div>
    <div class="position-relative">
      <input :id="inputId" type="text" v-model="value" @input="if(onlyNumeric) value=value.replace(/[^۰-۹0-9]/g, ''); value=toPersianNumbers(value); 
      emit('update:data', toEnglishNumbers(value));" :class="['w-100 p-1 border-solid rounded-1', inputClass]" :placeholder="placeholder"/>
      <button v-if="value" type="button" @click="value = ''"
      class="position-absolute t-3px l-3px bg-white border-0">
        <img src="/images/close.svg" alt="Clear input" />
      </button>
    </div>
    <p v-if="value && !isCorrect" class="text-secondary-red">{{ error }}</p>
  </div>
</template>
