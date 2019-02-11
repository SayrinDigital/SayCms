<template>
  <div>
        <nuxt-link tag="div" :to="{name: 'escorts-categorias-categoria-profile-id', params: { id: girl.id } }" class="uk-card uk-background-default uk-box-shadow-hover-large uk-border-rounded uk-overflow-hidden cursor-pointer">
            <div class="uk-card-media-top">
                <img class="uk-width-1-1" v-if="girl.profilephoto" :src="baseUrl + girl.profilephoto.url" alt="">
            </div>
            <div class="uk-card-body">
                <h3 class="uk-card-title">{{ girl.name }}</h3>
                <!--<p class="uk-margin">{{ girl.about | truncate(60) }}</p>
                <p class="uk-margin"><span class="uk-icon uk-margin-small-right" uk-icon="icon: phone"></span> {{ girl.phone }}</p>
                <p class="uk-margin"><span class="uk-margin-small-right" uk-icon="icon: location;"></span> {{ girl.location }}</p>
                <p class="uk-margin"><span class="uk-margin-small-right" uk-icon="icon: calendar;"></span> {{ girl.datework }}</p>-->
            </div>
        </nuxt-link>
    </div>

</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      baseUrl: ""
    }
  },
  props: ['girl'],
  beforeMount(){
    this.baseUrl =  this.$axios.defaults.baseURL
  },
}
</script>

<style type="scss">

  .cursor-pointer{
    cursor: pointer;
  }

</style>
