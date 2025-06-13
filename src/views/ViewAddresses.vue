<script setup>
    import Card from '../components/Card.vue';
    import { onMounted, ref } from 'vue';
    import { useFetch } from "@/composables/useFetch";
    import { toPersianNumbers } from '../utils/enfanum';
    const width = ref(window.innerWidth);
    const { data, error, loading, fetchData } = useFetch(`${import.meta.env.VITE_BASE_URL}karfarmas/address`);
    onMounted(async() => {
        await fetchData();
    });
</script>

<template>
  <div class="w-100 min-vh-75 bg-grey-background">
    <div v-if="loading" class="d-flex justify-content-center align-items-center">
      <span class="spinner-border"></span>
    </div>
    <div v-else class="w-100 d-flex flex-column justify-content-start align-items-center mt-3 position-absolute top-0">
      <p class="text-end w-95 w-sm-75 w-md-75 w-lg-70 w-xl-65">آدرس ها و مشخصات</p>
      <Card v-for="(datium) in data" class="mb-3">
        <div v-if="width < 576" class="p-3"> 
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">نام و نام خانوادگی</p>
            <p>{{ datium["first_name"] + " " + datium["last_name"] }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">جنسیت</p>
            <p>{{ datium.gender }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">شماره تلفن همراه</p>
            <p>{{ toPersianNumbers(datium["coordinate_mobile"].replace(/^98/, "0")) }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one">شماره تلفن ثابت</p>
            <p>{{ toPersianNumbers(datium["coordinate_phone_number"].replace(/^98/, "0")) }}</p>
          </div>
          <hr class="border-grey-1" />
          <p class="text-grey-one">آدرس</p>
          <p class="fw-bold">{{ toPersianNumbers(datium["address"]) }}</p>
        </div>
        <div v-else class="p-3">
          <div class="d-flex justify-content-between">
            <p class="text-grey-one col-3">نام</p>
            <p class="text-grey-one col-3">نام خانوادگی</p>
            <p class="text-grey-one col-5">شماره تلفن همراه</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="col-3">{{ datium["first_name"] }}</p>
            <p class="col-3">{{ datium["last_name"] }}</p>
            <p class="col-5">{{ toPersianNumbers(datium["coordinate_mobile"].replace(/^98/, "0")) }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-grey-one col-3">شماره تلفن ثابت</p>
            <p class="text-grey-one col-3">جنسیت</p>
            <p class="text-grey-one col-5">آدرس</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="col-3">{{ toPersianNumbers(datium["coordinate_phone_number"].replace(/^98/, "0")) }}</p>
            <p class="col-3">{{ datium.gender }}</p>
            <p class="col-5">{{ toPersianNumbers(datium["address"]) }}</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>