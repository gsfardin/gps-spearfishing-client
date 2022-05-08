<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title class="headline">{{title}}</v-card-title>
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
      this.$http
        .get("user")
        .then((response) => {
          this.items = [...response.data.content];
        })
        .catch((e) => console.log(e));
    },
    editItem(user) {
      if(user.id) {
        this.$router.push({name: 'UserEdit', params: { id: user.id }})
      }
    },
    deleteItem(user) {
      console.log(user);
    }
  },
  created() {
    this.loadForm();
  },
};
</script>
