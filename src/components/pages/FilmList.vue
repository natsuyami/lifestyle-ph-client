<template>
  <div>
    <h1>Videos</h1>
    <div v-for="(video, index) in videos" :key="'video_' + index">
      <a :href="'/film/video/' + video.id">{{video.title}}</a>
    </div>
  </div>
</template>

<script>
import { GetVideos } from '../client/RestAPI.js';

export default {
  name: "FilmList",
  data() {
    return {
      videos: []
    };
  },
  async beforeMount() {
    this.videos = await GetVideos();
    console.log("testing videos title " + JSON.stringify(this.videos));

  }
}
</script>