<template>
    <a :class="['btn btn-primary btn-lg', className]" href="#" @click.prevent="mayaCheckout">
        Donate Now!
    </a>
</template>
<script>
import { MayaPayment } from "../client/RestAPI.js";
import { USER_DATA } from "../constant/DefaultValue";
import { tokenPropertyVal } from "../utils/CookieUtils";

export default {
  name: 'DonateButton',
  props: {
    className: String
  },
  methods: {
    mayaCheckout() {
      // Handle the click event
      console.log('Anchor element clicked!');
      MayaPayment(tokenPropertyVal(USER_DATA, process.env.VUE_APP_PAYMENT_KEY_TWO))
    }
  }
}
</script>