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
        <v-dialog
          v-model="dialog"
          scrollable
          persistent
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title primary-title>{{ item.clienteNome }}{{ item.clienteEmail }}</v-card-title>
            <v-card-subtitle>
              {{  item.data  }} <strong class="ml-3">{{ item.clientePhone }}</strong>
            </v-card-subtitle>
            <v-card-text>
              <v-col cols="12">
                <v-row>
                  <strong class="pr-2">{{ 'Tipo:' }}</strong><span>{{item.tipo}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Tamanho:' }}</strong><span>{{item.tamanho}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Lâminas:' }}</strong><span>{{laminas(item)}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Capa:' }}</strong><span>{{item.capa}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Laminação:' }}</strong><span>{{item.laminacao}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Acessórios:' }}</strong>
                </v-row>
                <v-row class="pl-6" v-for="ac in item.acessorios" :key="ac">
                  <span class="pl-6">{{ ac }}</span>
                </v-row>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                text
                @click="fechar()"
                >fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialog2"
          scrollable
          persistent
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title primary-title>{{ 'DELETAR ORÇAMENTO?' }}</v-card-title>
            <v-card-subtitle>
              {{  remover.data  }} <strong class="ml-3">{{ remover.clienteEmail }}</strong>
            </v-card-subtitle>
            <v-card-text>
              <v-col cols="12">
                <v-row>
                  <strong class="pr-2">{{ 'Tipo:' }}</strong><span>{{remover.tipo}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Tamanho:' }}</strong><span>{{remover.tamanho}}</span>
                </v-row>
                <v-row>
                  <strong class="pr-2">{{ 'Lâminas:' }}</strong><span>{{laminas(remover)}}</span>
                </v-row>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="warning"
                text
                @click="fechar()"
                >não
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="remove(remover.id)"
                >sim
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
        dialog2: false,
        remover: "",
        item:{},
      };
    },
    methods: {
      laminas(calc) {
        const num = Number(calc.laminas) + Number(calc.extras)
        return num
      },
      view(calc) {
        this.item = calc
        this.dialog = true
        // this.$store.dispatch("setCliente", cliente);
        // this.$store.dispatch("loadClienteVisitas", cliente.id);
        // this.$router.push("/cliente");
      },
      fechar(){
        this.item = {}
        this.dialog = false
        this.remover = {}
        this.dialog2 = false
      },
      deletar(calc) {
        this.remover = calc
        this.dialog2 = true
      },
      remove(id) {
        this.$store.dispatch("deleteCalc", id);
        this.$store.dispatch("loadCalcs");
        this.fechar()
      }
    },
  };
  </script>
