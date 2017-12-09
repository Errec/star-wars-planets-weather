<template lang="pug">
  div#app
    div.load(:class="{'load--hide': hideLoad}")
      h1 LOADING
    div.container
      carousel(:planetData="planetData" @newChartData="updateData")
      chart-box.container__chart(:chartData="weatherData")
      planet-table(:planetData="planetData")
</template>

<script>
  import ChartBox from './components/ChartBox'
  import Carousel from './components/Carousel'
  import PlanetTable from './components/PlanetTable'

  export default {
    data () {
      return {
        hideLoad: false,
        planetData: {},
        weatherData: {}
      }
    },
    beforeCreate () {
      this.$helpers.getSWData(this, 'planets/1').then((planetData) => {
        const planetCoords = this.$helpers.getPlanetCoords(planetData.climate)
        this.planetData = planetData
        this.$helpers.getWeatherData(this, planetCoords).then((weatherData) => {
          this.weatherData = this.$helpers.processWeatherData(weatherData)
          this.hideLoad = true
        })
      })
    },
    methods: {
      updateData (weatherData, planetData) {
        this.weatherData = this.$helpers.processWeatherData(weatherData)
        this.planetData = planetData
      }
    },
    components: {
      ChartBox,
      Carousel,
      PlanetTable
    }
  }
</script>

<style lang="sass">
  @import 'styles/base/normalize.scss'
  @import 'styles/base/reset.scss'

  @import 'styles/modules/general.sass'

  #app
    width: 100%
    height: 100%
    position: relative
  .load
    width: 100%
    height: 100%
    background-color: #f5f5f5
    position: fixed
    z-index: 200
  .load--hide
    opacity: 0
    pointer-events: none
    transition: opacity 0.7s ease-in-out
  .container
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    margin: auto auto
    background:
      image: url(./assets/bg-dark-side.jpg)
      size: auto 140%
      repeat: no-repeat
      position: center 10%
  .container__chart
    position: absolute
    right: 4vw
    top: 5vh
    width: 40vw
    height: 50vh

  // @import 'styles/media/maxW720px.sass'
  @media screen and (min-width: 721px) and (max-width: 900px)
    .container
      padding: 0 4%
      position: relative
      overflow-Y: scroll
      // display: flex
      // flex-direction: column
    .container__chart
      position: relative
      left: 0
      right: 0
      margin: 0 auto 42px auto
      width: 100%
</style>
