<template>
  <div style="padding-bottom: 10px; margin-top: -8px;">
    <div v-if="loading" style="display: inline-block; width: 100%; min-height: 1px;">
      <span class="index-item item-detail item">{{loadingText}} &nbsp;</span>
    </div>
    <div v-else style="display: inline-block; width: 100%;" v-for="(item, index) in sortedArticles" :key="item.id">
      <div v-bind:id="item.id">
        <div v-bind:class="[activeClass, errorClass]" style="clear: both;">
          <div class="index-item" style="clear: both; position: relative; padding-left: 10px;">
              <div class="index-num" style="display: inline-block;">
                <span>{{ item.id }}</span>
              </div>
              <div style="display: inline-block; margin-left: -0px;">
                <span class="item-title"><a :href="item.link" target="_blank" class="item-headerlink">{{ item.title }} </a></span>
                <span class="item-link" v-if="item.shortlink">({{ item.shortlink }})</span><br>
                <span class="item-detail">{{ item.score }} points by
                  <span v-bind:title="returnKarma(item.userKarma)">
                    <router-link :to="'/' + 'user' + '/' + item.summary">
                      <strong style="font-weight: 600; color: #555">{{ item.summary }}</strong>
                    </router-link>
                  </span> |
                  {{ getTimeDifference(currentUnixTime, item.time) }}
                  <span v-if="item.comments">|
                    <router-link :to="'/' + hello + '/' + item.hnid" id="comment-link">{{ item.comments }} comments</router-link>
                  </span>
                  <br>
                </span>
              </div>
          </div>
        </div>
      </div>
      <div v-if="index < (sortedArticles.length - 1)">
        <!-- <hr> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data: function () {
    return {
      items: [],
      allItems: {
        new: [],
        top: [],
        best: [],
        ask: [],
        show: [],
        jobs: [],
      },
      list: [],
      buffer: [],
      loading: true,
      sharedState: [],
      allStoriesID: [],
      marginValue: 0,
      loadingText: ' ',
      pageLinks:
        {
          new: "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
          best: "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty",
          top: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
          ask: "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty",
          show: "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty",
          jobs: "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty",
        },
      activeClass: 'fadein',
      errorClass: 'item'
    }
  },
  computed: {
    hello: function () {
      if (!this.$route.params.page) {
        return 'top';
      } else {
        return this.$route.params.page;
      }
    },
    sortedArticles: function () {
      // return this.items;
      return this.items.sort(
        function(a, b) {
          return a.id - b.id;
        }
      );
    },
    showPageLinks: function () {
      var currentRoute = this.$route.params.page;
      if (currentRoute === "best" || currentRoute === "new" || currentRoute === "top") {return true }
      else { return false };
    }
  },
  methods: {
    showThisCommentID: function (commentID) {
      for (var t = 0; t < this.items.length; t++) {
        if (this.items[t].id == commentID) {
          if (this.items[t].showComment === false) {
            this.items[t].showComment === true;
          } else {
            return true;
          }
        }
      }
    },
    returnKarma: function (karma) {
      karma = karma.toLocaleString();
      return karma + " karma";
    },
    printArticles: function (articles) {
      var vm = this;
      // Initialize starter counter
      var buffer = [];
      var bufferData = [];
      var sequence = 0;

      // Fetch each article
      for (let i = 0; i < 100; i ++) {
        var thisSingleLink = "https://hacker-news.firebaseio.com/v0/item/" + articles[i] + ".json?print=pretty";

        // Make request
        axios.get(thisSingleLink)
          // Process request
          .then(function (response) {
            // Request received
            var response = response.data;

            var data = {
              id: i + 1,
              hnid: articles[i],
              title: response.title,
              link: response.url,
              shortlink: vm.get_host(response.url),
              summary: response.by,
              kids: response.kids,
              score: response.score,
              time: response.time,
              storyid: articles[i],
              comments: response.descendants,
              commentsContent: [],
              userKarma: 0,
              showComment: false
            }

            if (sequence === i) {
              vm.items.push(data);
              sequence++;
              checkBuffer();
            } else {
              buffer.push(i)
              bufferData.push(data);
            }

            function checkBuffer () {
              for (var t = 0; t < buffer.length; t++) {
                if (sequence === buffer[t]) {
                  // Hit
                  vm.items.push(bufferData[t]);

                  bufferData.splice(t, 1);
                  buffer.splice(t, 1);
                  sequence++;
                  checkBuffer();
                }
              }
            }

            vm.loading = false;

            return [response.by, i + 1];
          })
          .then(function (responseArr) {
            var username = responseArr[0];
            var articleID = responseArr[1];

            // Fetch karma
            var vueLink = "https://hacker-news.firebaseio.com/v0/user/" + username + ".json?print=pretty";

            // Make request
            axios.get(vueLink)
            .then(function (response) {
              vm.items[articleID-1].userKarma = response.data.karma;
              // this.items[this.items.findIndex(findCherries)].karma = response.karma;
              // karma = response.karma;
            })
            .catch(function (error) {
              // console.log(error);
            });
          })
          .catch(function (error) {
            console.log(error);
          }
        );
      }
    },
    fetchArticles: function () {
      var vm = this;
      var pageToFetch = this.$route.params.page;
      var storiesURL;

      vm.items = []
      vm.loading = true

      if (!pageToFetch) {
        pageToFetch = "top";
      }

      storiesURL = this.pageLinks[pageToFetch];

      // Get new story IDs
      axios.get(storiesURL)
        .then(function (response) {
          var allStories = response.data;

          vm.allStoriesID = allStories;
          vm.printArticles(allStories);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted: function () {
    this.fetchArticles();
    // setInterval(function () {
    //   this.fetchArticles();
    // }.bind(this), 10000);

    setInterval(function () {
      this.showLoading(this.loadingText);
    }.bind(this), 600);
  },
  watch: {
    // Refresh data when route changes
    '$route': 'fetchArticles',
  },
  props: ['message'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* See linked external style-sheets */
.item-link {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 100;
}

#comment-link:hover {
  color: #777;
  /*text-decoration: underline;*/
}

hr {
  margin: 6px 0px 6px 0px;
  border-top: 2px solid rgba(0,0,0,.1);
}

</style>
