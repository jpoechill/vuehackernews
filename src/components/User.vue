<template lang="html">
  <div class="item-detail">
    <div v-if="loading" style="display: inline-block; width: 100%; min-height: 1px;">
      <span class="index-item item-detail item" v-on:click="printMore()">{{ loadingText }} &nbsp;</span>
    </div>
    <div v-else data-v-a1ebb0bc="" class="item fadein" style="display: inline-block; background-color: rgb(255, 255, 255); margin-bottom: 6px;">
      <div data-v-a1ebb0bc="" class="index-item" style="clear: both;">
        <div data-v-a1ebb0bc="" style="clear: both; position: relative;">
          <span data-v-a1ebb0bc="" class="item-title">
            <!-- <img src="/static/img/blank-2.png" style="width: 1rem; height: 1rem; margin-right: 3px; margin-bottom: 5px;" alt=""> -->
            <strong>{{ userInfo.id }} </strong>({{ userInfo.karma }})
          </span>
            <br data-v-a1ebb0bc="">
            <div class="comment-detail-user" v-html="userInfo.about"></div>
          </span>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(item, index) in userArticles">
        <div class="fadein item" style="display: inline-block;">
          <div id="2">
            <div class="index-item" style="clear: both;">
              <div style="clear: both; position: relative;">
                <span class="index-num">{{ index + 1 }}</span>
                <span  class="item-title">
                  <a :href="item.link">
                    {{ item.title }}
                  </a>
                </span>
                <span class="item-link">({{ item.shortLink }})</span>
                <br> <span class="item-detail">
                  {{ item.score }} points by <span title="1 karma">
                  <strong >{{ userInfo.id }}</strong>
                  </span>
                  {{ getTimeDifference(currentUnixTime, item.time) }}
                  <br>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userInfo: {},
      userArticles: [],
      loadingText: " ",
      loading: true,
    }
  },
  methods: {
    getUserInfo: function (username) {
      var vm = this;

      var userURL = "https://hacker-news.firebaseio.com/v0/user/" + username + ".json?print=pretty";
      axios.get(userURL)
      .then(function GetUserData (response) {
        vm.userInfo = response.data;
        vm.loading = false;

        return response.data.submitted;
      })
      .then(function GetUserStories (response) {
        // Take array of articles and cycle through each
        for (let i = 0; i < response.length; i++) {
          // Create fetching url
          var url = "https://hacker-news.firebaseio.com/v0/item/" + response[i] + ".json?print=pretty";

          // Fetch data (nested callback)
          axios.get(url)
          .then(function GetUserStoriesData (response) {
            var response = response.data;
            var data = {
              title: response.title,
              link: response.url,
              shortLink: vm.get_host(response.url),
              summary: response.by,
              kids: response.kids,
              score: response.score,
              time: response.time,
              type: response.type,
              deleted: response.deleted
            }
            return data;
          })
          .then(function UpdateAppData (response) {
            if (response.type === 'story' && response.deleted !== true) {
              vm.userArticles.push(response)
              console.log(response);
            }
          });
        };
      });
    }
  },
  mounted: function () {
    this.getUserInfo(this.$route.params.username);

    setInterval(function () {
      this.showLoading(this.loadingText);
    }.bind(this), 600);
  }
}
</script>

<style lang="css">
/*.item-detail {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
}*/
</style>
