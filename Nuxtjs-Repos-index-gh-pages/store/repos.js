import {
  Store
} from "vuex";
const PATH_GITHUB_API =
  "/users/{USERNAME}/repos?per_page=100&page={PAGE}";
const URL_GITHUB_API =
  "https://api.github.com" + PATH_GITHUB_API;

export const state = () => ({
  page: 1,
  repos: [],
  username: '*GITHUB*',
})

export const getters = {
  page: (state) => state.page,
  repos: (state) => state.repos,
  username: (state) => state.username,
}

export const mutations = {
  addRepos(state, repos) {
    console.log('addRepos state', state)
    console.log('addRepos repos', repos)
    state.repos = state.repos.concat(repos)
  },
  incrementPage(state) {
    console.log('incrementPage state1', state.page)
    state.page++
    console.log('incrementPage state2', state.page)
  },
  setPage(state, page) {
    console.log('setPage state1', state.page)
    state.page = page
    console.log('setPage state2', state.page)
  },
  setUserName(state, username) {
    console.log('setUserName username1', state.username)
    state.username = username
    console.log('setUserName username2', state.username)
  },
}

export const actions = {
  async fetchRepos(context) {
    console.log('fetchRepos')
    const url = PATH_GITHUB_API.replace("{USERNAME}", context.getters['username']).replace(
      "{PAGE}",
      context.getters['page']
    );
    console.log('fetchRepos url', url)
    console.log('fetchRepos url2', '/prxy' + url)
    const repoItems = await this.$axios
      .$get('/prxy' + url)
      .then(function (response) {
        // console.log('addRepos', JSON.stringify(response));
        console.log('addRepos', 'response');
        context.commit('addRepos', response)
        if (response.length > 99) {
          context.commit('incrementPage')
          context.dispatch('fetchRepos')
        } else {
          console.log(context.getters['repos'])

          context.dispatch("fetchThumbnail");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  },

  async fetchThumbnail() {
    console.log("fetchThumbnail()");
    let index = 0;
    document.querySelectorAll(".link-gp").forEach(async target => {
      console.log("fetchThumbnail()", "target", target);
      const a = target.querySelector("a");
      if (a != null) {
        const link = a.getAttribute("href");
        console.log("fetchThumbnail()", "url", link);
        const pagesurl = '/pgs/' + (link.split('github.io/')[1]);
        console.log("fetchThumbnail()", "url2", pagesurl);

        const pageresponse = await this.$axios({
          method: "get",
          url: pagesurl
        });

        // console.log('fetchThumbnail()', JSON.stringify(pageresponse));
        console.log("fetchThumbnail()", "pageresponse", pageresponse);
        console.log("fetchThumbnail()", "target.id", target.id);

        const target_i = document
          .querySelector("#" + target.id);
        if (target_i != null) {
          console.log("fetchThumbnail()", "target_i", target_i);

          const renderAreaId = "render-area" + index;
          console.log("fetchThumbnail()", "renderAreaId", renderAreaId);
          const renderArea =
            '<iframe id="' +
            renderAreaId +
            '" sandbox="allow-scripts allow-same-origin" width="1280" height="1024" scrolling="no" frameborder="no" style="position: absolute;"></iframe>';
          console.log("fetchThumbnail()", "renderArea", renderArea);

          target_i.insertAdjacentHTML("beforeend", renderArea);
          console.log("fetchThumbnail()", "insertAdjacentHTML", target_i);

          const iframe = document.querySelector("#" + renderAreaId);
          console.log("fetchThumbnail()", "iframe", iframe);
          iframe.contentDocument.open();
          console.log("fetchThumbnail()", "open");
          iframe.contentDocument.write(pageresponse.data);
          console.log("fetchThumbnail()", "write");
          iframe.contentDocument.close();
          console.log("fetchThumbnail()", "close");

          iframe.onload = async () => {
            console.log("fetchThumbnail()", "iframe.onload");
            const canvas = await html2canvas(
              iframe.contentDocument.querySelector("body"), {
                logging: false,
                allowTaint: true,
                useCORS: true,
                width: 1280,
                height: 1024
              }
            );
            console.log("fetchThumbnail()", "canvas", canvas);

            canvas.style.width = parseInt(canvas.width / 4, 10) + "px";
            canvas.style.height = parseInt(canvas.height / 4, 10) + "px";
            target.insertBefore(canvas, target.firstChild);
            iframe.remove();
          };
        }
      }

      index++;
    });
  }
}

// Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.
