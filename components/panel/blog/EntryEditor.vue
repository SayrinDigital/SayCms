<template>

  <div>
    <div class="editor">
      <ckeditor :editor="editor" :value="content" :config="editorConfig"></ckeditor>
    </div>
  </div>

</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {

  components: {
        ckeditor: CKEditor.component
  },

  data(){
    return{
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'bold', 'italic', '|', 'link', '|']
      }
    }

  },
  props:{
    content: String
  }

}
</script>

<style lang="scss">

.ck.ck-toolbar{
  background: transparent;
}

</style>
