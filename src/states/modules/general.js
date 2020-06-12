import axios from 'axios'

export default {
    namespaced: true,
    state: {
        regions: [],
    },
    getters: {
        getActiveTopFiveRegion(state) {
            let compare = (a, b) => {
                const optA = a.cases.active;
                const optB = b.cases.active;

                let comparison = 0;
                if (optA > optB) {
                    comparison = -1;
                } else if (optA < optB) {
                    comparison = 1;
                }
                return comparison
            }
            let excludeGenericStats = state.regions.filter(item => item.country !== item.continent);
            excludeGenericStats.sort(compare);


            let output = excludeGenericStats.slice(0, 5);
            output.forEach(item => item.cases.active = item.cases.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
            return output;
        }
    },
    actions: {
        async getGenericData({ commit }) {
            return axios
                .get('https://covid-193.p.rapidapi.com/statistics', {
                    "headers": {
                        "x-rapidapi-host": "covid-193.p.rapidapi.com",
                        "x-rapidapi-key": "ad55aff761msha31dd47ef2b0829p1e8311jsnac302b57d671"
                    }
                }).then(response => {
                    commit('SET_REGIONS', response.data.response)
                })
        }
    },
    mutations: {
        SET_REGIONS(state, data) {
            state.regions = data;
        }
    }
}