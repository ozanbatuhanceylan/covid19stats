import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/country-details/:countryId',
            component: CountryDetails,
            props: true
        }
    ]
})