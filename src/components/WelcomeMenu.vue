<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2">
          <h1 class="green text-center">Crud de usuarios</h1>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="greetings d-flex justify-center">
        <v-sheet class="ma-2 pa-2">
          <img alt="Vue logo" class="logo" src="@/assets/user.png" width="200" height="200" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
  display:block;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
