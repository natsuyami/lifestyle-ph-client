<template>
  <section class="header-section">
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Lifestyle</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
          </ul>
          <div class="d-flex">
            <GmailButton className="center-item" :gmailUrl="url" />
          </div>
        </div>
      </div>
    </nav>
  </section>
  <section class="py-5 first-section min-vh-100">
    <img src="https://picsum.photos/seed/5678/1920/1080?blur=2" class="img-fluid bg-section" />
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="pt-xl-5 col-11 col-xl-10 text-center align-content-center">
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        </div>
        <div class="pt-5 pt-xl-4 col-11 col-md-9 col-xl-6 text-center align-content-center">
          <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/wWYK6IVszPk?si=XOVHWrneICF9gH8y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
        <div class="pt-5 pt-xl-4 col-11 col-xl-10 text-center align-content-center">
          <h4>Only $1/month, cancel anytime!</h4>
          <DonateButton/>
        </div>
        
      </div>
    </div>
  </section>
  <section class="py-5 second-section">
    <div class="container-fluid">
      <div class="pt-5 row d-flex justify-content-center">
        <div class="col-11 col-md-4 col-xl-4 d-flex">
          <img src="https://picsum.photos/seed/9011/700/700" class="img-fluid img-obj" />
        </div>
        <div class="col-11 col-md-7 col-xl-5 d-flex pt-5 pt-md-0">
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ante erat, et imperdiet nulla facilisis non. Nunc eleifend malesuada lorem suscipit congue. Suspendisse potenti. Duis pulvinar pharetra sollicitudin. Aenean fringilla lacus non laoreet aliquam. Vivamus nisl magna, laoreet id tempor ac, imperdiet nec lectus. Duis aliquam dui nisl, non viverra orci posuere vulputate. Nam vulputate augue turpis, ut tincidunt felis auctor nec. Curabitur dui mauris, facilisis vitae efficitur in, fermentum a ante. Sed nulla odio, dignissim laoreet libero eu, vestibulum molestie lectus. Ut facilisis feugiat nulla a feugiat.
          </h4>
        </div>
      </div>
      <div class="pt-5 row d-flex justify-content-center">
        <div class="col-11 col-md-4 col-xl-4 d-flex order-md-1">
          <img src="https://picsum.photos/seed/1112/700/700" class="img-fluid img-obj" />
        </div>
        <div class="col-11 col-md-7 col-xl-5 d-flex pt-5 pt-md-0 order-md-0">
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ante erat, et imperdiet nulla facilisis non. Nunc eleifend malesuada lorem suscipit congue. Suspendisse potenti. Duis pulvinar pharetra sollicitudin. Aenean fringilla lacus non laoreet aliquam. Vivamus nisl magna, laoreet id tempor ac, imperdiet nec lectus. Duis aliquam dui nisl, non viverra orci posuere vulputate. Nam vulputate augue turpis, ut tincidunt felis auctor nec. Curabitur dui mauris, facilisis vitae efficitur in, fermentum a ante. Sed nulla odio, dignissim laoreet libero eu, vestibulum molestie lectus. Ut facilisis feugiat nulla a feugiat.
          </h4>
        </div>
      </div>
    </div>
  </section>
  <section class="third-section">
    <img src="https://picsum.photos/seed/4235/1920/1080?blur=1" class="img-fluid bg-section" />
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="col-11">
          <h1 class="color-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <a href="javascript:;" class="btn btn-primary btn-lg">Donate Now!</a>
        </div>
      </div>
    </div>
  </section>
  <section class="footer-section">
    <footer class="py-5">
      <div class="container-fluid">
        <div class="row d-flex justify-content-center">
          <div class="col-11 col-md-3">
            <h3 class="d-block pb-3">Lifestyle</h3>
            <span class="d-block">Lorem Ipsum</span>
            <span class="d-block pb-3">dolor sit amet</span>
            <span class="d-block">© 2024 Lifestyle, Inc. All rights reserved.</span>
          </div>
          <div class="col-md-5"></div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </footer>
  </section>
</template>


<script>
import GmailButton from "../buttons/GmailButton";
import DonateButton from "../buttons/DonateButton";

import '../../assets/scss/home.scss';
import "bootstrap";


import { ref, onMounted } from 'vue';
import { GetLogin } from "../client/RestAPI.js";
import { GenerateToken } from '../client/TokenGenerator.js';
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  components: {GmailButton, DonateButton},
  setup() {
    const url = ref('/');
    const router = useRouter();

    onMounted(async () => {
      const code = router.currentRoute.value.query["code"];
      if (undefined !== code) {
        console.log('generate token');
        let nextPage = await GenerateToken(code);
        router.push(nextPage);
      } else {
        console.log('generate url');
        await GetLogin(url);
      }
    });

    return { url };
  }
}
</script>

<style scoped>
/* Scoped styles for this component */
</style>