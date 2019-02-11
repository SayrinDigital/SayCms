<template>
<div class="uk-section uk-section-small">
  <div v-if="girl" class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item">
          <div v-if="girl.profilephoto" class="uk-border-rounded uk-background-cover photo-container" uk-img :data-src="baseUrl + girl.profilephoto.url">
          </div>
        </div>
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove"><span>{{ girl.name }}</span> | Perfil</h3>
            <p>Administre la información de {{ girl.name }}.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button @click="updateEscort()" class="uk-button theme-a" type="button"><span uk-icon="icon: push" class="uk-margin-small-right"></span> Guardar</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">

      <div class="uk-child-width-1-2@m" uk-grid="masonry: true">
        <div>
          <div class="uk-border-rounded uk-background-default uk-box-shadow-hover-large uk-card-body">
            <form class="uk-grid-small" uk-grid>
              <div class="uk-width-1-1">
                <div class="uk-margin">
                  <h4>Datos Personales</h4>
                </div>
              </div>
              <div class="uk-width-1-1">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Nombre</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.name" type="text"  placeholder="Some text...">
                  </div>
                </div>
              </div>
              <div class="uk-width-1-1">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Acerca</label>
                  <div class="uk-form-controls">
                    <textarea class="uk-textarea light" v-model="girl.about" rows="4" id="form-stacked-text" type="text" placeholder="Some text..."></textarea>
                  </div>
                </div>
              </div>
              <div class="uk-width-1-2@s">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Altura</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.height" type="text" placeholder="Some text...">
                  </div>
                </div>
              </div>
              <!--<div class="uk-width-1-4@s">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Peso</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.weightescort" type="text" placeholder="Some text...">
                  </div>
                </div>
              </div>-->
              <div class="uk-width-1-2@s">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Ubicación</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.location" type="text" placeholder="Some text...">
                  </div>
                </div>
              </div>
              <div class="uk-width-1-2@s">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Precio</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.price" type="text" placeholder="99990">
                  </div>
                </div>
              </div>
              <div class="uk-width-1-2@s">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-select">Cumpleaños</label>
                  <div class="uk-form-controls">
                   <input class="uk-input light" v-model="birthdateConverted" id="form-stacked-text" type="datetime" placeholder="">
                  </div>
                </div>
              </div>
              <!--<div class="uk-width-1-2@s">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Horario</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.datework" type="text" placeholder="Some text...">
                  </div>
                </div>
              </div>-->
              <div class="uk-width-1-1">
                <div class="">
                  <hr class="uk-hr">
                  <h4>Laboral</h4>
                </div>
              </div>
              <div class="uk-width-1-1">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Teléfono</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light" v-model="girl.phone" id="form-stacked-text" type="text" placeholder="+569">
                  </div>
                </div>
              </div>
              <div class="uk-width-1-1">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Horario</label>
                  <div class="uk-form-controls">
                    <input class="uk-input light"  v-model="girl.datework" id="form-stacked-text" type="text" placeholder="10:00 a 15hrs">
                  </div>
                </div>
              </div>


            </form>
          </div>
        </div>

        <!-- Settings -->

        <div>
          <div class="uk-border-rounded uk-background-default uk-box-shadow-hover-large uk-card-body">
            <div class="uk-width-1-1">
              <div class="uk-margin">
                <h4>Categorías</h4>
              </div>
            </div>
            <div class="uk-width-1-1">
              <div class="uk-margin">
                <!--<label class="uk-form-label" for="form-stacked-text">Servicios </label>-->
                <ul uk-accordion>
                  <li>
                    <a class="uk-accordion-title" href="#">Servicios Incluidos</a>
                    <div class="uk-accordion-content">
                      <ul class="uk-list">
                        <li>
                          <p>owo</p>
                        </li>
                        <li>
                          <p>ewe</p>
                        </li>
                        <li>
                          <p>owooowo</p>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a class="uk-accordion-title" href="#">Servicios Adicionales</a>
                    <div class="uk-accordion-content">
                      <ul class="uk-list">
                        <li>
                          <p>owo</p>
                        </li>
                        <li>
                          <p>ewe</p>
                        </li>
                        <li>
                          <p>owooowo</p>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="uk-width-1-1">
              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-select">Categoría</label>
                <div class="uk-form-controls">
                  <select v-model="girl.category.id" class="uk-select light" id="form-stacked-select">
                     <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                   </select>
                </div>
              </div>
            </div>
            <div class="uk-width-1-1">
              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-select">Categoría por Peso</label>
                <div class="uk-form-controls">

                  <select multiple="true" v-model="selectedCharacteristics" class="uk-select light" id="form-stacked-select">
                     <option v-for="characteristic in characteristics" :value="characteristic.id">{{ characteristic.name }}</option>
                   </select>

                </div>
              </div>
            </div>
            <div class="uk-width-1-1">
              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-select">Categoría Peso</label>
                <div class="uk-form-controls">
                  <select v-if="girl.weightscort" v-model="girl.weightescort.id" class="uk-select light" id="form-stacked-select">
                     <option v-for="weight in weightCategories" :value="weight.id">{{ weight.name }}</option>
                   </select>
                </div>
              </div>
            </div>

          </div>
        </div>

          <div>
            <div class="uk-border-rounded uk-background-default uk-box-shadow-hover-large uk-card-body">
              <form class="uk-grid-small" uk-grid>
                <div class="uk-width-1-1">
                  <div class="uk-margin">
                    <h4>Publicación</h4>
                  </div>
                </div>
                <div class="uk-width-1-1">
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-select">Inicio Publicación</label>
                    <div class="uk-form-controls">
                     <input class="uk-input light" v-model="girl.startpublishing" id="form-stacked-text" type="datetime" placeholder="">
                    </div>
                  </div>
                </div>
                <div class="uk-width-1-1">
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-select">Fin Publicación</label>
                    <div class="uk-form-controls">
                     <input class="uk-input light" v-model="girl.endpublishing" id="form-stacked-text" type="datetime" placeholder="">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

      </div>

    </div>

  </div>

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  layout: 'panel',
  data() {
    return {
      baseUrl: "",
      girl: null,
      id: null,
      selectedCategory: "",
      categories: "",
      characteristics: [],
      selectedCharacteristics: [],
      selectedWeight: null,
      weightCategories: [],
      result: null
    }
  },
  computed: {
     birthdateConverted: function(){
       return moment(this.girl.birthdate).format('YYYY-MM-DD HH:mm:ss');
     }
  },
  beforeMount() {
    this.id = this.$route.params.id
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadGirl()
    this.loadCategories()
    this.loadCharacteristics()
    this.loadWeights()
  },
  methods: {
    loadGirl() {
      axios
        .get(this.baseUrl + '/escorts/' + this.id)
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.girl = response.data
          this.selectedCategory = response.data.category.id
          this.selectedCharacteristics = response.data.characteristics.map(a => a.id)
          this.selectedWeight = response.data.weightescort.id
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadCategories() {
      axios
        .get(this.baseUrl + '/categories/')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.categories = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadCharacteristics(){
      axios
        .get(this.baseUrl + '/characteristics/')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.characteristics = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadWeights(){
      axios
        .get(this.baseUrl + '/weightescorts/')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.weightCategories = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    updateEscort(){

      const updatedGirl = this.girl
      const birthdate = new Date(this.girl.birthdate).toISOString()

      var date = moment(birthdate).format('YYYY-MM-DD HH:mm:ss');
      //console.log(moment(birthdate, 'YYYY-MM-DD').format('DD/MM/YYYY'))

      axios
        .put(this.baseUrl + '/escorts/' + this.id,{
           name: updatedGirl.name,
           about: updatedGirl.about,
           height: updatedGirl.height,
           location: updatedGirl.location,
           price: updatedGirl.price,
           phone: updatedGirl.phone,
           datework: updatedGirl.datework,
           birthdate: date

        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
            console.log(updatedGirl)
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }
}
</script>

<style type="scss">
.photo-container {
  width: 100px;
  height: 100px;
}
</style>
