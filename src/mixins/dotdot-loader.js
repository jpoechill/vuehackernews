var MyPlugin = {
  install: function (Vue, options) {
    Vue.mixin({
      methods: {
        showLoading: function (text) {
          var updateText;
          switch (text) {
            case " ":
              updateText = "."
              break;
            case ".":
              updateText = ".."
              break;
            case "..":
              updateText = "..."
              break;
            case "...":
              updateText = " "
              break;
          }
          this.loadingText = updateText;
        }
      }
    })
  }
}

export default MyPlugin;
