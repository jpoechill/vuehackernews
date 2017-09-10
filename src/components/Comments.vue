<template>
  <div style="margin-left: -8px; margin-top: -8px;">
    <div v-if="loading" style="display: inline-block; width: 100%; min-height: 1px;">
      <span class="index-item item-detail loading item" v-on:click="printMore()">{{loadingText}} &nbsp;</span>
    </div>
    <!--  Heading -->
    <div v-else style="display: inline-block; margin-bottom: 4px; background-color: #FFF; z-index: 1000;" class="item fadein">
      <div class="index-item" style="clear: both;">
        <div style="clear: both; position: relative;">
            <span class="item-title"><a :href="item.link">{{ item.title }} </a></span>
            <span class="item-link" v-if="item.shortlink">({{ item.shortlink }})</span><br>
            <div v-if="item.text" class="comment-detail-user" style="overflow: hidden;" v-html="item.text">
            </div>
            <span class="item-detail">{{ item.score }} points by
              <strong>{{ item.author }}</strong>
              {{ getTimeDifference(currentUnixTime, item.time) }}
              | {{ item.kids ? item.kids.length : '0' }} comments
            </span>
            </span>
        </div>
      </div>
    </div>
    <!-- <hr> -->
    <!-- <div class="background-color: orange; height: 200px; min-height: 400px;">
      <br><br><br>
    </div> -->

      <!--  First order comments -->
      <div style="display: inline-block; padding-left: 10px; padding-top: 0px;" class="comment" v-for="(thisComment, index) in allComments">
        <div class="index-item" style="clear: both;">
          <div style="clear: both; position: relative;">
            <div class="comment-detail" style="clear: both;">
              <div>
                <div class="comment-detail-user fadein" style="padding-bottom: 0px; word-wrap: break-word;" v-bind:style="{ marginLeft: (thisComment.marginCounter * 40) + 'px' }">
                  <span v-if="thisComment.deleted">[deleted]</span>
                  <span v-else v-bind:title="thisComment.userKarma">
                    <!-- <img src="/static/img/blank.png" style="width: .9rem; height: .9rem; margin-right: 3px; margin-bottom: 3px;" alt=""> -->
                    <router-link :to="'/' + 'user' + '/' + thisComment.author">
                      <strong>{{thisComment.author}}</strong>
                    </router-link>
                    </span>
                  <!-- {{thisComment.timeposted}} -->
                  <!--  Comment count indicator -->
                  <span v-if="thisComment.kids.length > 0"> |
                      <!-- <router-link :to="'/' + 'top' + '/' + thisComment.id "> -->
                      <a href="#" v-on:click.prevent="showKids(index, thisComment.kids)" id="comment-link">
                          {{ thisComment.kids.length }}
                        <span v-if="thisComment.kids == 1">comment</span>
                        <span v-else>comments</span>
                      </a>
                      <!-- </router-link> -->
                  </span>
                  <br>
                  <!--  Actual comment -->
                  <div style="overflow: hidden;" v-html="thisComment.comment">
                  </div>
                  <!--  Second order comments, etc. -->
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
  name: 'hello',
  data: function () {
    return {
      loading: true,
      hello: this.$route.params.page,
      there: this.$route.params.id,
      allComments: [],
      loadingText: " ",
      item: {},
      kids: [],
    }
  },
  computed: {
    showChilds : function () {
      var thisURL = "https://hacker-news.firebaseio.com/v0/item/" + this.there + ".json?print=pretty";
      var vm = this;

      axios.get(thisURL)
        .then(function (response) {
          var response = response.data;

          vm.item = {
            id: 1,
            // hnid: articles[i],
            title: response.title,
            link: response.url,
            shortlink: vm.get_host(response.url),
            author: response.by,
            kids: response.kids,
            score: response.score,
            time: response.time,
            text: response.text,
            marginCounter: 1,
            expanded: false,
            // storyid: articles[i],
            // comments: response.descendants,
            // commentsContent: [],
            // userKarma: 0,
          }

          for (var i = 0; i < response.kids.length; i ++) {
            vm.kids.push(response.kids[i]);
          }
          // vm.kids = response.kids;
          vm.loading = false;

          return vm.kids;
        })
        .then (function (kids) {
          for (let i = 0; i < kids.length; i ++) {
            var thisURL = "https://hacker-news.firebaseio.com/v0/item/" + kids[i] + ".json?print=pretty";
            axios.get(thisURL)
              .then(function (response) {
                var thisPostKids;

                if (typeof response.data.kids !== 'undefined' ) {
                  thisPostKids = response.data.kids;
                  // console.log(response.data.kids);
                } else {
                  thisPostKids = 0;
                }

                vm.allComments.push(
                  {
                    index: i,
                    id: response.data.id,
                    author: response.data.by,
                    kids: thisPostKids,
                    deleted: response.data.deleted,
                    marginCounter: 0,
                    expanded: false,
                    // text: response.data.text,
                    timeposted: vm.getTimeDifference(vm.currentUnixTime, response.data.time),
                    comment: response.data.text,
                  }
                );
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        }
      );
    }

  },
  methods: {
    countKids: function (el) {
      if (typeof el.kids !== 'undefined') {
        return el.kids.length;
      } else {
        return "";
      }
    },
    showKids: function (index, kidIDs) {
      var vm = this
      // console.log("Do something here, at index: " + index);
      // console.log("Kids: " + kidIDs);
      console.log("Clicked on item index: " + index);
      console.log(vm.allComments[index].id);
      // console.log("Item is now expanded. ");


      // console.log(vm.allComments[index])
      var loaded = 0;
      // Fetch
      for (let i = 0; i < kidIDs.length; i++) {
        var link = "https://hacker-news.firebaseio.com/v0/item/" + kidIDs[i] + ".json?print=pretty"

        axios.get(link)
        .then (function (response) {
          // console.log(response.data);
          // console.log(index);
          // console.log(vm.allComments[index].marginCounter);
          var kids = 0;

          if (response.data.kids != undefined) {
            kids = response.data.kids;
          }

          var item = {
            index: i,
            id: response.data.id,
            author: response.data.by,
            kids: kids,
            deleted: response.data.deleted,
            text: response.data.text,
            expanded: false,
            marginCounter: vm.allComments[index].marginCounter + 1,
            timeposted: vm.getTimeDifference(vm.currentUnixTime, response.data.time),
            comment: response.data.text,
          }

          if (vm.allComments[index].expanded == false) {
            vm.allComments.splice(index+1, 0, item);
          }

          return i
        })
        .then(function(response) {
          loaded = loaded + 1

          if (loaded == kidIDs.length ) {
            vm.allComments[index].expanded = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      // vm.allComments[index].expanded = true;
    }
  },
  mounted: function () {
    this.showChilds;

    setInterval(function () {
      this.showLoading(this.loadingText);
    }.bind(this), 600);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* See linked external style-sheets */

hr {
  margin: 6px 0px 6px 0px;
  border-top: 2px solid rgba(0,0,0,.1);
}

#comment-link:hover {
  /*color: #777;*/
  /*text-decoration: underline;*/
}
</style>
