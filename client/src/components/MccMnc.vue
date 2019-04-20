<template>
    <div class="container">
      <h3>Country and provider selection</h3>
      <div class="row">
        <div class="col-lg-3">
          <model-list-select :list="countries"
                             v-model="countryItem"
                             option-value="code"
                             option-text="name"
                             placeholder="select Country"
                             @select="alert('select')">
          </model-list-select>
        </div>
        <div class="col-lg-3">
          <model-list-select :list="operators"
                             v-model="operatorItem"
                             option-value="mnc"
                             option-text="brand"
                             placeholder="select mcn">
          </model-list-select>
        </div>
        <div class="col-lg-3">
          <model-list-select :list="bands"
                             v-model="bandItem"
                             option-value="band"
                             option-text="band"
                             placeholder="select band">
          </model-list-select>
        </div>
        <div class="col-lg-3">
          <b-button size="sm" @click="setOperator()" class="mr-1">
            set provider
          </b-button>
        </div>
      </div>
      <br >
    </div>
</template>

<script>
    import countries from '@/assets/countryNames.json'
    import { ModelListSelect } from 'vue-search-select'
    import MccService from '@/services/MccService'
    export default {
        name: 'MccMnc',
        components:{
          ModelListSelect
        },
        data () {
            return {
                response: "",
                countries:countries,
                bandItem: {},
                countryItem: {},
                operatorItem:{},
                operators:[],
                bands:[],
            }
        },
        watch: {
          countryItem:function (val) {
            this.selCountry();
          },
          operatorItem:function (val) {
            console.log(val.bands);
            var bands = val.bands.split("/");
            this.bands=[];
            var that = this;
            bands.forEach(function(b){
              that.bands.push({band:b})
            });
          },
        },
        mounted() {
            },
        methods: {
           async selCountry () {
             const response = await MccService.fetchOperatorsforCountry(this.countryItem.code)
             this.operators = response.data
           },
           async setOperator(){
             const response = await MccService.setOperator(this.operatorItem.brand,this.operatorItem.mcc,this.operatorItem.mnc, this.bandItem.band)
           }
         }
    }
</script>
<style>
  #textarea{
    width:100%;
    height:30vh;
  }
</style>
