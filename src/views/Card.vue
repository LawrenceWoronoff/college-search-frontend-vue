<template v-if="card_items">
  <div id="card-view">
    <div class="search-wrapper">
        <input type="text" v-model="search" placeholder="Search city.." v-on:keydown="searchChange"/>
        <label>Search city:</label>
    </div>
    <div class="wrapper">
        <p class="no-match" v-if="filteredCardList.length==0">No matched citiy</p>
        <div class="card" v-for="(item, index) in filteredCardList.slice(show_start, show_end)">
            <a>
                <router-link :to="{ name: 'college', params: { college_id: item.id } }">
                    <img v-bind:src="'/assets/colleges/' + item.logo"/>
                </router-link>
                <router-link :to="{ name: 'college', params: { college_id: item.id } }" style="text-decoration: none;">
                    <p class="college-name">{{ item.name }}</p>
                </router-link>
                <router-link :to="{ name: 'college', params: { college_id: item.id } }" style="text-decoration: none;">
                    <p class="college-city">{{ item.city }}</p>
                </router-link>
                
                <i v-if="item.follow == 1" class="fa fa-star btn-favourite" v-on:click="favourite(item.id, index)"></i>
                <i v-if="item.follow != 1" class="fa fa-star-o btn-favourite" v-on:click="favourite(item.id, index)"></i>
            </a>
        </div>
    </div>
    <div class="pagination">
        <div v-for="n in pageNumbers" class="btn-page card" v-bind:class="{active: n==page}" v-on:click="gotoPage(n)">
            {{ n }}
        </div>
    </div>
  </div>
</template>

<script>
import config from "../config"
export default {
    
    data() {
      return {
        search : '',            // City search keywords
        display_per_page : 6,   // the number of cards per page
        show_start : 0,         // start index of card view
        show_end : 6,           // last index of card view
        page : 1,               // current page number
        card_items: [],         // card Item Array
        authenticated : localStorage.getItem('authenticated'),  // Flag variable if log in or not
        userEmail : localStorage.getItem('userEmail'),          // User Email
        userId : localStorage.getItem('userId')                 // user Id
      };
    },
    name: 'card',
    components: {     
        
    },
    mounted(){
        //// Get All Follow college data and push them to card_items to display on UI //
        this.axios.get(config.API_LOCATION + '/College/getFollowCollege/' + this.userId)
        .then((response) => {
            for (const [key, value] of Object.entries(response.data)) { //Loop Response of API
                this.card_items.push(value);       // Push to data array.
            }
        })
        .catch(function (error) {
            console.log(error) // Error log
        })
    },
    methods: {
       gotoPage: function (n) {     // When click page button on the bottom of list
           this.page = n;
           this.show_start = (n - 1) * this.display_per_page;
           this.show_end = Math.min(this.show_start + this.display_per_page, this.filteredCardList.length); 
       },
       favourite: function (college_id, card_id) {  // When user click star button
            if(!this.authenticated)            // if user doesn't login, redirect to login page.
              this.$router.push({ name: 'login' });
            else                                // else if the user logged in
            {
                var follow;
                var index = (this.page - 1) * this.display_per_page + card_id;
                if(this.filteredCardList[index]['follow'] == "1"){
                    this.filteredCardList[index]['follow'] = "0";
                    follow = 0;
                }
                else{
                    this.filteredCardList[index]['follow'] = "1";
                    follow = 1;
                }
                

                //  == Call setFollowCollege API (Please refer Backend) == //

                const params = new URLSearchParams();       // Add params for post...
                params.append('college_id', college_id);
                params.append('user_id', this.userId);
                params.append('follow', follow);

                this.axios.post('http://localhost/college_backend/College/setFollowCollege/', params, {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }})
                .then((response) => {
                    if(response.data != "failed"){
                    }else{
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }

            
       },
       searchChange: function(){        // When search input update, go to page 1 automatically
           this.gotoPage(1);
       }
    },
    computed: {
        pageNumbers: function(){    // Calculate page number as total cards number / display_perpage;
            return Math.ceil(this.filteredCardList.length/this.display_per_page);
        },
        filteredCardList() {        // Filter of cards according to searchbox for city name
            return this.card_items.filter(item => {
                return item.city.toLowerCase().includes(this.search.toLowerCase())
            })
            
        }
    }
}
</script>

<style lang="scss">

    div#card-view {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .search-wrapper {
            
            position: relative;
            label {
                position: absolute;
                font-size: 18px;
                color: rgba(0,0,0,.50);
                top: 8px;
                left: 12px;
                z-index: -1;
                transition: .15s all ease-in-out;
            }
            input {
                padding: 10px;
                font-size: 16px;
                color: rgba(0,0,0,.70);
                border: 1px solid rgba(0,0,0,.12);
                transition: .15s all ease-in-out;
                background: white;
                &:focus {
                    outline: none;
                    transform: scale(1.05);
                    & + label  {
                    font-size: 10px;
                    transform: translateY(-24px) translateX(-12px);
                    }
                }
                &::-webkit-input-placeholder {
                    font-size: 12px;
                    color: rgba(0,0,0,.50);
                    font-weight: 100;
                }
            }
        }
        .wrapper {
            display: flex;
            max-width: 100%;
            width: 100%;
            flex-wrap: wrap;
            padding-top: 12px;
        }
        .wrapper .no-match {
            margin: auto;
            font-size: 40px;
            color: #03A9F4;
            padding-top: 50px;
        }
        .card {
            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
            // max-width: 30%;
            width: 30%;
            margin: 12px;
            transition: .15s all ease-in-out;
            &:hover {
                transform: scale(1.1);
            }
            a {
                p {
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                p.college-name {
                    padding-top: 12px;
                    font-size: 20px;
                    color: #03A9F4;
                    cursor: pointer;
                }
                p.college-city {
                    font-size: 16px;
                    color: #3f4142;
                    cursor: pointer;
                }
                img {
                    height: 100px;
                    margin-top: 20px;
                    cursor: pointer;
                }
                small {
                    font-size: 10px;
                    padding: 4px;
                }
            }
            .btn-favourite{
                position: absolute;
                right: 20px;
                top: 20px;
                font-size: 25px;
                cursor: pointer;
            }
        }
        .pagination {
            display: flex;
        }
        .card.btn-page {
            width: 35px;
            height: 35px;
            cursor: pointer;
            justify-content: center;
        }

        .btn-page.active {
            background: royalblue;
        }
    }

</style>