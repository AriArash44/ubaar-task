<script setup>
    import { ref, reactive } from 'vue';
    import Input from '../components/Input.vue';
    import Card from '../components/Card.vue';
    import Map from '../components/Map.vue';
    const step = ref(1);
    const loading = ref(false);
    const formData = reactive({
        "first-name": "",
        "last-name": "",
        "mobile-phone": "",
        "tel-phone": "",
        "address": "",
        "gender": "",
    });
    const position = reactive({
        "lat": null,
        "long": null
    });
    const isValidInputs = reactive([false, false, false, false, false]);
    const isValid = () => {
        console.log(isValidInputs);
        return isValidInputs.reduce((res, current) => res && current, true) && formData["gender"]; 
    }
    const sendAddress = () => {
        loading.value = true;
    };
</script>

<template>
  <Card v-if="step===2" title="ثبت آدرس">
    <form class="p-4">
      <div class="d-flex justify-content-around flex-wrap">
        <Input class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32" title="نام" type="text" regex="^.{2,}$" error="نام باید شامل 2 کاراکتز باشد"
        @update:data="$event => (formData['first-name'] = $event)" placeholder="مثال: محمدرضا" v-model="isValidInputs[0]"/>
        <Input class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32" title="نام خانوادگی" type="text" regex="^.{3,}$" error="نام خانوادگی باید شامل 3 کاراکتر باشد"
        @update:data="$event => (formData['last-name'] = $event)" placeholder="مثال: رضایی" v-model="isValidInputs[1]"/>
        <Input class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32" title="شماره تلفن همراه" type="text" regex="^09\d{9}$" error="شماره وارد شده صحیح نمی‌باشد"
        :onlyNumeric="true" @update:data="$event => (formData['mobile-phone'] = $event)" placeholder="مثال: 09121234567" v-model="isValidInputs[2]"/>
      </div>
      <div class="d-flex justify-content-around mt-4 flex-wrap">
        <Input class="col-12 w-sm-32 w-md-32 w-lg-32 w-xl-32" title="شماره ثابت (اختیاری)" type="text" regex="^0\d{10}$" error="شماره وارد شده صحیح نمی‌باشد"
        @update:data="$event => (formData['tel-phone'] = $event)" placeholder="مثال: 02144256780" leftTitle="*با پیش شماره" v-model="isValidInputs[3]"/>
        <Input class="col-12 w-sm-66 w-md-66 w-lg-66 w-xl-66" title="آدرس" type="text" regex="^.{3,}$" error="آدرس باید حداقل 3 کاراکتر باشد"
        @update:data="$event => (formData['address'] = $event)" v-model="isValidInputs[4]"/>
      </div>
      <div class="d-flex mt-4">
        <p class="ml-30px mt-1">جنسیت:</p>
        <input id="male" name="gender" type="radio" value="مرد" class="m-1" v-model="formData['gender']"/>
        <label for="male" class="mt-1">مرد</label>
        <input id="female" name="gender" type="radio" value="زن" class="m-1 mr-10px" v-model="formData['gender']"/>
        <label for="female" class="mt-1">زن</label>
      </div>
      <Teleport to="body">
        <div class="position-absolute bottom-0 bg-white w-100
        d-flex justify-content-center p-3">
          <button @click.prevent="isValid() && step++" class="bg-primary-green border-0 pr-48px pl-48px py-1
          cursor-pointer text-white rounded" type="sumbit">ثبت و ادامه</button>
        </div>
      </Teleport>
    </form>
  </Card>
  <Card v-if="step === 1">
    <Map v-model="position" />
    <Teleport to="body">
      <div class="position-absolute bottom-0 bg-white w-100
      d-flex justify-content-center p-3">
        <button @click.prevent="sendAddress()" class="bg-primary-green border-0 pr-48px pl-48px py-1
        cursor-pointer text-white rounded" type="sumbit">
          <div v-if="loading" class="loader"></div>
          <span v-else>ثبت و ادامه</span>
        </button>
      </div>
    </Teleport>
  </Card>
</template>