<template>
    <div>
      <h1>Subscribe Here!</h1>
    </div>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="col-11">
          <h1 class="color-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <DonateButton className="center-item" />
        </div>
      </div>
    </div>
  </template>
  
<script>
import {onBeforeMount } from 'vue';
import { tokenPropertyVal } from '../utils/CookieUtils.js';
import { USER_DATA } from '../constant/DefaultValue.js';
import { useRouter } from 'vue-router';
import DonateButton from "../buttons/DonateButton";

export default {
  name: "FilmSubscribe",
  components: {DonateButton},
  setup() {
    onBeforeMount(async () => {
      const router = useRouter();
      const accessToken = tokenPropertyVal(USER_DATA, "accessToken");
      const keyOne = tokenPropertyVal(USER_DATA, process.env.VUE_APP_PAYMENT_KEY_ONE);
      const keyTwo = tokenPropertyVal(USER_DATA, process.env.VUE_APP_PAYMENT_KEY_TWO);

      if (accessToken !== null && keyOne && keyTwo) {
        router.push("/film/list");
      }
    });
  }
}
</script>