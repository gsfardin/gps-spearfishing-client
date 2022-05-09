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
    title: "Mergulhos - GPS",
    items: [],
    headers: [
      { text: "Data", value: "dateDive" },
      { text: "Hora Inicio", value: "initialDiveHour" },
      { text: "Hora Fim", value: "finalDiveHour" },
      { text: "Local", value: "fishingPlace.name" },
      { text: "Cidade", value: "fishingPlace.city.name" },
      { text: "Tipo de fundo", value: "fishingPlace.floorType" },
      { text: "Lua", value: "moonPhase" },
      { text: "Vento", value: "windDirection" },
      { text: "Maré", value: "seaDirection" },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
  }),
  components: {},
  methods: {
    loadForm() {
      this.$http
        .get("dive")
        .then((response) => {
          this.items = [...response.data.content];
        })
        .catch((e) => console.log(e));
    },
    addItem() {
      this.$router.push({name: 'DiveCreate'})
    },
    editItem(dive) {
      if(dive.id) {
        this.$router.push({name: 'DiveEdit', params: { id: dive.id }})
      }
    },
    deleteItem(dive) {
      const self = this;

      if(dive.id) {
        self.$http
          .delete(`dive/${dive.id}`)
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
