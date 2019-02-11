<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove"><span v-if="category">{{ category.name }}</span> | Categorías</h3>
            <p>Administre las escorts por categoría.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #add-header"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Encabezado</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">
      <h4>Listado de Escorts</h4>

      <div class="uk-section uk-section small">

         <div class="uk-child-width-1-5@m uk-grid-match uk-grid-small" uk-grid>
           <div v-for="girl in girls" :key="girl.id">
             <GirlCard :girl="girl"></GirlCard>
           </div>
         </div>

      </div>

    </div>

  </div>

</div>

</template>

<script>

import axios from 'axios'
import GirlCard from '~/components/GirlCard.vue'
export default {

  layout: 'panel',
  components:{
    GirlCard
  },
  data(){
      return{
        id: null,
        category: null,
        girls: [],
        isloading : true,
        baseUrl : ''
      }
    },
    beforeMount(){
      this.baseUrl =  this.$axios.defaults.baseURL
      this.id = this.$route.params.id
    },
    mounted(){
    this.loadCategoryEscorts()
    },
    methods: {
      loadCategoryEscorts(){

        axios
              .get(this.baseUrl + '/categories/' + this.id)
              .then(response => {
                // Handle success.
                //console.log('Well done, here is the list of posts: ', response.data);
                this.category = response.data
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
              });

        axios
      .get(this.baseUrl + '/escorts/',{
        params:{
          'category' : this.id
        }
      })
      .then(response => {
        // Handle success.
        //console.log('Well done, here is the list of posts: ', response.data);
        this.girls = response.data
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
      }
    }

}
</script>
