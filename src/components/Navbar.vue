<template>
  <nav>
    <v-app-bar color="primary" max-height="70" dark>
      <v-toolbar-title
        >Login / Register system with <v-icon>mdi-google</v-icon> and
        <v-icon>mdi-facebook</v-icon></v-toolbar-title
      >

      <v-row class="justify-end">
        <v-tab>
          <router-link to="/" class="white--text routerlink">Home</router-link>
        </v-tab>

        <v-tab>
          <router-link to="/account" class="white--text routerlink"
            >Login / Register</router-link
          >
        </v-tab>

        <v-btn color="error" @click="signOut" v-if="myuser != undefined">Sign out</v-btn>
      </v-row>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  methods: {
    ...mapActions(["signOut"]),
  },
  computed: {
    ...mapState(["myuser"]),
  },
};
</script>

<style>
.routerlink {
  text-decoration: none;
}
</style>
