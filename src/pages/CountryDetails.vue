<template>
  <div>Country Details {{countryId}}</div>
</template>

<script>
export default {
  name: "CountryDetails",
  props: {
    countryId: String
  }
};
</script>