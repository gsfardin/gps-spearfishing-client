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
                class="elevation-1"
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
    },
    confirmDate() {
      this.datePickerDialog = false;
      this.dive.dateDive = moment(this.datePicker, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    cancelDate() {
      this.datePickerDialog = false;
      this.dive.dateDive = "";
    }
  },

  created () {
    this.loadModel()
  }
};
</script>

<style>
</style>