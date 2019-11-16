<template>
    <div>
        <div class="container">
            <div>
                <logo />
                <h1 class="title">Nuxtjs-Repos-index-gh-pages</h1>
                <h2 class="subtitle">My tremendous Nuxt.js project</h2>
                <div class="links">
                    <a
                        href="https://nuxtjs.org/"
                        target="_blank"
                        class="button--green"
                    >Documentation</a>
                    <a
                        href="https://github.com/nuxt/nuxt.js"
                        target="_blank"
                        class="button--grey"
                    >GitHub</a>
                </div>
            </div>
        </div>
        <div class="container-table">
            <table border="1">
                <thead>
                    <tr>
                        <th v-for="(value, key) in columns" @click="sortBy(key)" :key="key">
                            {{ value }}
                            <span
                                class="arrow"
                                :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"
                            ></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(repo, index) in filteredRepos" :key="repo.id">
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
                        <td class="link-gp" :id="'i' + repo.id">
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
                            <a
                                :href="repo.html_url + '/network/members'"
                                target="_blank"
                            >{{repo.forks_count}}</a>
                        </td>
                        <td>
                            <a
                                :href="repo.html_url + '/issues'"
                                target="_blank"
                            >{{repo.open_issues_count}}</a>
                        </td>
                        <td>
                            <a
                                :href="repo.html_url + '/stargazers'"
                                target="_blank"
                            >{{repo.stargazers_count}}</a>
                        </td>
                        <td>
                            <a
                                :href="repo.html_url + '/watchers'"
                                target="_blank"
                            >{{repo.watchers_count}}</a>
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

    const splitkeypattern = "__";
    function getObjValue(obj, sortKey) {
        // console.log("getObjValue", obj, sortKey);
        if (sortKey.indexOf(splitkeypattern) > -1) {
            // console.log("getObjValue", "values");
            // console.log(obj);
            // console.log(sortKey.substring(0, sortKey.indexOf(splitkeypattern)));
            // console.log(obj["license"]);
            // console.log(
            //     obj[sortKey.substring(0, sortKey.indexOf(splitkeypattern))]
            // );
            // console.log(
            //     sortKey.substring(
            //         splitkeypattern.length + sortKey.indexOf(splitkeypattern)
            //     )
            // );
            var child = obj[sortKey.substring(0, sortKey.indexOf(splitkeypattern))];
            if (null === child) {
                return null;
            } else {
                return getObjValue(
                    obj[sortKey.substring(0, sortKey.indexOf(splitkeypattern))],
                    sortKey.substring(
                        splitkeypattern.length + sortKey.indexOf(splitkeypattern)
                    )
                );
            }
        } else {
            return obj[sortKey];
        }
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

        methods: {
            sortBy: function(key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
            }
        },

        computed: {
            filteredRepos() {
                console.log("this.$store", this.$store);
                var data = this.$store.getters["repos/repos"];

                var sortKey = this.sortKey;
                var order = this.sortOrders[sortKey] || 1;
                console.log("computed", "filteredRepos()", "data", data);
                console.log("computed", "filteredRepos()", "sortKey", sortKey);
                console.log("computed", "filteredRepos()", "order", order);

                if (sortKey) {
                    data = data.slice().sort(function(a, b) {
                        //TODO: sortKeyが深い階層の場合
                        var val_a = getObjValue(a, sortKey);
                        var val_b = getObjValue(b, sortKey);

                        if (null === val_a) {
                            return -1 * order;
                        }
                        if (null === val_b) {
                            return 1 * order;
                        }

                        var lower_a = String(val_a).toLowerCase();
                        var lower_b = String(val_b).toLowerCase();

                        // console.log(
                        //     "computed",
                        //     "filteredRepos()",
                        //     "return",
                        //     sortKey,
                        //     lower_a,
                        //     lower_b,
                        //     (lower_a === lower_b ? 0 : lower_a > lower_b ? 1 : -1) *
                        //         order
                        // );
                        return (
                            (lower_a === lower_b ? 0 : lower_a > lower_b ? 1 : -1) *
                            order
                        );
                    });
                }
                return data;
            }
        },

        data: function() {
            var columns = {
                index: "#",
                html_url: "Repository",
                url: "URL",
                has_pages: "Github Pages",
                created_at: "Created",
                updated_at: "Updated",
                language: "Language",
                license__name: "License",
                archived: "Archived",
                disabled: "Disabled",
                fork: "Fork",
                issues: "Issues",
                stargazers: "Stargazers",
                watchers: "Watchers",
                description: "Description"
            };
            var sortOrders = {};
            Object.keys(columns).forEach(function(key) {
                sortOrders[key] = 1;
            });

            return {
                columns: columns,
                repos: this.$store.getters["repos/repos"],
                sortKey: "",
                sortOrders: sortOrders
            };
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

    .avatar-img {
        height: 24px;
    }
</style>
<!-- Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved. -->