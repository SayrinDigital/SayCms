<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Escorts</h3>
            <p>Una vista completa de las escorts disponibles.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #registerescort-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Registrar Escort</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">
      <h4>Listado de Escorts</h4>

      <div class="uk-section uk-section small">

        <div class="uk-child-width-1-5@l uk-child-width-1-3@m uk-child-width-1-1 uk-grid-match uk-grid-small" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
          <div v-for="girl in girls" v-if="girl.escort" :key="girl.id">
            <div   class="uk-inline-clip uk-transition-toggle uk-card-body uk-card uk-background-default uk-box-shadow-hover-large uk-border-rounded">

              <div>
                <h3>{{ girl.fullname }}</h3>
                <p> {{ girl.email }} </p>
              </div>

              <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                <div class="uk-align-right">
                  <ul class="uk-iconnav">
                    <li><nuxt-link :to="{name: 'escorts-listado-profile-id', params: { id: girl.escort.id } }" href="#" uk-icon="icon: file-edit"></nuxt-link></li>
                    <li><a @click="deleteUser(girl, girl.escort.id)" uk-icon="icon: trash"></a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Modal Add Escort -->

    <div ref="registerescortmodal" id="registerescort-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Registrar Escort</h2>
        <p>Registra de forma manual a una escort, se activará su perfil automáticamente.</p>

        <form class="uk-form-stacked uk-margin" @submit.stop.prevent="register()">
          <div class="uk-margin">
            <label class="uk-form-label"></label>
            <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="fullname" required type="text" placeholder="Nombre">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label"></label>
            <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="username" required type="text" placeholder="Usuario">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label"></label>
            <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="email" type="email" required email placeholder="Correo">
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-form-label"></div>
            <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="password" type="password" required placeholder="Contraseña">
            </div>
          </div>
          <div class="uk-margin" v-if="isuploading">
            <div uk-spinner></div>
          </div>
          <div class="uk-margin" v-if="haserror">
            <p class="uk-text-danger">Hubo un error al intentar crear el usuario. Revise los datos nuevamente porfavor.</p>
          </div>
          <div class="uk-margin">
            <p class="uk-text-right">
              <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
              <button class="uk-button uk-button theme-a" type="submit">Guardar</button>
            </p>
          </div>
        </form>


      </div>
    </div>

    <!-- EndModal -->


  </div>

</div>
</template>

<script>
let UIkit;

if (process.browser) {
  UIkit = require('uikit');
}
import axios from 'axios'
import GirlCard from '~/components/GirlCard.vue'
export default {

  layout: 'panel',
  components: {
    GirlCard
  },
  data() {
    return {
      id: null,
      category: null,
      girls: [],
      isloading: true,
      baseUrl: '',
      fullname: "",
      username: "",
      email: "",
      password: "",
      isuploading: false,
      haserror: false,
      token: "",
      roles: []
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
    this.id = this.$route.params.id
    this.token = this.$auth.getToken(this.$auth.strategy.name)
  },
  mounted() {
    this.loadUsers()

  },
  methods: {
    deleteUser(user, escortId){

      var vim = this

         UIkit.modal.confirm('¿Realmente deseas eliminar a este usuario?', { labels: { ok: 'Eliminar', cancel: 'Cancelar' } }).then(function () {

           axios
             .delete(vim.baseUrl + '/users/' + user.id, {
               headers: {
                 Authorization: vim.token
               }
             })
             .then(response => {
                 //Sends escort and user information to create the relation
                vim.deleteEscort(user,escortId)

             })
             .catch(error => {
               // Handle error.
               console.log('An error occurred:', error);
               this.isuploading = false
             });


         }, function () {
             //console.log('Rejected.')
         });

    },
    deleteEscort(user, escortId){

       var vim = this

      axios
        .delete(this.baseUrl + '/escorts/' + escortId)
        .then(response => {
            //Sends escort and user information to create the relation
            UIkit.modal.alert('¡Se eliminó un usuario!').then(function () {
              if(vim.girls.length>1){
              vim.girls.splice(vim.girls.indexOf(user), 1);
            }else{
              vim.girls= []
            }
            });

        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
          this.isuploading = false
        });
    },
    async register(data) {

      try {

        this.isuploading = true


        await axios.post(this.baseUrl + '/auth/local/register', {
          username: this.username,
          password: this.password,
          email: this.email,
          fullname: this.fullname

        },{
          headers: {
            Authorization: this.token
          }
        }).then(response => {
            this.createEscort(response.data.user)
          //this.updateEscort(response.data.user)
        })

      } catch (e) {
        console.log(e);
        this.haserror = true
        this.isuploading = false
      }
    },
    createEscort(user){
      axios
        .post(this.baseUrl + '/escorts', {
            name: this.fullname
        })
        .then(response => {
            //Sends escort and user information to create the relation
           this.updateEscort(user.id, response.data)

        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
          this.isuploading = false
        });
    },
    async updateEscort(userId, escortCreated) {

      try {
        await axios.put(this.baseUrl + '/users/' + userId, {
          fullname: this.fullname,
          role: 4,
          escort: escortCreated.id
        }, {
          headers: {
            Authorization: this.token
          }
        }).then(response => {



          this.isuploading = false
          this.haserror = false
          this.fullname = ""
          this.username = ""
          this.email = ""
          this.password = ""

          if(this.girls.length == 0){
            this.girls.push(response.data)
          }
          else{
            this.girls.unshift(response.data)
          }

            UIkit.modal(this.$refs.registerescortmodal).hide()


        })
      }
     catch (e) {
      console.log(e);
    }

  },
  loadUsers(){
    axios
    .get(this.baseUrl + '/users',{
      headers: {
        Authorization: this.token
      },
      params: {
        
        _sort: 'id:DESC'
      }
    })
    .then(response => {
      // Handle success.
      //console.log('Well done, here is the list of posts: ', response.data);
      this.girls = response.data
      console.log(this.girls)
    })
    .catch(error => {
      // Handle error.

      console.log('An error occurred:', error);
    });
  },
}

}
</script>
