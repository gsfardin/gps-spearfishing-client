<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title class="headline">
        <span class="headline">{{title}}</span>
        <v-spacer></v-spacer> 
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined icon="icon" @click="addItem" v-bind="attrs" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>  
          </template>
          <span>Adicionar</span>    
        </v-tooltip>
      </v-card-title>
      <v-data-table
        dense
        :headers="headers"
        :items="items"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:top></template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "user-list",

  data: () => ({
    title: "Usuários - GPS",
    items: [],
    headers: [
      { text: "Nome", value: "fullName" },
      { text: "Apelido", value: "nickName" },
      { text: "Telefone", value: "phoneNumber" },
      { text: "E-Mail", value: "mail" },
      { text: "Actions", value: "actions" },
    ],
  }),
  components: {},
  methods: {
    loadForm() {
      const self = this;

      self.$http
        .get("user")
        .then((response) => {
          self.items = [...response.data.content];
        })
        .catch((e) => {
          console.log(e)
        });
    },
    addItem() {
      this.$router.push({name: 'UserCreate'})
    },
    editItem(user) {
      if(user.id) {
        this.$router.push({name: 'UserEdit', params: { id: user.id }})
      }
    },
    deleteItem(user) {
      const self = this;

      if(user.id) {
        self.$http
          .delete(`user/${user.id}`)
          .then((response) => {
            console.log("Deletado com sucesso!", response);
            self.loadForm();
          })
          .catch((e) => {
            console.log(e)
          }); 
      }
    }
  },
  created() {
    this.loadForm();
  },
};
</script>
