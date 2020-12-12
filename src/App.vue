<template>
  <v-app>
    <Navbar v-if="userlogged == true" />

    <v-container class="pa-5">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["myuser", "userlogged"]),
  },
};
</script>

<style></style>
