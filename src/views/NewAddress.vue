<script setup>
    import { ref, reactive } from 'vue';
    import Input from '../components/Input.vue';
    import Card from '../components/Card.vue'
    const step = ref(1);
    const formData = reactive({
        "name": ""
    });
</script>

<template>
  <Card>
    <form v-if="step===1">
      <div class="d-flex flex-wrap gap-4 p-4">
        <Input class="col-12 col-md-4" title="نام" type="text" regex="^09\d{9}$" error="نام باید شامل 2 کاراکتز باشد"
        @update:data="$event => (formData.name = $event)" />
        <Input class="col-12 col-md-4" title="نام خانوادگی" type="text" regex="^09\d{9}$" error="نام خانوادگی باید شامل 3 کاراکتر باشد"
        @update:data="$event => (formData.name = $event)" />
        <Input class="col-12 col-md-4" title="شماره تلفن همراه" type="text" regex="^09\d{9}$" error="شماره وارد شده صحیح نمی‌باشد"
        :onlyNumeric="true" @update:data="$event => (formData.name = $event)" />
      </div>
      <Teleport to="body">
        <div class="position-absolute bottom-0 bg-white w-100
        d-flex justify-content-center p-3">
          <button @click.prevent="step++" class="bg-primary-green border-0 pr-48px pl-48px py-1
          cursor-pointer text-white rounded" type="sumbit">ثبت و ادامه</button>
        </div>
      </Teleport>
    </form>
  </Card>
</template>