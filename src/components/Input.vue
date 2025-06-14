<script setup>
    import { useId, ref, watch, computed } from 'vue';
    import { toPersianNumbers, toEnglishNumbers } from '../utils/enfanum';
    const props = defineProps({
        title: String,
        leftTitle: String,
        regex: String,
        modelValue: String,
        error: String,
        placeholder: String,
        onlyNumeric: { type: Boolean, default: false }
    });
    const emit = defineEmits(['update:modelValue']);
    const inputId = useId();
    const value = ref(props.modelValue || '');
    const isCorrect = computed(() => {
        try {
            return new RegExp(props.regex).test(toEnglishNumbers(value.value));
        } catch (e) {
            return false;
        }
    });
    const inputClass = computed(() => {
        if (!value.value) return 'border-grey-border';
        return isCorrect.value ? 'border-primary-green' : 'border-secondary-red';
    });
    watch(value, (newVal) => {
        emit('update:modelValue', toEnglishNumbers(newVal));
    });
    const handleInput = (event) => {
        let val = event.target.value;
        if (props.onlyNumeric) {
            val = val.replace(/[^۰-۹0-9]/g, '');
        }
    value.value = toPersianNumbers(val);
};
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mb-1">
      <label :for="inputId" class="d-block">{{ title }}</label>
      <span>{{ leftTitle }}</span>
    </div>
    <div class="position-relative">
      <input
        :id="inputId"
        type="text"
        :value="value"
        @input="handleInput"
        :class="['w-100 p-1 border-solid rounded-1', inputClass]"
        :placeholder="placeholder"
      />
      <button
        v-if="value"
        type="button"
        @click="value = ''"
        class="position-absolute t-3px l-3px bg-white border-0"
      >
        <img src="/images/close.svg" alt="Clear input" />
      </button>
    </div>
    <p v-if="value && !isCorrect" class="text-secondary-red">{{ error }}</p>
  </div>
</template>