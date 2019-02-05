<template>
  <div>
    <div class="uk-grid-collapse" uk-grid>

  <div class=" uk-background-default uk-visible@l left-panel">
    <div uk-sticky>
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
          <button class="uk-button theme-a uk-align-center"><span class="uk-margin-small-right" uk-icon="icon: mail"></span> New Message</button>
          <div >
            <ul class="uk-nav-default" uk-nav>
              <li><nuxt-link class="" tag="a" to="/panel"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Inicio</nuxt-link></li>
              <!--<li class="uk-nav-header">Header</li>-->
              <li><nuxt-link class="" tag="a" to="/panel/blog"><span class="uk-margin-small-right" uk-icon="icon: pencil"></span> Blog</nuxt-link></li>
              <li><nuxt-link class="" tag="a" to="/"><span class="uk-margin-small-right" uk-icon="icon: database"></span> Clientes</nuxt-link></li>
              <!--<li class="uk-nav-divider"></li>-->
              <li><nuxt-link class="" tag="a" to="/panel/archivos"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Archivos</nuxt-link></li>
              <li>  <nuxt-link class=" uk-disabled" tag="a" to="/"><span class="uk-margin-small-right" uk-icon="icon: file-text"></span> NewsLetter</nuxt-link></li>
            </ul>
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
            <button class="uk-button theme-a uk-align-center"><span class="uk-margin-small-right" uk-icon="icon: mail"></span> New Message</button>
            <div class="nav">
              <ul class="uk-nav uk-nav-default">
                <li><nuxt-link class="" tag="a" to="/panel"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Inicio</nuxt-link></li>
                <!--<li class="uk-nav-header">Header</li>-->
                <li><nuxt-link class="" tag="a" to="/panel/blog"><span class="uk-margin-small-right" uk-icon="icon: pencil"></span> Blog</nuxt-link></li>
                <li><nuxt-link class="" tag="a" to="/"><span class="uk-margin-small-right" uk-icon="icon: database"></span> Clientes</nuxt-link></li>
                <!--<li class="uk-nav-divider"></li>-->
                <li><nuxt-link class="" tag="a" to="/panel/archivos"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Archivos</nuxt-link></li>
                <li>  <nuxt-link class=" uk-disabled" tag="a" to="/"><span class="uk-margin-small-right" uk-icon="icon: file-text"></span> NewsLetter</nuxt-link></li>
              </ul>

            </div>
          </div>


        </div>
    </div>
</div>

  </div>
</template>

<style lang="scss">
$say-accent: #FA5951;
#offcanvas-nav{
  div{
    background: #fff;
    .nav{
      ul.uk-nav{
        li{
            padding: 5px 0;
            a{
              transition: all 200ms ease-in-out;
              color: #666;
              &.nuxt-link-exact-active{
                  color: $say-accent;
              }
            }
        }
      }
    }
  }
}

</style>
