<template>
  <div class="user">
    <UsersListing/>
  </div>
</template>

<script>
import  UsersListing  from "../components/users/UsersListing.vue";
export default {
  name:'UsersView',
  components: {
    UsersListing
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .user {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
