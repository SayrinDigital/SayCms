<template>
<div>
  <div class="uk-inline  say-filecard uk-width-1-1">
    <v-lazy-image v-if="fileType == 'IMG'" class="uk-width-1-1 uk-overflow-hidden uk-border-rounded" src-placeholder="https://cdn.dribbble.com/users/693438/screenshots/4905700/artboard_2_1x.png" :src="'http://localhost:8000/media/' + file.contentUrl" alt="" />
    <v-lazy-image  v-if="fileType == 'GIF'" class="uk-width-1-1 uk-overflow-hidden uk-border-rounded" src-placeholder="https://cdn.dribbble.com/users/693438/screenshots/4905700/artboard_2_1x.png" :src="'http://localhost:8000/media/' + file.contentUrl" alt="" />
    <div v-if="fileType == 'VIDEO'">
      <video loop muted controls playsinline uk-video="autoplay: false">
    <source :src="'http://localhost:8000/media/' + file.contentUrl" type="video/mp4">
    </video>
    </div>
    <div class="overlay  uk-overflow-hidden uk-border-rounded uk-position-cover"></div>
    <div class="uk-overlay info-container uk-position-bottom-left">
      <h4 class="title uk-margin-small">{{ file.name }}</h4>
      <p class="text uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="icon: clock"></span> Marzo, 5, 2018</p>
      <p class="text uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="icon: download"></span> 50 Descargas</p>
    </div>
    <div class="uk-overlay uk-position-top-right">
      <span class="uk-badge uk-margin-small-right">{{ file.size | mbSize }} </span>
      <span class="uk-badge uk-margin-small-right">{{ file.type | toType }} </span>
      <span @click="showModal = true" class="uk-icon text cursor-pointer" href uk-icon="more-vertical"></span>
    </div>
  </div>

</div>
</template>

<script>
import VLazyImage from "v-lazy-image"
import UIkit from 'uikit'

export default {
  components: {
    VLazyImage
  },
  data() {
    return {
      fileType: null
    }
  },
  mounted(){
     let vm = this;
     this.fileType = this.$options.filters.toType(this.file.type)
  },
  props: ['file'],
  methods: {

  },
  filters: {
    mbSize(value) {
      var bytes = value;
      var decimals = 2;
      var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    toType(value) {
      switch (value) {
        case "image/jpeg":
          return 'IMG'
        case "image/gif":
           return 'GIF'
        case "video/mp4":
          return 'VIDEO'
          default:
          return 'IMG'
      }
    }
  }
}
</script>
