<template>
    <div>
      <v-col cols="10" offset="1" class="pa-0">
        <v-row class="my-2">
          <v-btn icon router color="success" to="/calc"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </v-row>
        <v-row class="justify-center">
          <v-list>
            <v-list-item-group v-model="active" color="primary">
              <v-list-item
                three-line
                v-for="calc in calcs"
                :key="calc.id"
                aria-selected="active"
              > 
                <v-list-item-content @click="view(calc)">
                  <v-list-item-title class="primary--text">{{ calc.data }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <span class="primary--text mr-3">{{ calc.clienteEmail }}{{ ' - ' }}{{ calc.tipo }}</span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <span class="accent--text mr-3">{{ calc.tamanho }}{{ ' ' }}</span>
                    <span class="accent--text mr-3">{{ laminas(calc) }}{{ ' lâminas' }}</span>
                    <strong>{{ calc.valor }}</strong>
                  </v-list-item-subtitle>
                </v-list-item-content>
  
                <v-list-item-action class="py-5 px-3 ma-1">
                  <v-btn
                    icon
                    color="red"
                    @click="deletar(calc)"
                  >
                    <v-icon color="red">mdi-delete-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-row>
      </v-col>
    </div>
  </template>
  
  <script>
  export default {
    name: "admin-view",
    computed: {
      calcs() {
        const c = this.$store.getters.calcs;
        return c;
      }
    },
    watch: {
        calcs(f) {
        console.log(f.length);
        return f
      },
    },
    mounted() {
    },
    data() {
      return {
        loading: false,
        active: "",
        dialog: false,
        remover: "",
      };
    },
    methods: {
      laminas(calc) {
        const num = Number(calc.laminas) + Number(calc.extras)
        return num
      },
      view(calc) {
        console.log("Visualizar", calc.id);
        // this.$store.dispatch("setCliente", cliente);
        // this.$store.dispatch("loadClienteVisitas", cliente.id);
        // this.$router.push("/cliente");
      },
      deletar(calc) {
        console.log("Deletar", calc.id);
        this.$store.dispatch("deleteCalc", calc.id);
        this.$store.dispatch("loadCalcs");
      },
    },
  };
  </script>
