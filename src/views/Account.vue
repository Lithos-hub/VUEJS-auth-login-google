<template>
  <div>
    <h1 class="display-3 text-center my-5">LOGIN / REGISTER</h1>

    <hr />

    <v-layout justify-center mt-5>
      <v-flex xs12 sm8 md6 xl4>
        <v-card></v-card>

        <v-card-text
          class="display-1 text-uppercase white--text text-center"
          :class="loginstate ? 'success' : 'primary'"
        >
          <span v-if="!loginstate">Login</span>
          <span v-if="loginstate">Sign up</span>
        </v-card-text>

        <v-card-text>
          <v-btn block color="error" class="my-3" @click="google">
            <v-icon left dark>mdi-google</v-icon>
            Google
          </v-btn>
          <v-btn block color="info" class="my-3" @click="facebook">
            <v-icon left dark>mdi-facebook</v-icon>
            Facebook
          </v-btn>
        </v-card-text>

        <v-card-text>
          <v-btn block @click="loginstate = true" v-if="!loginstate"
            >Don't have an account? Join us now</v-btn
          >
          <v-btn block @click="loginstate = false" v-if="loginstate"
            >Already have an account? Login now</v-btn
          >
        </v-card-text>
      </v-flex>
    </v-layout>
    <div id="version-count">
      <v-divider></v-divider>
      <p class="mt-5">Version: 1.0</p>
    </div>
    <v-bottom-sheet v-model="sheet" inset id="bottom-sheet">
      <template v-slot:activator="{ on, attrs }">
        <div id="about-btn">
          <v-btn color="error" dark block large v-bind="attrs" v-on="on" tile
            >About</v-btn
          >
        </div>
      </template>
      <v-row no-gutters class="blue darken-4">
        <v-btn class="mt-6" text color="white" @click="sheet = !sheet"> close </v-btn>
        <v-col>
          <v-sheet class="text-center pa-3" height="100%">
            <div class="py-5 text-justify">
              <v-img
                src="../assets/img/english-icon.jpg"
                width="50"
                height="30"
                class="ma-auto mb-5"
              ></v-img>
              This app consists of using Firebase authentication services using our Google
              and Facebook accounts. <br /><br />When accessing or registering, the user
              accesses the protected route "Home", where he is welcomed with a dynamic
              text referring to his username with those authentication systems.
              <br /><br />The navbar and the Sign Out button are dynamic, so they will
              only appear if the user has accessed his account.
            </div>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="text-center pa-3" height="100%">
            <div class="py-5 text-justify">
              <v-img
                src="../assets/img/spanish-icon.jpg"
                width="50"
                height="30"
                class="ma-auto mb-5"
              ></v-img>
              Esta app consiste en utilizar los servicios de autenticación de Firebase
              haciendo uso de nuestras cuentas de Google y Facebook. <br /><br />Al
              acceder o registrarse, el usuario accede a la ruta protegida "Home", donde
              se le da la bienvenida con un texto dinámico haciendo referencia a su nombre
              de usuario con dichos sistemas de autenticación. <br /><br />El navbar y el
              botón de Sign Out son dinámicos, por lo que solo aparecerán en caso de que
              el usuario haya accedido a su cuenta.
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations } from "vuex";

import router from "@/router";

export default {
  name: "Account",
  data() {
    return {
      loginstate: false,
      sheet: false,
    };
  },
  methods: {
    ...mapMutations(["newUser"]),
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();

      this.auth(provider);
    },
    facebook() {
      const provider = new firebase.auth.FacebookAuthProvider();

      this.auth(provider);
    },
    async auth(provider) {
      try {
        const result = await firebase.auth().signInWithPopup(provider);

        const user = result.user;

        const myuser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
        };

        this.newUser(myuser);

        await db.collection("users").doc(myuser.uid).set(myuser);
        console.log("User saved on DB");
        router.push({ path: "/" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #about-btn {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }

  #version-count {
    position: relative;
    text-align: center;
    margin: 0 auto;
    color: green;
    margin-top: 50px;
  }

  .text-justify {
    font-size: 12px;
    padding: 0px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #about-btn {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }

  #version-count {
    position: relative;
    text-align: center;
    margin: 0 auto;
    color: green;
    margin-top: 50px;
  }
  .text-justify {
    font-size: 15px;
    margin-bottom: 50px;
    padding: 20px;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #about-btn {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }

  #version-count {
    position: relative;
    text-align: center;
    margin: 0 auto;
    color: green;
    margin-top: 50px;
  }
  .text-justify {
    font-size: 20px;
    margin-bottom: 10px;
    padding: 20px;
  }
}
</style>
