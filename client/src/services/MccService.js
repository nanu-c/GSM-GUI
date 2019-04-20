import Api from '@/services/Api'

export default {
    fetchOperatorsforCountry(code){
      return Api().post('/operators', {"country":code} )
    },
    setOperator(name,mcc,mnc,band){
      return Api().post('/operator',
        {
          "name":name,
          "mcc":mcc,
          "mnc":mnc,
          "band":band
        }
      )}
}
