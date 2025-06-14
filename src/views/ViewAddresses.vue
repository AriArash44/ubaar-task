<script setup>
    import Card from '../components/Card.vue';
    import { onMounted, ref } from 'vue';
    import { useFetch } from "@/composables/useFetch";
    import { toPersianNumbers } from '../utils/enfanum';
    import { showToast } from '../utils/showToast';
    const { data, error, loading, fetchData } = useFetch(`${import.meta.env.VITE_BASE_URL}karfarmas/address`);
    onMounted(async () => {
        await fetchData();
        if(error.value)
            showToast(error.value);
    });
</script>

<template>
  <div class="w-100 min-vh-75 bg-grey-background">
    <div v-if="loading" class="d-flex justify-content-center align-items-center">
      <span class="spinner-border"></span>
    </div>
    <div v-else class="w-100 d-flex flex-column justify-content-start align-items-center mt-3 position-absolute top-0">
      <p class="text-end w-95 w-sm-75 w-md-75 w-lg-70 w-xl-65">آدرس ها و مشخصات</p>
      <Card v-for="item in data" :key="item.id" class="mb-3">
        <div class="p-3 d-md-none p-3">
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">نام و نام خانوادگی</p>
            <p>{{ item.first_name + " " + item.last_name }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">جنسیت</p>
            <p>{{ item.gender }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">شماره تلفن همراه</p>
            <p>{{ toPersianNumbers(item.coordinate_mobile.replace(/^98/, "0")) }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">شماره تلفن ثابت</p>
            <p>{{ toPersianNumbers(item.coordinate_phone_number.replace(/^98/, "0")) }}</p>
          </div>
          <hr class="border-grey-1" />
          <p class="text-grey-one">آدرس</p>
          <p class="fw-bold">{{ toPersianNumbers(item.address) }}</p>
        </div>
        <div class="d-none d-md-block p-3">
          <div class="d-flex justify-content-between">
            <p class="text-grey-one col-3">نام</p>
            <p class="text-grey-one col-3">نام خانوادگی</p>
            <p class="text-grey-one col-5">شماره تلفن همراه</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="col-3">{{ item.first_name }}</p>
            <p class="col-3">{{ item.last_name }}</p>
            <p class="col-5">{{ toPersianNumbers(item.coordinate_mobile.replace(/^98/, "0")) }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one col-3">شماره تلفن ثابت</p>
            <p class="text-grey-one col-3">جنسیت</p>
            <p class="text-grey-one col-5">آدرس</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="col-3">{{ toPersianNumbers(item.coordinate_phone_number.replace(/^98/, "0")) }}</p>
            <p class="col-3">{{ item.gender }}</p>
            <p class="col-5">{{ toPersianNumbers(item.address) }}</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>