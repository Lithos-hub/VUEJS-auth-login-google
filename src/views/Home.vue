<template>
  <div>
      <h1 class="text-center">You logged in successfully!</h1>
      <h2 class="text-center my-5">
        Welcome! <span class="blue--text">{{ myuser.name }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState(["myuser"]),
  },
};
</script>

<style scoped>

</style>
