<template>
  <main>
    <div class="container" style="margin-top: 0px;">
      <div class="row" id="app">
        <div class="col-md-12" style="width: 100%; z-index: 1000; padding-top: 10px; ">
          <div class="main-title">hackernews</div>
          <div class="header-links" style="display: inline-block;">
            <!-- <strong> -->
              <ul>
                <li><router-link to="/new">newstories</router-link> |</li>
                <li><router-link to="/top">topstories</router-link> |</li>
                <li><router-link to="/best">beststories</router-link> |</li>
                <li><router-link to="/show">showhn</router-link> |</li>
                <li><router-link to="/ask">askhn</router-link> |</li>
                <li><router-link to="/jobs">jobs</router-link></li>
              </ul>
            <!-- </strong> -->
          </div>

        </div>
        <div class="row">
          <div class="col-md-12" style="margin-top: 2px; margin-left: 14px;">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'app',
  // data: function () {
  //   return {
  //     mymethod: Vue.myGlobalMethod(),
  //   }
  // },
  methods: {
    sayHello: function () {
        console.log("Hello..!");
        return "Hello..!"
    }
  }
}
</script>

<style>
.main-title {
  font-family: 'Pacifico', cursive;
  font-size: 56px;
  color: #444;
  /*opacity: .94;*/
  display: inline-block;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

body {
  background-color: #F4F4F4;
  color: #333;
}

a {
  color: #A7A7A7;
}

p {
  margin-bottom: 0;
}

.container {
  margin-top: 16px;
}

.header-links {
  color: #333;
  /*font-weight: 400;*/
  font-family: 'Open Sans', sans-serif;
  font-size: .815rem;
  font-weight: 400;
  /*font-family: 'Open Sans', sans-serif;*/
  margin-left: 6px;
  /*font-size: 12.8px;*/
  /*word-spacing: -8px;*/
  letter-spacing: .0275rem;
  display: inline-block;
  /*text-decoration: none;*/
}

.header-links a {
  color: #555;
  /*border-bottom: 1px #AAA solid;*/
  /*padding-bottom: 0px;*/
  /*bottom: 10px;*/
  /*line-height: 10px;*/
  /*margin-bottom: -20px;*/
  /*text-decoration: none;*/
}

.header-links a:hover {
  color: #777;
  /*color: #b8b0b0;*/
  /*border-bottom: 0px solid;*/
  /*padding-bottom: 0px;*/
  /*border-bottom: 1px solid;*/
}

.header-links a:active {
  /*color: #777;*/
  /*color: #b8b0b0;*/
  /*border-bottom: 0px solid;*/
  /*padding-bottom: 0px;*/
  /*border-bottom: 1px solid;*/
}

[v-cloak] {
  display: none;
}

ul {
  padding: 0px;
  margin: 0px;
}

li {
  display: inline;
  margin-right: 0px;
}

</style>
