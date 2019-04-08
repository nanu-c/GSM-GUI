<template>
  <div class="subscriber">
    <h1>Subscriber</h1>
    <b-table       show-empty
      stacked="md"
      :fields="fields" :items="subscribers">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="activate(row)" class="mr-1">
          activate
        </b-button>
        <b-button size="sm" @click="" class="mr-1">
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
  },
  methods: {
    async getSubscribers () {
      const response = await SubscribersService.fetchSubscribers()
      this.subscribers = response.data
    },
    async activate(id){
      console.log(id.item.id)
      const response = await SubscribersService.activateSubscriber(id.item.id)
      console.log(response.data)
      this.getSubscribers()
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
