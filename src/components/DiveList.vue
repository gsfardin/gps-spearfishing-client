<template>
  <v-data-table
    dense
    :headers="headers"
    :items="dives"
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:top></template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "dive-list",

  data: () => ({
    dives: [],
    headers: [
      { text: "Data", align: "start", sortable: false, value: "dateDive" },
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
          this.dives = [...response.data.content];
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
