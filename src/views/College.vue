<template>
  <div class="detail_div">
    <img class="logo" v-bind:src="'/assets/colleges/' + college_detail.logo"/>
    <h1 class="college-name">{{ college_detail.name }}</h1>
    
    <hr class="my-4">
    <div class="t-left">
        <h3 class=""> Description: </h3>
        <p class="">{{ college_detail.details }}</p>
    </div>    

    <hr class="my-4">
    <div class="row" style="justify-content: space-evenly; align-items: center;">
      <img class="b_picture" v-bind:src="'/assets/colleges/' + college_detail.b_picture"/>
      <h1 class="college-name">{{ college_detail.city }}</h1>
    </div>

    <hr class="my-4">
    <div class="t-left">
        <h3 class=""> Pricing: </h3>
        <p class="">{{ college_detail.pricing }} HRK </p>
    </div>    

  </div>
</template>

<script>
import config from "../config"  // Import config file for API endpoint prefix

export default {
  data() {
    return {
      college_detail: {     // College detail which include logo, background, description, pricing, city name
       
      },
      college_id: null,   // College id to show detail
    };
  },
  name: 'college',
  components: {
  },
  mounted(){
    // === Get College Detail Information and put into college_detail variable above. == //
    this.college_id=this.$route.params.college_id;

    // Pass through college_id for this endpoint
    this.axios.get(config.API_LOCATION + '/College/getCollegeDetail/' + this.college_id)
        .then((response) => {
            this.college_detail = response.data;  //put into data variable
            console.log(this.college_detail);
        })
        .catch(function (error) {
            console.log(error) // error log
        })
  }


}
</script>

<style lang="scss">
  .detail_div{
    padding: 2rem 10%;
    margin-bottom: 2rem;
    background-color: #e9ecef;
    border-radius: .3rem;
  }
  
  .logo {
    width: 150px;
  }

  .b_picture {
    width: 500px;
  }

  .t-left{
    text-align: left;
  }
  // .container { 
  //   width: 90%;
  // }
</style>