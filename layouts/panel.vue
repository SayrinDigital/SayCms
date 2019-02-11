<template>
<div>
  <div class="uk-grid-collapse " uk-grid>

    <div class=" uk-background-default uk-overflow-auto uk-visible@l left-panel">
      <div uk-sticky>
        <div class="uk-section uk-section-small">
          <div class="nav  uk-container ">
            <div class="uk-grid-small uk-flex uk-flex-middle uk-margin-auto" uk-grid>
              <div class="uk-width-1-3">
                <img src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1090&q=80" class="uk-border-circle" alt="">
              </div>

              <div class="uk-width-2-3">
                <h4 class="uk-margin-remove">Hola {{ username }}</h4>
                <p class="uk-margin-remove">Administrador</p>
              </div>
            </div>
            <hr class="uk-hr">
            <!--<button class="uk-button theme-a uk-align-center"><span class="uk-margin-small-right" uk-icon="icon: mail"></span> New Message</button>-->
            <div>
              <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
                <!--<li><nuxt-link class="" tag="a" to="/panel"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Inicio</nuxt-link></li>-->
                <!--<li class="uk-nav-header">Header</li>-->
                <li class="uk-parent">
                  <a href="#">Interfaz</a>
                  <ul class="uk-nav-sub">
                    <li><nuxt-link to="/interfaz/encabezados">Encabezados</nuxt-link></li>
                    <li><nuxt-link to="/interfaz/config">Otras Configuraciones</nuxt-link></li>
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="#">Escorts</a>
                  <ul class="uk-nav-sub">
                    <li><a href="#">Listado</a></li>
                    <li><a href="#">Características</a></li>
                    <li><a href="#">Peso</a></li>
                    <li><a href="#">Servicios Incluidos</a></li>
                    <li><a href="#">Servicios Adicionales</a></li>
                    <li>
                    <nuxt-link to="/escorts/categorias">Categorías</nuxt-link>
                    <ul>
                        <li v-for="category in categories">
                          <nuxt-link :to="{name: 'escorts-categorias-categoria-id', params: { id: category.id } }">{{ category.name }}</nuxt-link>
                        </li>
                    </ul>
                </li>
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="#">Publicidad</a>
                  <ul class="uk-nav-sub">
                    <li><nuxt-link to="/gruposanuncio">Grupos de Anuncios</nuxt-link></li>
                  </ul>
                </li>
                <li class="uk-nav-divider"></li>
                <li>
                  <nuxt-link tag="a" to="/glosario">Glosario</nuxt-link>
                </li>

              </ul>
            </div>
            <div class="uk-section uk-section-small uk-text-right">
              <a @click="$auth.logout()" uk-icon="icon: sign-out"></a>
            </div>
          </div>


        </div>
      </div>
    </div>

    <div class="uk-width-expand uk-overflow-hidden">
      <div>
        <nav class="uk-navbar uk-navbar-container uk-margin uk-hidden@l">
          <div class="uk-navbar-left">
            <a class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
          </div>
        </nav>
        <nuxt/>
      </div>

    </div>
  </div>

  <div id="offcanvas-nav" uk-offcanvas="mode: push; overlay: true">
    <div class="uk-offcanvas-bar">

      <button class="uk-offcanvas-close" type="button" uk-close></button>

      <div class="uk-section uk-section-small">
        <div class="nav  uk-container">
          <div class="uk-grid-small uk-flex uk-flex-middle uk-margin-auto" uk-grid>
            <div class="uk-width-1-3">
              <img src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1090&q=80" class="uk-border-circle" alt="">
            </div>

            <div class="uk-width-2-3">
              <h4 class="uk-margin-remove">José Puma</h4>
              <p class="uk-margin-remove">Administrador</p>
            </div>
          </div>
          <hr class="uk-hr">
          <!--<button class="uk-button theme-a uk-align-center"><span class="uk-margin-small-right" uk-icon="icon: mail"></span> New Message</button>-->
          <div class="nav">
            <ul class="uk-nav uk-nav-default">
              <li>
                <nuxt-link class="" tag="a" to="/panel"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Inicio</nuxt-link>
              </li>
              <!--<li class="uk-nav-header">Header</li>-->
              <li>
                <nuxt-link class="" tag="a" to="/panel/blog"><span class="uk-margin-small-right" uk-icon="icon: pencil"></span> Blog</nuxt-link>
              </li>
              <li>
                <nuxt-link class="" tag="a" to="/"><span class="uk-margin-small-right" uk-icon="icon: database"></span> Clientes</nuxt-link>
              </li>
              <!--<li class="uk-nav-divider"></li>-->
              <li>
                <nuxt-link class="" tag="a" to="/panel/archivos"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Archivos</nuxt-link>
              </li>
              <li>
                <nuxt-link class=" uk-disabled" tag="a" to="/"><span class="uk-margin-small-right" uk-icon="icon: file-text"></span> NewsLetter</nuxt-link>
              </li>
            </ul>

          </div>
        </div>


      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {

  data(){
    return{
         categories : [],
         baseUrl: ""
    }
  },
  beforeMount(){
     this.baseUrl =  this.$axios.defaults.baseURL
  },
  mounted(){
    this.getCategories()
  },
  computed: {
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    getCategories(){
      axios
            .get(this.baseUrl + '/categories', {
              params: {
                _sort: 'name:desc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
              }
            })
            .then(response => {
              // Handle success.
              //console.log('Well done, here is the list of posts: ', response.data);
              this.categories = response.data
            })
            .catch(error => {
              // Handle error.
              console.log('An error occurred:', error);
            });
    }
  }

}
</script>

<style lang="scss">
$say-accent: #FA5951;
#offcanvas-nav {
    div {
        background: #fff;
        .nav {
            ul.uk-nav {
                li {
                    padding: 5px 0;
                    a {
                        transition: all 200ms ease-in-out;
                        color: #666;
                        &.nuxt-link-exact-active {
                            color: $say-accent;
                        }
                    }
                }
            }
        }
    }
}
</style>
