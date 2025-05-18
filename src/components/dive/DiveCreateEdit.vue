<template>
  <v-container fluid>
    <v-form lazy-validation v-on:submit.prevent="onSubmit" ref="form" v-model="validForm">
      <v-card flat>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-dialog
                v-model="datePickerDialog"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="auto"
                max-width="400"
                persistent
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    prepend-inner-icon="mdi-calendar"
                    label="Data"
                    :rules="rules.field"
                    v-model="dive.dateDive"
                    readonly
                    rounded
                    filled
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="datePicker"
                >
                  <v-spacer></v-spacer>
                    <v-btn text color="primary"
                      @click="cancelDate"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn text color="primary"
                      @click="confirmDate"
                    >
                      Confirmar
                    </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-data-table
                dense
                :headers="headersFishers"
                :items="dive.fishers"
                item-key="id"
                id="fisher-table"
                class="elevation-1"
                :item-class="row_class_fisher"
                @click:row="handle_selected_fisher"
              >
                <template v-slot:top></template>
                <template v-slot:[`item.fisherProductions`]="{ item }">
                  <v-chip small v-for="fisherProduction in item.fisherProductions" :key="fisherProduction.id">
                    <span>{{fisherProduction.fish.name}}</span>
                  </v-chip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-dialog v-model="editFisherProductionDialog">
            <v-form>
              <v-card>
                <v-card-title> Edição dos dados do pescador </v-card-title>
                <v-card-text></v-card-text>
              </v-card>
            </v-form>
          </v-dialog>
        </v-card-text>
        <v-card-actions class="pr-4">
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="cancelModel">Cancelar</v-btn>
          <v-btn type="submit" color="primary" :disabled="!validForm">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    validForm: false,
    title: "Criação de Mergulho",

    dive: {},

    rules: {
      field: [
        v => !!v || 'Campo é obrigatório',
      ],
      text: [
        v => !!v || 'Campo é obrigatório',
        v => v && !!v.trim() || 'Valor não pode ser branco',
      ],
      email: [
        v => !!v || 'E-mail obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],    
      select: [
        v => v.length > 0 || "Seleção Obrigatória",
      ],
    },

    datePicker: "",
    datePickerDialog: false,

    headersFishers: [
      { text: "Mergulhador", value: "user.fullName" },
      { text: "Apelido", value: "user.nickName" },
      { text: "Produção", value: "fisherProductions" },
    ],
    editFisherProductionDialog: false,
    selectedFisherProductionObject: {}
  }),

  watch: {
    // VERIFICAR O NOME DO CAMPO - ESTÁ INCORRETO NO BANCO.
    "dive.dateDive" () {
      if (this.dive.dateDive){
        this.datePicker = moment(this.dive.dateDive, "DD/MM/YYYY").format("YYYY-MM-DD")  
      } else {
        this.cancelDate()
      }
    },
    datePicker() {
      if(this.datePicker) {
        this.dive.dateDive = moment(this.datePicker, "YYYY-MM-DD").format("DD/MM/YYYY"); 
      }
    }
  },

  methods: {
    loadModel () {
      const self = this
      if (self.$route.params.id) {
        self.title = 'Alteração de Mergulho'

        self.$http.get(`/dive/${self.$route.params.id}`)
        .then(response => {
          self.dive = response.data
        })
        .catch(e => {
          console.log(e)
        })
      }
    },
    onSubmit() {
      const self = this

      // Validação do formulário
      if(!self.$refs.form.validate()) {
        console.log("Formulário inválido");
        return
      }

      if(self.dive.id) {
        // Update persist
        self.$http.put('dive', this.dive)
        .then(response => {
          console.log("Update realizado com sucesso! \n", response)
          
          self.dive = response.data
        })
        .catch((error) => {
          console.log("Erro: \n", error)
        })

      } else {
        // Save persist
        self.$http.post('dive', this.dive)
        .then(response => {
          console.log("Update realizado com sucesso! \n", response)
        })
        .catch((error) => {
          console.log("Erro: \n", error)
        })
      }
    },
    cancelModel() {
      // Tratamento para voltar a tela de listagem -- Implementar
      console.log("Tratamento para voltar a tela de listagem -- Implementar");
      this.$router.go(-1);
    },
    confirmDate() {
      this.datePickerDialog = false;
      this.dive.dateDive = moment(this.datePicker, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    cancelDate() {
      this.datePickerDialog = false;
      this.dive.dateDive = "";
    },
    handle_selected_fisher(value) {
      // Controla o css do registro selecionado
      const prevItem = this.dive.fishers.find(fisher => fisher.isSelected);
      if (prevItem) this.$delete(prevItem, 'isSelected');
      
      this.$set(value, "isSelected", true)

      // Abre o componente para edição dos dados de produção do pescador
      this.editFisherProductionDialog = true
      this.selectedFisherProductionObject = Object.assign(value)
      console.log(this.selectedFisherProductionObject.user.fullName);
    },
    row_class_fisher(value) {
      // Retorna o css para o registro selecionado
      let linha = "fisher";

      if (value.isSelected) {
        linha += ` fisher-selected`
      }
      if (value.user.fullName === "Gabriel Santolin Fardin") {
        linha += " fisher-markup"
      }
      return linha;
    }
  },

  created () {
    this.loadModel()
  }
};
</script>

<style>
#fisher-table .fisher:hover {
  background-color: aqua;
  box-shadow: inset -1px 2px 15px 7px rgba(0,0,0,0.49) !important;
}
#fisher-table .fisher-selected {
  border-top: solid green;
  border-bottom: solid green;
  box-shadow: inset 0px 0px 16px -5px rgba(0,0,0,0.5) !important;
}
#fisher-table .fisher-markup {
  font-weight: bold;
}
/* #fisher-table .v-data-table__wrapper table {
  border-collapse: collapse; 
} */
</style>