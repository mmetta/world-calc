<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <!-- <v-row class="justify-center mt-2">
          <h3 class="success--text">{{ user.displayName }}</h3>
        </v-row>
        <v-row class="justify-center">
          <h5 class="success--text">{{ user.email }}</h5>
        </v-row> -->
        <v-row class="mt-3">
          <h3 class="ml-4">ORÇAMENTO DE ÁLBUM</h3>
          <v-spacer></v-spacer><span class="mr-4">{{ hoje }}</span>
        </v-row>
        <!-- <v-row class="mx-4">
          <v-text-field
            color="success"
            v-model="nome"
            maxLength="40"
            label="Nome do cliente"
          ></v-text-field>
        </v-row> -->
        <v-row class="mx-4 align-center">
          <v-select
            :items="produtos.tipos"
            v-model="tipo"
            item-text="text"
            item-value="id"
            label="Tipo"
            @change="
              limpar();
              setTamanhoLamina();
            "
          ></v-select>
        </v-row>
        <v-row class="mx-4 align-center">
          <v-select
            :items="tamanhos"
            v-model="tamanho"
            item-text="text"
            item-value="id"
            label="Tamanho"
            @change="valor = ''"
          ></v-select>
        </v-row>
        <v-row class="mx-4 align-center">
          <v-select
            :items="items_lam"
            v-model="laminas"
            item-text="text"
            label="Laminas"
            @change="
              valor = '';
              setPaginas();
            "
          ></v-select>
          <v-text-field
            :readonly="laminas ? false: true"
            type="number"
            color="success"
            class="mx-5"
            v-model="extras"
            max="10"
            min="0"
            label="Extras"
            @click="setPaginas()"
            @change="valor = ''"
          ></v-text-field>
        </v-row>
        <v-row class="mx-4 justify-center align-center">
          <div>
            Total:<strong class="mx-5">{{ paginas }}</strong
            ><span>{{ "páginas" }}</span>
          </div>
        </v-row>
        <div v-if="tipo === 'Álbum Premium'" class="my-4">
          <v-row class="mx-4">
            <v-select
              :items="produtos.capa"
              v-model="capa"
              item-text="text"
              item-value="id"
              label="Capa"
              @change="
                valor = '';
                setCapa();
              "
            ></v-select>
          </v-row>
          <!-- <v-row v-if="setMostruario()" class="mx-4 align-center">
            <v-text-field
              color="success"
              v-model="mostruario"
              maxLength="150"
              placeholder="Digite código/descrição"
              :label="'Qual ' + capa + '?'"
            ></v-text-field>
          </v-row> -->
        </div>
        <v-row class="mx-4">
          <v-select
            :items="produtos.laminacao"
            v-model="laminacao"
            item-text="text"
            item-value="id"
            label="Laminação"
            @change="valor = ''"
          ></v-select>
        </v-row>
        <div v-if="tipo === 'Álbum Premium'">
          <v-row class="justify-center">
            <strong>Acessórios</strong>
          </v-row>
          <v-row class="mx-2">
            <v-col cols="6">
              <v-checkbox
                v-for="number in 4"
                :key="number"
                hide-details
                :label="produtos.acessorios[number - 1]"
                v-model="item[number - 1]"
                @change="valor = ''"
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-for="number in 4"
                :key="number"
                hide-details
                :label="produtos.acessorios[number + 3]"
                v-model="item[number + 3]"
                @change="valor = ''"
              ></v-checkbox>
            </v-col>
          </v-row>
        </div>
        <!-- <v-row class="mx-4">
          <v-textarea
            background-color="success lighten-5"
            color="success"
            label="Observações"
            v-model="obs"
            counter
            maxlength="1000"
          ></v-textarea>
        </v-row> -->
        <v-row class="mx-8 my-8 align-center">
          <v-btn outlined color="success" @click="calcular()">calcular</v-btn>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <v-text-field
              type="number"
              color="success"
              v-model="valor"
              label="Valor"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ordem-servico",
  computed: {
    user() {
      return this.$store.getters.user
    },
    produtos() {
      return this.$store.getters.produtos;
    },
    precos() {
      return this.$store.getters.precos;
    },
  },
  mounted() {
    this.items = this.produtos.acessorio;
  },
  data() {
    return {
      hoje: new Date().toLocaleDateString("pt-BR"),
      nome: "",
      tipo: "",
      tamanho: "",
      tamanhos: [],
      laminas: 0,
      extras: 0,
      paginas: 0,
      capa: "",
      laminacao: "",
      mostruario: "",
      obs: "",
      items: [],
      items_lam: [],
      item: [false, false, false, false, false, false, false, false],
      date: "",
      menu1: false,
      valor: "",
    };
  },
  methods: {
    setTamanhoLamina() {
      if (this.tipo === "Álbum Premium") {
        this.tamanhos = this.produtos.tamanhoP;
        this.items_lam = this.produtos.laminasP;
      }
      if (this.tipo === "Álbum Slim") {
        this.tamanhos = this.produtos.tamanhoS;
        this.items_lam = this.produtos.laminasS;
      }
    },
    formatDate() {
      let dia = this.date;
      let part = dia.split("-");
      this.envioDate = part[2] + "/" + part[1] + "/" + part[0];
    },
    setPaginas() {
      if (this.laminas + this.extras <= 0) {
        return;
      }
      this.paginas = this.laminas * 2;
      if (this.extras > 0) {
        let p = this.extras * 2;
        this.paginas += p;
      }
    },
    setMostruario() {
      if (
        this.capa === "Tecido/sintético" ||
        this.capa === "Capa Madeira" ||
        this.capa === "Capa Couro natural"
      ) {
        return true;
      } else {
        return false;
      }
    },
    setCapa() {
      this.mostruario = "";
    },
    salvar() {
      if (
        this.nome.length < 4 ||
        !this.tipo ||
        !this.tamanho ||
        !this.laminas > 0 ||
        !this.capa ||
        !this.laminacao
      ) {
        this.$toast.error("Falta preencher algum campo!");
        return;
      }
      if (this.setMostruario() && this.mostruario.length < 2) {
        this.$toast.error("Falta código/descrição de " + this.capa);
        return;
      }
      let acessorios = [];
      for (let i = 0; i < this.produtos.acessorios.length; i++) {
        const el = this.produtos.acessorios[i];
        if (this.item[i]) {
          acessorios.push(el);
        }
      }
      const obj = {
        clienteId: this.user.uid,
        acessorios: acessorios,
        tipo: this.tipo,
        tamanho: this.tamanho,
        laminas: this.laminas,
        extras: this.extras,
        paginas: this.paginas,
        capa: this.capa,
        laminacao: this.laminacao,
        valor: this.valor,
        data: this.dataHora(),
      };
      this.$store.dispatch("createOS", obj);
      this.limpar();
      this.$router.push("/");
    },
    calcular() {
      if (!this.tipo || !this.tamanho || this.laminas + this.extras <= 0) {
        return;
      }
      let valor = 0;
      if (this.tipo === "Álbum Slim") {
        let as = this.tamanho + "-" + this.laminas;
        let p1 = this.precos.slim[as];
        p1 = p1.replace(",", ".");
        valor += parseFloat(p1);
        if (this.extras > 0) {
          let ex = this.tamanho + "-ext";
          let p2 = this.precos.slim[ex];
          p2 = p2.replace(",", ".");
          valor += parseFloat(p2) * parseInt(this.extras);
        }
        if (this.laminacao === 'Vevelt'){
          valor = parseFloat(valor) * 1.3
        }
        this.valor = parseFloat(valor).toFixed(2);
      }
      if (this.tipo === "Álbum Premium") {
        if (!this.capa) {
          return;
        }
        let as = this.tamanho + "-" + this.laminas;
        let p1 = this.precos.premium[as];
        p1 = p1.replace(",", ".");
        valor = parseFloat(p1);
        if (this.extras > 0) {
          let ex = this.tamanho + "-ext";
          let p2 = this.precos.premium[ex];
          p2 = p2.replace(",", ".");
          valor += parseFloat(p2) * parseFloat(this.extras);
        }
        if (this.laminacao === 'Vevelt'){
          valor = parseFloat(valor) * 1.3
        }
        valor += parseFloat(this.calcAcessorios());
        valor += parseFloat(this.calcCapa());
        this.valor = valor.toFixed(2);
      }
      if(this.user.email !== "mfmetta@gmail.com" &&
          this.user.email !== 'williamproduz@gmail.com' &&
          this.user.email !== "encadernadoraworld@gmail.com"
        ) {
        this.salvarCalc()
      }
    },
    calcAcessorios() {
      let v = 0;
      for (let i = 0; i < this.produtos.acessorios.length; i++) {
        let el = this.produtos.acessorios[i];
        if (el === "Baixo relevo") {
          el = "Gravação laser";
        }
        if (el === "Box laço/foto") {
          el = "Caixa presente";
        }
        if (this.item[i]) {
          let ac = this.tamanho + "-" + el;
          let p3 = this.precos.acessorios[ac];
          p3 = p3.replace(",", ".");
          v += parseFloat(p3);
        }
      }
      return parseFloat(v);
    },
    calcCapa() {
      let v = 0;
      let el = this.capa;
      if (el === "Tecido/sintético") {
        el = "Foto";
      }
      if (el === "Capa Madeira") {
        el = "Capa Couro natural";
      }
      if (el === "Capa acrílico") {
        el = "Capa cristal";
      }
      const item = this.tamanho + "-" + el;
      let p3 = this.precos.acessorios[item];
      p3 = p3.replace(",", ".");
      v += parseFloat(p3);
      return parseFloat(v);
    },
    salvarCalc() {
      let acessorios = [];
      for (let i = 0; i < this.produtos.acessorios.length; i++) {
        const el = this.produtos.acessorios[i];
        if (this.item[i]) {
          acessorios.push(el);
        }
      }
      const obj = {
        clienteId: this.user.uid,
        clienteEmail: this.user.email,
        clientePhone: this.user.tel,
        acessorios: acessorios,
        tipo: this.tipo,
        tamanho: this.tamanho,
        laminas: this.laminas,
        extras: this.extras,
        paginas: this.paginas,
        capa: this.capa,
        laminacao: this.laminacao,
        valor: this.valor,
        data: this.dataHora(),
      };
      this.$store.dispatch('saveCalc', obj)
    },
    limpar() {
      this.tamanho = "";
      this.laminas = 0;
      this.paginas = 0;
      this.extras = 0;
      this.capa = "";
      this.mostruario = "";
      this.laminacao = "";
      this.item = [false, false, false, false, false, false, false, false];
      this.valor = "";
    },
    cancelar() {
      this.limpar();
      this.$router.push("/");
    },
    dataHora() {
      const date = new Date().toLocaleDateString("pt-BR");
      const hora = new Date().toLocaleTimeString("pt-BR");
      return date + " " + hora;
    },
  },
};
</script>
