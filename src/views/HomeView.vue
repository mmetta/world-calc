<template>
  <div>
    <v-col cols="12">
      <v-row class="justify-center my-5">
        <h4>É necessário uma conta Gmail para acessar.</h4>
      </v-row>
      <v-row class="justify-center my-2">
        <v-btn :disabled="disabled" :loading="logging" outlined width="220" class="py-8" color="primary" @click="entrar()">
          <v-icon class="mr-4">mdi-account</v-icon>
          entrar
        </v-btn>
      </v-row>
      <v-row class="justify-center my-2">
        <span style="color: red;">{{ msg }}</span>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "Home-view",
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    user(i) {
      console.log(i)
      this.$store.dispatch('loadUser', i.uid)
      if(i.email){
        this.$router.push('/calc')
      } else (
        this.$router.push('/config')
      )
    },
    error(i) {
      if(i) {
        this.logging = false
        this.disabled = false
        this.msg = "Não foi possível conectar!"
      }
    }
  },
  data() {
    return {
      hoje: new Date().toLocaleDateString("pt-BR"),
      disabled: false,
      logging: false,
      msg: ""
    };
  },
  methods: {
    entrar() {
      this.disabled = true
      this.logging = true
      this.msg = ""
        this.$store.dispatch('login')
      }
    }
};
</script>
