<template>
<li >
  <div class="uk-accordion-title">
    <div class="cursor-pointer">
      <div>
        <div>
          <p>José Puma</p>
          <h4 class="title">{{ post.title }}</h4>
          <p class="uk-margin">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae minima, nihil ipsa! Dolorem consequuntur obcaecati minus earum tenetur aut, distinctio at. Ratione deleniti porro laboriosam voluptatum dolorem excepturi, corrupti illum!</p>
        </div>
      </div>
    </div>
  </div>
  <div class="uk-accordion-content uk-margin-remove">
    <div class="uk-align-right">
      <ul class="uk-iconnav list-icons uk-padding-remove">
        <li><span uk-icon="icon: happy;"></span> 200</li>
        <li><span uk-icon="icon: calendar;"></span> 26/01/18</li>
        <li uk-tooltip="Leer Entrada"><nuxt-link tag="a" :to="{ name: 'panel-blog-id', params: { id: post.id }}" href="#" uk-icon="icon: file-text"></nuxt-link></li>
        <li uk-tooltip="Ver Entrada En Mi Web"><a href="#" uk-icon="icon: world"></a></li>
        <li uk-tooltip="Editar Entrada"><nuxt-link tag="a" :to="{ name: 'panel-blog-edit-id', params: { id: post.id }}" href="#" uk-icon="icon: file-edit"></nuxt-link></li>
        <li uk-tooltip="Eliminar Entrada"><a href="#" uk-icon="icon: trash"></a></li>
      </ul>
    </div>
  </div>
</li>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      postid: this.post.id
    }
  },
  methods: {
    loadPost() {

      var self = this;
      self.emit(this.postid);

    },
    emit(value) {

      this.$emit('load_post', value)
    }
  }
}
</script>
