import {
  Store
} from "vuex";

const URL_GITHUB_API =
  "https://api.github.com/users/{USERNAME}/repos?per_page=100&page={PAGE}";

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
    const url = URL_GITHUB_API.replace("{USERNAME}", context.getters['username']).replace(
      "{PAGE}",
      context.getters['page']
    );
    console.log('fetchRepos url', url)
    const repoItems = this.$axios
      .$get(url)
      .then(function (response) {
        console.log('addRepos', JSON.stringify(response));
        context.commit('addRepos', response)
        if (response.length > 99) {
          context.commit('incrementPage')
          context.dispatch('fetchRepos')
        } else {
          console.log(context.getters['repos'])
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }
}
