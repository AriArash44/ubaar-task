<script setup>
    import { useId, watch, computed, ref } from 'vue';
    import { toPersianNumbers, toEnglishNumbers } from '../utils/enfanum';
    const props = defineProps({
        title: String,
        regex: String,
        data: String,
        error: String,
        onlyNumeric: { type: Boolean, default: false }
    });
    const emit = defineEmits(['update:data'])
    const inputId = useId();
    const value = ref();
    const isCorrect = ref(false);
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
    <label :for="inputId" class="d-block">{{ title }}</label>
    <div class="position-relative">
      <input :id="inputId" type="text" v-model="value" @input="if(onlyNumeric) value=value.replace(/[^۰-۹0-9]/g, ''); value=toPersianNumbers(value); 
      emit('update:data', toEnglishNumbers(value));" :class="['w-100 p-1 border-solid rounded-1', inputClass]" />
      <button v-if="value" type="button" @click="value = ''"
      class="position-absolute t-3px l-3px bg-white border-0">
        <img src="/images/close.svg" alt="Clear input" />
      </button>
    </div>
    <p v-if="value && !isCorrect" class="text-secondary-red">{{ error }}</p>
  </div>
</template>
