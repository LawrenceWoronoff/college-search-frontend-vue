<template>
  <div class="jumbotron">
    <h1 class="display-4">College Search</h1>
    <img src="/assets/college-search.jpg"/>
    <hr class="my-4">
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    
    <router-link class="btn btn-primary btn-lg" to="/login">Login</router-link>
  </div>
</template>

<script>    // Home screen vue - no scripts (There are only UI)
import HelloWorld from '@/components/HelloWorld.vue' 

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
