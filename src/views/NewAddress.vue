<script setup>
    import { ref, reactive } from 'vue';
    import Input from '../components/Input.vue';
    import Card from '../components/Card.vue';
    import Map from '../components/Map.vue';
    import { usePost } from '@/composables/usePost';
    import { showToast } from '../utils/showToast';
    const step = ref(1);
    const formData = reactive({
        "first-name": "",
        "last-name": "",
        "mobile-phone": "",
        "tel-phone": "",
        "address": "",
        "gender": ""
    });
    const position = reactive({
        "lat": null,
        "long": null
    });
    const isValid = () => {
        return (
            formData['first-name'].length >= 2 &&
            formData['last-name'].length >= 3 &&
            /^09\d{9}$/.test(formData['mobile-phone']) &&
            formData['address'].length >= 3 &&
            formData['gender'] !== ''
        );
    };
    const { responseData, error, loading, postData } = usePost(`${import.meta.env.VITE_BASE_URL}karfarmas/address`);
    const sendAddress = async () => {
        await postData({
            "first_name": formData['first-name'],
            "last_name": formData['last-name'],
            "coordinate_mobile": formData['mobile-phone'],
            "coordinate_phone_number": formData['tel-phone'],
            "address": formData.address,
            "region": '1',
            "lat": position.lat,
            "lng": position.long,
            "gender": formData.gender
        });
        if(error.value)
            showToast(error.value);
        else
            step.value++;
    };
</script>

<template>
  <h1 v-if="step === 1" class="w-95 w-sm-75 w-md-75 w-lg-70 w-xl-65 text-right fs-5 fw-semibold mb-3">ثبت آدرس</h1>
  <Card v-if="step === 1">
    <form class="p-3 mb-80px">
      <p class="fs-14px fw-semibold">لطفا مشخصات خود را وارد کنید</p>
      <div class="d-flex justify-content-around flex-wrap">
        <Input
          class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32"
          title="نام"
          regex="^.{2,}$"
          error="نام باید شامل 2 کاراکتر باشد"
          placeholder="مثال: محمدرضا"
          v-model="formData['first-name']"
        />
        <Input
          class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32"
          title="نام خانوادگی"
          regex="^.{3,}$"
          error="نام خانوادگی باید شامل 3 کاراکتر باشد"
          placeholder="مثال: رضایی"
          v-model="formData['last-name']"
        />
        <Input
          class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32"
          title="شماره تلفن همراه"
          regex="^09\d{9}$"
          error="شماره وارد شده صحیح نمی‌باشد"
          placeholder="مثال: 09121234567"
          :onlyNumeric="true"
          v-model="formData['mobile-phone']"
        />
      </div>
      <div class="d-flex justify-content-around mt-md-4 flex-wrap">
        <Input
          class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32"
          title="شماره ثابت (اختیاری)"
          regex="^0\d{10}$"
          error="شماره وارد شده صحیح نمی‌باشد"
          placeholder="مثال: 02144256780"
          leftTitle="*با پیش شماره"
          v-model="formData['tel-phone']"
        />
        <Input
          class="col-12 w-sm-66 w-md-66 w-lg-66 w-xl-66"
          title="آدرس"
          regex="^.{3,}$"
          error="آدرس باید حداقل 3 کاراکتر باشد"
          v-model="formData['address']"
        />
      </div>
      <div class="d-flex mt-md-4">
        <p class="ml-30px mt-1">جنسیت:</p>
        <input id="male" name="gender" type="radio" value="مرد" class="mt-2 ml-5px" v-model="formData.gender" />
        <label for="male" class="mt-1">مرد</label>
        <input id="female" name="gender" type="radio" value="زن" class="mt-2 mr-20px ml-5px" v-model="formData.gender" />
        <label for="female" class="mt-1">زن</label>
      </div>
      <Teleport to="body">
        <div class="position-fixed bottom-0 bg-white w-100 d-flex justify-content-center p-3 footer-shadow">
          <button @click.prevent="isValid() && step++" type="submit"
          :class="['bg-primary-green border-0 pr-48px pl-48px py-1 text-white rounded-2', isValid() ? 'cursor-pointer' : 'disabled']">
            ثبت و ادامه
          </button>
        </div>
      </Teleport>
    </form>
  </Card>
  <div v-if="step === 2" class="d-flex w-95 w-sm-75 w-md-75 w-lg-70 w-xl-65 
  align-items-end bg-white opacity-75 position-absolute top-0" @click="step--" style="z-index: 1000;">
    <button class="bg-transparent border-0 fw-bold fs-1">&#x2192;</button>
    <p class="m-auto m-md-3">انتخاب آدرس</p>
  </div>
  <Card v-if="step === 2">
    <Map v-model="position" />
    <Teleport to="body">
      <div class="position-absolute bottom-0 bg-white w-100 d-flex justify-content-center p-3 footer-shadow" style="z-index: 1000;">
        <button @click.prevent="sendAddress()" class="bg-primary-green border-0 pr-48px pl-48px py-1 cursor-pointer
        text-white rounded" type="submit">
          <div v-if="loading" class="loader mt-4px mb-4px">
            <div class="dot left"></div>
            <div class="dot middle"></div>
            <div class="dot right"></div>
          </div>
          <span v-else>ثبت و ادامه</span>
        </button>
      </div>
    </Teleport>
  </Card>
  <div v-if="step === 3" class="w-100 h-85 d-flex flex-column justify-content-center align-items-center">
    <img src="/images/success.svg" alt="success" />
    <p class="mb-36px">اطلاعات شما با موفقیت ثبت شد</p>
    <router-link to="/view-addresses">
      <button class="border-primary-green border-solid w-100 text-center text-primary-green p-8px pr-80px pl-80px rounded-2 bg-transparent">
        مشاهده اطلاعات
      </button>
    </router-link>
  </div>
</template>