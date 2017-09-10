// Global Methods
var MyPlugin = {
  install: function (Vue, options) {
    Vue.mixin({
      computed: {
        currentUnixTime: function () {
          return Math.round(+new Date()/1000);
        }
      },
      methods: {
        hello: function () {
          console.log('hello from mixin!')
        },
        get_host: function (url){
            if (url) {
              var url = url.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/,'$1');
              url = url.replace(/\/$/, '');
              url = url.replace(/.*?:\/\//g, "");
              url = url.replace("www.","")
              return url;
            }
        },
        getTimeDifference: function (current, previous) {
            // return previous;
            var msPerMinute = 60; //
            var msPerHour = msPerMinute * 60; //
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;
            var elapsed = current - previous;

            if (elapsed < msPerMinute) {
                //  return Math.round(elapsed/1000) + ' seconds ago';
                return "Just now";
            } else if (elapsed < msPerHour) {
                 return Math.round(elapsed/msPerMinute) + ' minutes ago';
            } else if (elapsed < msPerDay ) {
                 return Math.round(elapsed/msPerHour ) + ' hours ago';
            } else if (elapsed < msPerMonth) {
                return Math.round(elapsed/msPerDay) + ' days ago';
            } else if (elapsed < msPerYear) {
                return Math.round(elapsed/msPerMonth) + ' months ago';
            } else {
                return Math.round(elapsed/msPerYear ) + ' years ago';
            }
        }
      }
    })
  }
}

export default MyPlugin;
