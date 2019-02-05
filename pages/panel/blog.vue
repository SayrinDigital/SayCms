<template>
<div class="">

  <div class="uk-grid-collapse" uk-grid>
    <div class="uk-width-2-5@m uk-overflow-hidden">
      <div class="uk-section max-viewport-height uk-overflow-auto uk-section-small">
        <div class="uk-container">


        <div class="uk-child-width-1-2@s uk-flex uk-flex-middle" uk-grid>
          <div>
            <h3 class="uk-margin-remove">Blog</h3>
            <p>Lista completa de todos tus posts</p>
          </div>


          <div class="">
            <div class="uk-text-right">
              <nuxt-link tag="button" to="/panel/blog/create" class="uk-button theme-a"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Nueva Entrada</nuxt-link>
            </div>
          </div>
        </div>

        <hr class="uk-hr uk-margin-medium">

          <div>
            <transition-group mode="out-in" name="fade" tag="ul" class="say-post-list uk-list uk-list-divider " uk-accordion>
              <Item v-for="item in posts" v-bind:post="item" v-bind:key="item.id"></Item>
            </transition-group>
          </div>

        </div>
      </div>
    </div>
    <div class="uk-width-3-5@m uk-background-default min-viewport-height uk-overflow-hidden">
      <div class="max-viewport-height uk-overflow-hidden ">
        <div class="uk-overflow-hidden ">
                      <nuxt-child :key="$route.fullPath"></nuxt-child>
        </div>
        <div class="uk-container">

          <article class="uk-article say-article">


          </article>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Item from '~/components/panel/blog/Item'
import Logo from '~/components/Logo'
import axios from 'axios'

export default {
transition: 'slide-left',
'layout' : 'panel',
middleware: 'authenticated',
  components: {
    Item,
    Logo,
  },
  data() {
    return {
      baseUrl: 'https://demo.ghost.io/ghost/api/v2/content/posts/?key=22444f78447824223cefc48062',
      posts: null,
      postcontent: null,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios
        .get(this.baseUrl)
        .then(response =>
          (
            this.posts = response.data.posts
          )
        )
    }
  }

}
</script>
