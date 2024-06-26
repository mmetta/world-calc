<template>
  <v-app>
    <v-app-bar app color="teal" fixed dark>
      <v-img max-width="152" class="ml-2" src="./assets/World-white.png"></v-img>
      <v-spacer></v-spacer>
      <span style="font-size: 9pt;">{{ version }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="user.email === 'mfmetta@gmail.com' || user.email === 'williamproduz@gmail.com'"
        icon
        class="mr-2"
        color="white"
        @click="lista()"
      >
        <v-icon>mdi-shield-account</v-icon>
      </v-btn>
      <v-btn
        icon
        link
        class="mr-2"
        color="white"
        href="https://worldencadernadora.com.br"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        v-if="user.uid"
        icon
        class="mr-2"
        color="white"
        @click="logOut()"
      >
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar multi-line centered :value="updateExists" :timeout="-1" color="indigo">
      Novo conteúdo disponível para o APP
      <v-btn text @click="refreshApp">
        <v-icon class="mr-2">mdi-autorenew</v-icon>
        atualizar
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import update from "./mixins/update";

export default {
  name: "App",
  computed: {
    version() {
      return this.$store.getters.version;
    },
    user() {
      const u = this.$store.getters.user;
      return u
    }
  },
  mixins: [update],
  data: () => ({
    drawer: false,
    group: null,
    deferredPrompt: null,
  }),
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
    logOut() {
      this.$store.dispatch('logOut')
      this.$store.dispatch("setUser", {});
      this.$router.push("/");
    },
    lista() {
      this.$store.dispatch('loadCalcs')
      this.$router.push("/lista");
    }
  }
};
</script>
