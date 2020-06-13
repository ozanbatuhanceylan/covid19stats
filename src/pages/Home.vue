<template>
  <div>
    <div class="row col-md-12">
      <!--<div class="col-md-2">
        <div class="card" v-if="topFive.length > 0">
          <div class="card-body">
            <h5 class="card-title">Top 5 countries have the most active cases</h5>
          </div>

          <ul class="list-group list-group-flush">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="country in topFive"
              :key="country.country"
            >
              {{country.country}}
              <span
                class="badge badge-primary badge-pill"
              >{{country.cases.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">!-->
      <highcharts :constructorType="'mapChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
      <!--</div>
      <div class="col-md-2"></div>!-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Chart } from "highcharts-vue";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";

export default {
  name: "Home",
  data() {
    return {
      topFive: [],
      chartOptions: {
        chart: {
          map: worldMap,
          height: window.innerHeight,
          width: window.innerWidth
        },
        legend: {
          enabled: false
        },
        title: {
          text: "Covid-19 Active Cases"
        },
        mapNavigation: {
          enabled: true
        },

        colorAxis: {
          minColor: "#fceded",
          maxColor: "#ff0000",
          min: 0
        },
        series: [
          {
            name: "Active Cases",
            states: {
              hover: {
                color: "#ff0000"
              }
            },
            dataLabels: {
              enabled: false,
              format: "{point.name}"
            },
            allAreas: true,
            data: this.getMapData
          }
        ]
      }
    };
  },
  components: {
    highcharts: Chart
  },
  methods: {
    ...mapActions("general", ["getGenericData", "getCountries"])
  },
  computed: {
    ...mapGetters("general", ["getActiveTopFiveRegion", "getMapData"])
  },
  async mounted() {
    await setInterval(async () => {
      await this.getGenericData();
      this.topFive = this.getActiveTopFiveRegion;
    }, 10000);
    await this.getGenericData();
    await this.getCountries();
    this.topFive = this.getActiveTopFiveRegion;
    this.chartOptions.series[0].data = this.getMapData;
  }
};
</script>