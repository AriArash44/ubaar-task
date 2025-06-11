<script setup>
    import { ref, reactive } from 'vue';
    import Input from '../components/Input.vue';
    const step = ref(1);
    const formData = reactive({
        "name": ""
    });
</script>

<template>
  <form v-if="step===1">
    <Input title="" type="text" regex="^09\d{9}$" error="شماره وارد شده صحیح نمی‌باشد"
    @update:data="$event => (formData.name = $event)" />
    <div class="position-absolute bottom-0 bg-white w-100
    d-flex justify-content-center p-3">
      <button @click.prevent="step++" class="bg-primary-green border-0 pr-48px pl-48px py-1
      cursor-pointer text-white rounded" type="sumbit">ثبت و ادامه</button>
    </div>
  </form>
</template>