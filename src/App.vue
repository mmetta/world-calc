<template>
  <v-app>
    <v-app-bar app color="teal" fixed dark>
      <v-img max-width="152" class="ml-2" src="./assets/World-white.png"></v-img>
      <v-spacer></v-spacer>
      <v-btn
        icon
        link
        class="mr-2"
        color="white"
        href="https://worldencadernadora.com.br"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
