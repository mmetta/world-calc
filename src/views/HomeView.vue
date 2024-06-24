<template>
  <div>
    <v-col cols="12">
      <!-- <v-row class="justify-center mt-2">
        <h3 class="success--text">{{ user.displayName }} <span v-if="user.admin" class="ml-2">(Admin)</span> </h3>
      </v-row>
      <v-row class="justify-center mb-4">
        <h5 class="success--text">{{ user.email }}</h5>
      </v-row> -->
      <v-row class="justify-center my-2">
        <v-btn outlined width="220" class="py-8" color="success" router to="/list">
          <v-icon class="mr-4">mdi-format-list-bulleted</v-icon>
          meus orçamentos
        </v-btn>
      </v-row>
      <v-row class="justify-center my-2">
        <v-btn outlined width="220" class="py-8" color="success" router to="/calc">
          <v-icon class="mr-4">mdi-file-plus-outline</v-icon>
          novo orçamento
        </v-btn>
      </v-row>
      <!-- <v-row class="justify-center my-2">
        <v-btn outlined width="180" class="py-8" color="success" router to="/config">
          <v-icon class="mr-5">mdi-account-cog-outline</v-icon>
          config
        </v-btn>
      </v-row> -->
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
  },
  watch: {
    user(i) {
      if (!i.uid) {
        this.$router.push("/login");
      } if (!i.email) {
        this.$store.dispatch('loadUser', this.user.uid)
      }
    }
  },
  data() {
    return {
      hoje: new Date().toLocaleDateString("pt-BR"),
    };
  },
  methods: {
    toLista() {
      if(this.user.admin) {
        this.$store.dispatch('loadOSW')
      } else {
        this.$store.dispatch('loadOSC', this.user.uid)
      }
      this.$router.push('/lista')
    }
  }
};
</script>
