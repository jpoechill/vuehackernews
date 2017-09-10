printMoreCheck: function () {
  if (this.items.length >= 25) {
    // this.printMore();
  } else {
    console.log("Stalling");
  }
},
printMore: function () {
  var vm = this;
  var currentItemCount = this.items.length;
  var thisMaxItemCount = currentItemCount + 20;
  var buffer = [];
  var bufferData = [];
  var sequence = currentItemCount;

  for (let i = currentItemCount; i < thisMaxItemCount; i ++) {
    var thisSingleLink = "https://hacker-news.firebaseio.com/v0/item/" + vm.allStoriesID[i] + ".json?print=pretty";

    // Make request
    axios.get(thisSingleLink)
      // Process request
      .then(function (response) {
        // Request received
        var response = response.data;

        var data = {
            id: i + 1,
            title: response.title,
            link: response.url,
            shortlink: vm.get_host(response.url),
            summary: response.by,
            kids: response.kids,
            score: response.score,
            time: response.time,
            storyid: vm.allStoriesID[i],
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
          console.log("Buffer push " + (i + 1));
        }

        function checkBuffer () {
          for (var t = 0; t < buffer.length; t++) {
            if (sequence === buffer[t]) {
              // Hit
              console.log(buffer[t]);
              vm.items.push(bufferData[t]);

              bufferData.splice(t, 1);
              buffer.splice(t, 1);
              sequence++;
              checkBuffer();
            }
          }
        }

        return [response.by, i + 1];
      })
      .then(function (responseArr) {
        // var username = responseArr[0];
        // var articleID = responseArr[1];
        //
        // // Fetch karma
        // var vueLink = "https://hacker-news.firebaseio.com/v0/user/" + username + ".json?print=pretty";
        // axios.get(vueLink)
        // .then(function (response) {
        //   compFunction.items[articleID-1].userKarma = response.data.karma;
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      })
      .catch(function (error) {
        console.log(error);
      }
    );
  }
},
