<template>
  <div>
    <!--<div class="container">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>!-->
    <div class="row mt-5">
      <div class="col-md-4"></div>
      <div class="col-md-4">
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
              >{{country.cases.active}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      topFive: []
    };
  },
  methods: {
    ...mapActions("general", ["getGenericData"])
  },
  computed: {
    ...mapGetters("general", ["getActiveTopFiveRegion"])
  },
  async mounted() {
    await setInterval(async () => {
      await this.getGenericData();
      this.topFive = this.getActiveTopFiveRegion;
    }, 10000);
  }
};
</script>