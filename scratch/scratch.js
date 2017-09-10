
<!-- <transition name="fade">
  <div v-if="showThisCommentID(item.id)" class="comment-detail" style="clear: both;">
    <div v-for="(thisComment, index) in item.commentsContent" :key="item.commentsContent">
      <div class="comment-detail-user" style="padding-bottom: 6px; word-wrap: break-word;" v-bind:style="{ marginLeft: (marginValue * thisComment.index) + 'px'}">
        <span v-bind:title="thisComment.userKarma"><strong>{{thisComment.author}}</strong></span> {{thisComment.timeposted}}<span v-if="thisComment.kids > 0"> | {{thisComment.kids}} <span v-if="thisComment.kids == 1">comment</span><span v-else>comments</span> </span><br>
        <div style="overflow: hidden;" v-html="thisComment.comment">
        </div>
      </div>
    </div>
</transition> -->

<!-- loadArticleComments: function  (e, articleID, storyID, kids) {
  e.preventDefault();
  var mainItems = this.items;
  var currentTime = this.currentUnixTime;
  var mainScope = this;

  if (mainItems[articleID-1].showComment === true) {
    mainItems[articleID-1].showComment = false;
    return;
  }

  mainItems[articleID-1].commentsContent = [];

  for (let i = 0; i < kids.length; i ++) {
    var thisSingleLink = "https://hacker-news.firebaseio.com/v0/item/" + kids[i] + ".json?print=pretty";
    axios.get(thisSingleLink)
      // Process request
      .then(function (response) {
        var thisPostTime = mainScope.getTimeDifference(currentTime, response.data.time);
        var thisPostKids;

        if (typeof response.data.kids !== 'undefined' ) {
          thisPostKids = response.data.kids.length;
        } else {
          thisPostKids = 0;
        }

        mainItems[articleID-1].commentsContent.push(
          {
            index: i,
            author: response.data.by,
            userKarma: "0 karma",
            kids: thisPostKids,
            comment: response.data.text,
            timeposted: " " + thisPostTime,
          }
        );

        return [i, response.data.by, articleID];
      }).then(function(returnArr) {
        var commentIndex = returnArr[0];
        var commentAuthor = returnArr[1];
        var articleID = returnArr[2];
        var vueLink = "https://hacker-news.firebaseio.com/v0/user/" + commentAuthor + ".json?print=pretty";
        var hello = axios.get(vueLink)
          .then(function (response) {
            console.log(response.data.karma);
            console.log(mainScope.returnKarma(response.data.karma));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      }
    );
    mainScope.toggleComments(e, articleID);
  }
},
toggleComments (e, commentID) {
  e.preventDefault();
  for (var t = 0; t < this.items.length; t++) {
    if (this.items[t].id == commentID) {
      if (this.items[t].showComment === false) {
        // Hide all comments
        for (var i = 0; i < this.items.length; i ++) {
          this.items[i].showComment = false;
        }

        // Show this comment
        this.items[t].showComment = true;

      } else if (this.items[t].showComment === true) {
        // Show this comment
        this.items[t].showComment = false;
      }
    }
  }
} -->

 <!-- v-bind:style="{ marginLeft: (marginValue * thisComment.index) + 'px'}" -->
 <!-- Item title: {{item.title}}<br>
 Item author: {{item.author}}<br> -->



 <!-- {{ kids }} -->

 <div v-if="showThisCommentID(item.id)" class="comment-detail" style="clear: both;">
   <div v-for="(thisComment, index) in item.commentsContent" :key="item.commentsContent">
     <div class="comment-detail-user" style="padding-bottom: 6px; word-wrap: break-word;" v-bind:style="{ marginLeft: (marginValue * thisComment.index) + 'px'}">
       <span v-bind:title="thisComment.userKarma"><strong>{{thisComment.author}}</strong></span> {{thisComment.timeposted}}<span v-if="thisComment.kids > 0"> | {{thisComment.kids}} <span v-if="thisComment.kids == 1">comment</span><span v-else>comments</span> </span><br>
       <div style="overflow: hidden;" v-html="thisComment.comment">
       </div>
     </div>
   </div>
 </div>


 <!-- <a href="#" v-on:click="loadArticleComments($event, item.id, item.storyid, item.kids)">
   {{ item.comments }} comments </a> -->
