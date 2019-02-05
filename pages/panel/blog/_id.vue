<template>

  <div class="uk-section uk-section-small">
    <div class="uk-container">

      <article class="uk-article say-article">
         <div v-html="post.html"></div>
      </article>
    </div>
  </div>

</template>

<script>


  import axios from 'axios'

export default {
  transition: 'slide-left',
  'layout' : 'panel',
  data() {
    return{
      baseUrl: 'https://demo.ghost.io/ghost/api/v2/content/posts/',
      apiKey: '?key=22444f78447824223cefc48062',
      id : this.$route.params.id,
      post: []
    }
  },
  created () {
    this.loadPost(this.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.loadPost(to.params.id)
    next();
  },
  methods: {
    loadPost: function(postid) {
      var self = this
      axios
        .get(this.baseUrl + '/' + postid + '/' + this.apiKey)
        .then(response =>
          (
            self.post = response.data.posts[0]
          )
        )
    },
  }

}
</script>

<style lang="css">
</style>
