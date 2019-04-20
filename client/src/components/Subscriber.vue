<template>
  <div class="subscriber container">
    <h1>Subscriber</h1>
    <div class="row">
      <div class="col-lg-4">
        <span>Sms to send:</span>
        <br />
        <textarea v-model="message" placeholder="add multiple lines"></textarea>
      </div>
      <div class="col-lg-4">
        <p style="white-space: pre-line;">{{ message }}</p>
      </div>
      <div class="col-lg-4">
        <b-button size="sm" @click="sendtoAllSms(subscribers, message)" class="mr-1">
          send sms to all subscribers
        </b-button>
      </div>
    </div>
    <b-table       show-empty
      stacked="md"
      :fields="fields" :items="subscribers">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="activate(row)" class="mr-1">
          activate
        </b-button>
        <b-button size="sm" @click="sendSms(row.item.id, message)" class="mr-1">
          send sms
        </b-button>
      </template>
    </b-table>
    <!-- Info modal -->
    <!-- <b-modal id="modal-info" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal> -->
  </div>
</template>

<script>
import SubscribersService from '@/services/SubscribersService'
export default {
  name: 'Subscriber',
  data () {
    return {
      message:"",
      subscribers: [],
      fields: [
        { key: 'id', label: 'id', sortable: true, sortDirection: 'desc' },
        { key: 'name', label: 'Number', sortable: true, class: 'text-center' },
        { key: 'authorized', label: 'is Active' },
        { key: 'actions', label: 'Actions' }
      ],
    }
  },
  mounted () {
    this.getSubscribers()
    this.setMessage()
  },
  methods: {
    async getSubscribers () {
      const response = await SubscribersService.fetchSubscribers()
      this.subscribers = response.data
    },
    setMessage(){

      this.message = localStorage.getItem("message");
    },
    async activate(id){
      console.log()
      const response = await SubscribersService.activateSubscriber(id.item.id)
      console.log(response.data)
      this.getSubscribers()
    },
    async sendSms(id,message){
      localStorage.setItem("message", message)
      const response = await SubscribersService.sendSms(id, message)
      this.getSubscribers()
    },
    async sendtoAllSms(subscribers, message ){
      if (message=="")alert("Message could not be empty")
      else {
        localStorage.setItem("message", message)
        var that = this;
        subscribers.forEach(function(s){
          that.sendSms(s.id, message)
        });
      }

    }
  }

}
// import db from '@/db/db.js'
// console.log(db.db)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
