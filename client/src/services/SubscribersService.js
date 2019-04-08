import Api from '@/services/Api'

export default {
    fetchSubscribers() {
        return Api().get('/subscribers')
    }
}
