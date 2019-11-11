<template>
  <div>
    <div class="container">
      <div>
        <logo />
        <h1 class="title">Nuxtjs-Repos-index-gh-pages</h1>
        <h2 class="subtitle">My tremendous Nuxt.js project</h2>
        <div class="links">
          <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        </div>
      </div>
    </div>
    <div class="container-table">
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Repository</th>
            <th>URL</th>
            <th>Github Pages</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Language</th>
            <th>License</th>
            <th>Archived</th>
            <th>Disabled</th>
            <th>Fork</th>
            <th>Issues</th>
            <th>Stargazers</th>
            <th>Watchers</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(repo, index) in repos" :key="repo.id">
            <td>{{index + 1}}</td>
            <td>
              <a :href="repo.owner.html_url" target="_blank">
                <img class="avatar-img" :src="repo.owner.avatar_url" />
                {{repo.owner.login}}
              </a>
              &nbsp;/
              <a
                :href="repo.html_url"
                target="_blank"
              >&nbsp;{{repo.name}}&nbsp;</a>
            </td>
            <td>
              <a :href="repo.git_url" target="_blank">git</a>
              <br />
              <a :href="repo.ssh_url" target="_blank">ssh</a>
              <br />
              <a :href="repo.clone_url" target="_blank">clone</a>
            </td>
            <td>
              <span v-if="repo.has_pages">
                <a
                  :href="'https://' + repo.owner.login + '.github.io/' + repo.name"
                  target="_blank"
                >Pages</a>
              </span>
            </td>
            <td>{{repo.created_at}}</td>
            <td>{{repo.updated_at}}</td>
            <td>{{repo.language != null ? repo.language : '---'}}</td>
            <td>{{repo.license != null ? repo.license.name : '---'}}</td>
            <td>{{repo.archived ? 'T' : '-'}}</td>
            <td>{{repo.disabled ? 'T' : '-'}}</td>
            <td>
              {{repo.fork ? 'T' : '-'}}
              <br />
              <a :href="repo.html_url + '/network/members'" target="_blank">{{repo.forks_count}}</a>
            </td>
            <td>
              <a :href="repo.html_url + '/issues'" target="_blank">{{repo.open_issues_count}}</a>
            </td>
            <td>
              <a :href="repo.html_url + '/stargazers'" target="_blank">{{repo.stargazers_count}}</a>
            </td>
            <td>
              <a :href="repo.html_url + '/watchers'" target="_blank">{{repo.watchers_count}}</a>
            </td>
            <td>{{repo.description != null ? repo.description : '---'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapGetters } from "vuex";

const suffixGithubIo = ".github.io";

function getQueries() {
  var vars = [],
    max = 0,
    hash = "",
    array = "";
  var url = window.location.search;
  hash = url.slice(1).split("&");
  max = hash.length;
  for (var i = 0; i < max; i++) {
    array = hash[i].split("=");
    vars.push(array[0]);
    vars[array[0]] = array[1];
  }
  return vars;
}

function getQueryName() {
  let queryName = "ya-androidapp";
  let usrname = window.location.username;
  if (typeof usrname != "undefined" && usrname.length > 0) {
    queryName = usrname;
  } else {
    let hstname = window.location.hostname;
    if (hstname.indexOf(suffixGithubIo) > -1) {
      queryName = hstname.split(suffixGithubIo)[0];
    } else {
      let pthname = window.location.pathname;
      if (hstname.indexOf("github.com") > -1 && pthname.length > 1) {
        queryName = pthname.substring(1).split("/")[0];
      } else {
        let queries = getQueries();
        if (typeof queries.name != "undefined") {
          queryName = queries.name;
        }
      }
    }
  }
  return queryName;
}

export default {
  components: {
    Logo
  },

  async asyncData({ store }) {
    const username = getQueryName();
    console.log("username", username);

    store.commit("repos/setUserName", username);
    console.log("repos/page", store.getters["repos/page"]);
    console.log("repos/username", store.getters["repos/username"]);
    console.log("repos/repos", store.getters["repos/repos"]);

    if (store.getters["repos/repos"].length) {
      return;
    }

    await store.dispatch("repos/fetchRepos");
  },

  computed: {
    repos() {
      console.log("this.$store", this.$store);
      return this.$store.getters["repos/repos"];
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.avatar-img {
  height: 24px;
}
</style>
<!-- Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved. -->