<template>
    <a :href="gmailUrl" :class="['login-with-google-btn', className]" >
        Sign in with Google
    </a>
</template>
<script>
export default {
  name: 'GmailButton',
  props: {
    className: String,
    gmailUrl: String
  }
}
</script>