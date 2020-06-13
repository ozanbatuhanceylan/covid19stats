import axios from 'axios'

export default {
    namespaced: true,
    state: {
        regions: [],
        countries: [],
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


            let output = excludeGenericStats.slice(0, 10);
            return output;
        },
        getMapData(state) {
            let result = [];
            state.countries.forEach(country => {
                let isPushed = false;
                state.regions.find(item => {
                    if (country.name === item.country) {
                        result.push([country.alpha2Code.toLowerCase(), item.cases.active]);
                        isPushed = true;
                    } else if (item.country === 'USA') {
                        result.push(['us', item.cases.active]);
                        isPushed = true;
                    }
                })
                if (!isPushed) {
                    result.push([country.alpha2Code.toLowerCase(), 0]);
                }
            })
            return result;
        },
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
        },
        getCountries({ commit }) {
            return axios
                .get('https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all', {
                    "headers": {
                        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
                        "x-rapidapi-key": "ad55aff761msha31dd47ef2b0829p1e8311jsnac302b57d671"
                    }
                }).then(response => {
                    commit('SET_COUNTRIES', response.data)
                })
        }
    },
    mutations: {
        SET_REGIONS(state, data) {
            state.regions = data;
        },
        SET_COUNTRIES(state, data) {
            state.countries = data
        }
    }
}