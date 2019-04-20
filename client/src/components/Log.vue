<template>
    <div class="log container">
      <h3>Log</h3>
      <textarea id="textarea">{{ messages }}</textarea>
    </div>
</template>

<script>
import io from 'socket.io-client';
    export default {
        name: 'Log',
        data () {
            return {
                response: "",
                socket : io('localhost:3000'),
                messages: []
            }
        },
        mounted() {
          this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            if (this.messages > 150)this.messages.shift();
            document.getElementById("textarea").scrollTop = document.getElementById("textarea").scrollHeight
            // you can also do this.messages.push(data)
        });
            },
        methods: { }
    }
</script>
<style>
  #textarea{
    width:100%;
    height:30vh;
  }
</style>
