<template>
  <v-container fluid>
    <v-form lazy-validation v-on:submit.prevent="onSubmit" ref="form" v-model="validForm">
      <v-card flat>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="6" cols="12">
              <v-text-field
                v-model.trim="user.fullName"
                :rules="rules.text"
                label="Nome completo"
                rounded
                filled
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12">
              <v-text-field
                v-model.trim="user.nickName"
                label="Apelido"
                rounded
                filled
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12">
              <v-text-field
                v-model.trim="user.userName"
                :rules="rules.text"
                label="Usuário"
                rounded
                filled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="8" cols="12">
              <v-text-field
                v-model.trim="user.mail"
                :rules="rules.email"
                label="E-Mail"
                rounded
                filled
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field
                v-model.trim="user.phoneNumber"
                :rules="rules.field"
                label="Telefone"
                v-mask="['(##) ####-####','(##) #####-####']"
                rounded
                filled
              ></v-text-field>
            </v-col>
          </v-row>
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
                    label="Data Nascimento"
                    :rules="rules.field"
                    v-model="user.bithDate"
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
    title: "Criação de Usuário",

    user: {},

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
  }),

  watch: {
    // VERIFICAR O NOME DO CAMPO - ESTÁ INCORRETO NO BANCO.
    "user.bithDate" () {
      if (this.user.bithDate){
        this.datePicker = moment(this.user.bithDate, "DD/MM/YYYY").format("YYYY-MM-DD")  
      } else {
        this.cancelDate()
      }
    },
    datePicker() {
      if(this.datePicker) {
        this.user.bithDate = moment(this.datePicker, "YYYY-MM-DD").format("DD/MM/YYYY"); 
      }
    }
  },

  methods: {
    loadModel () {
      const self = this
      if (self.$route.params.id) {
        self.title = 'Alteração de usuário'

        self.$http.get(`/user/${self.$route.params.id}`)
        .then(response => {
          self.user = response.data
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

      if(self.user.id) {
        // Update persist
        self.$http.put('user', this.user)
        .then(response => {
          console.log("Update realizado com sucesso! \n", response)
          
          self.user = response.data
        })
        .catch((error) => {
          console.log("Erro: \n", error)
        })

      } else {
        // Save persist
        self.$http.post('user', this.user)
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
      this.user.bithDate = moment(this.datePicker, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    cancelDate() {
      this.datePickerDialog = false;
      this.user.bithDate = "";
    }
  },

  created () {
    this.loadModel()
  }
};
</script>

<style>
</style>