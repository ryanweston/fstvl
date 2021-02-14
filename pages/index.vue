<template>
  <div>
    <h1>FIND FESTIVALS NEAREST TO YOU</h1>
          <Search />
     </div>
</template>

<script lang="ts">

// import Results from '~/nuxt.config'
import Vue from 'vue';

export default Vue.extend({
  layout: 'default',
  name: 'App',
  mounted() {
      console.log(this.$route.params)
  }
}
)
</script>
