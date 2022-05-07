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
  name: "dive-list",

  data: () => ({
    title: "Usuários - GPS",
    items: [],
    headers: [
      { text: "Nome", value: "fullName" },
      { text: "Apelido", value: "nickName" },
      { text: "Telefone", value: "phoneNumber" },
      { text: "E-Mail", value: "mail" },
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
    editItem(dive) {
      console.log(dive);
    },
    deleteItem(dive) {
      console.log(dive);
    }
  },
  created() {
    this.loadForm();
  },
};
</script>
