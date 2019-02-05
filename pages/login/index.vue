<template>

  <div class="uk-height-1-1">

    <div class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport">
			<div class="uk-position-bottom-center uk-position-small uk-visible@m uk-text-center">
        <img width="80px" uk-img src="https://sayrin.cl/img/logo.20346b60.svg" alt=""> <br>
				<span class="uk-text-small uk-text-muted">© 2019 Sayrin - <a href="https://sayrin.cl" class="theme-c">Desarrollado por Sayrin</a></span>
			</div>
			<div class="uk-width-medium uk-padding-small">
				<div>
					<fieldset class="uk-fieldset">

						<legend class="uk-legend">Iniciar Sesión</legend>
            <p>Ingresa al portal con tus credenciales.</p>
						<div class="uk-margin">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
								<input class="uk-input uk-form-large" required placeholder="Email" type="text">
							</div>
						</div>
						<div class="uk-margin">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
								<input class="uk-input uk-form-large" required placeholder="Contraseña" type="password">
							</div>
						</div>

						<div class="uk-margin">
							<label><input class="uk-checkbox" type="checkbox"> Seguir conectado</label>
						</div>
						<div class="uk-margin">
							<button type="submit" @click="postLogin" class="theme-a uk-button uk-button-primary uk-button-primary uk-button-large uk-width-1-1">Iniciar Sesión</button>
						</div>
					</fieldset>
				</div>
				<div>
					<div class="uk-text-center">
						<a class="uk-link-reset uk-text-small" data-uk-toggle="target: #recover;animation: uk-animation-slide-top-small">¿Olvidaste tu contraseña?</a>
					</div>
					<div class="uk-margin-small-top" id="recover" hidden>
						<form action="login.html">

							<div class="uk-margin-small">
								<div class="uk-inline uk-width-1-1">
									<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
									<input class="uk-input" placeholder="E-mail" required type="text">
								</div>
							</div>
							<div class="uk-margin-small">
								<button type="submit" class="uk-button uk-button-primary uk-width-1-1">Envíar Contraseña</button>
							</div>

						</form>
					</div>
				</div>
			</div>
		</div>

  </div>

</template>

<script>

import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  transition: 'slide-left',
  'layout' : 'login',
  data() {
    return{
      response: null
    }
  },
  middleware: 'notAuthenticated',
  methods: {
    postLogin : function() {

      axios
        .post('http://localhost:1337/auth/local', {
          identifier: 'josepuma@sayrin.cl',
          password: 'cris26011998'
        })
        .then(response => {
          // Handle success.
          console.log('Well done!');
          /*console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);*/
          const auth = {
            accessToken: response.data.jwt
          }

          this.$store.commit('setAuth', auth) // mutating to store for client rendering
          Cookie.set('auth', auth) // saving token in cookie for server rendering
          this.$router.push('/')

        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });


    }
  }
}
</script>
