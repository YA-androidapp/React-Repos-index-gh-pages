<template>
    <div class="container">
        <div>
            <logo />
            <h1 class="title">React-Repos-index-gh-pages</h1>
            <h2 class="subtitle">My tremendous Nuxt.js project</h2>
            <div class="links">
                <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    class="button--grey"
                >GitHub</a>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from "~/components/Logo.vue";

    const URL_GITHUB_API =
        "https://api.github.com/users/{USERNAME}/repos?per_page=100&page={PAGE}";
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

    function retrieveGitHubReposInformation(app, userName, paramPage) {
        const url = URL_GITHUB_API.replace("{USERNAME}", userName).replace(
            "{PAGE}",
            paramPage
        );
        console.log("url", url);
        app.$axios
            .$get(url)
            .then(function(response) {
                // self.setState({
                //     repos: self.state.repos.concat(response.data)
                // });
                console.log(response);
                if (response.data.length > 99) {
                    retrieveGitHubReposInformation(app, userName, ++paramPage);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
            .finally(function() {});
    }

    export default {
        components: {
            Logo
        },

        async asyncData({ app }) {
            const userName = getQueryName();
            console.log(userName);
            console.log(retrieveGitHubReposInformation(app, userName, 0));
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
        font-family: "Quicksand", "Source Sans Pro", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            sans-serif;
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
</style>
