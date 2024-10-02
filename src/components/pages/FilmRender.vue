<template>
  <div>
    <h1>Test Video {{ $route.params.id }} </h1>
    <div ref="playerContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Vimeo from '@vimeo/player';
import { useRoute } from 'vue-router';
import { FetchVideo } from '../client/RestAPI.js';
export default {
  name: "FilmRender",
  setup() {
    const route = useRoute();
    const { id } = route.params;
    
    console.log('setup: ' + id);
    const playerContainer = ref(null);
    const video = ref(null);
    let player;
    
    onMounted(async () => {
      await FetchVideo(id, video);
      console.log('from the video response: ' + video.value.id);

      player = new Vimeo(playerContainer.value, {
        id: id,
        autopause: true
      });
    });

    watch(() => id, (newVal) => {
      if (player) {
        player.loadVideo(newVal);
      }
    });

    return { playerContainer };
  }
}
</script>