import Api from '@/services/Api'

export default {
    fetchSubscribers() {
        return Api().get('/subscribers')
    },
    activateSubscriber(id) {
        return Api().put('/subscribers/'+id+'/activate')
    }
}
