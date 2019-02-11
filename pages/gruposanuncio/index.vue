<template>

  <div class="uk-section uk-section-small">
    <div class="uk-container uk-container-large">
      <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
        <div class="uk-navbar-left">
          <div class="uk-navbar-item uk-padding-remove">
            <div>
              <h3 class="uk-margin-remove">Grupos de Anuncios</h3>
              <p>Administre sus grupos de anuncios.</p>
            </div>
          </div>
        </div>

        <!--<div class="uk-navbar-right">
          <div class="uk-navbar-item">
            <button class="uk-button theme-a"  type="button" uk-toggle="target: #word-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Anuncio</button>
          </div>
        </div>-->
      </nav>

      <hr class="uk-hr">

      <div class="uk-section uk-section-small">
        <h4>Listado de Grupos de Anuncios</h4>

        <div class="uk-section uk-section small">

          <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
            <div v-for="group in adgroups" :key="group.id">

              <nuxt-link :to="{name: 'gruposanuncio-grupo-id', params: { id: group.id } }" class="glossary-card  uk-box-shadow-hover-large uk-inline-clip uk-transition-toggle" tabindex="0">
                <div>
                  <h4>{{ group.name }}</h4>
                  <p>Grupo generado automáticamente.</p>
                </div>
              </nuxt-link>

            </div>
          </transition-group>

        </div>

      </div>

    </div>
  </div>

</template>

<script>

import axios from 'axios'

export default {
  layout: 'panel',
  data(){
    return {
      baseUrl: "",
      adgroups: []
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadAdGroups()
  },
  methods: {
    loadAdGroups: function() {
      axios
        .get(this.baseUrl + '/adgroups', {
          params: {
            _sort: 'id:asc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.adgroups = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }
}
</script>
