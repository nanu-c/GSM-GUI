<template>
  <div id="app" class="container">
    <Subscriber />
    <MccMnc />
    <Log />
  </div>
</template>

<script>
import Subscriber from '@/components/Subscriber.vue'
import Log from '@/components/Log.vue'
import MccMnc from '@/components/MccMnc.vue'

export default {
  name: 'app',
  components: {
    Log,
    Subscriber,
    MccMnc
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
