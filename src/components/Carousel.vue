<template lang="pug">
  div.carousel
    .carousel__planet-title-wrap(:class="{'carousel__planet-title-wrap--loading': loadingPlanet}")
      h1.carousel__planet-title {{planetData.name}}
    flickity(ref="flickity" :options="flickityOptions")
      planet.carousel__cell(:planetName="planetData.name")
      planet.carousel__cell(:planetName="planetData.name")
      planet.carousel__cell(:planetName="planetData.name")
    button.carousel__btn-next(:class="{'carousel__btn--disable': currentPlanet < 2}" @click="next()")
    button.carousel__btn-prev(:class="{'carousel__btn--disable': currentPlanet > MAX_PLANETS}" @click="previous()")
</template>

<script>
  import _ from 'lodash'
  import Flickity from 'vue-flickity'
  import Planet from './Planet'

  export default {
    props: ['planetData'],
    data () {
      return {
        // planetNameNext: '',
        // planetNamePrev: '',
        planetNameNow: 'Tatooine',
        MAX_PLANETS: 60, // Got it from SWAPI
        currentPlanet: 1,
        loadingPlanet: false,
        flickityOptions: {
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true,
          draggable: false
        }
      }
    },
    components: {
      Planet,
      Flickity
    },
    methods: {
      // REFACTORATE: things are getting hotter in Tatooine! make this 2 big guys(next() and previous() methods) into one big guy
      previous: _.throttle(
        function() {
          this.loadingPlanet = true // Add loading gif
          if (this.currentPlanet > this.MAX_PLANETS - 1) { // Stop extra calls
            return
          } else {
            this.$helpers.getSWData(this, `planets/${this.currentPlanet + 1}`).then((planetData) => {
              const planetCoords = this.$helpers.getPlanetCoords(planetData.climate)
              this.$helpers.getWeatherData(this, planetCoords).then((weatherData) => {
                this.currentPlanet += 1 // Only increment after the response to keep the arrow hidden at the edge cases planet < 1 and planet > MAX_PLANETS - 1
                this.$refs.flickity.previous()
                setTimeout(() => {
                  this.loadingPlanet = false // Remove loading gif
                  this.planetData.name = planetData.name
                  this.$emit('newChartData', weatherData, planetData)
                }, 200) // Wait planets roll out before start showing the new name
              })
            })
          }
        }, 2000),
      next: _.throttle(
        function() {
          this.loadingPlanet = true // Add loading gif
          if (this.currentPlanet < 2) { // Stop extra calls
            return
          } else {
            this.$helpers.getSWData(this, `planets/${this.currentPlanet - 1}`).then((planetData) => {
              const planetCoords = this.$helpers.getPlanetCoords(planetData.climate)
              this.$helpers.getWeatherData(this, planetCoords).then((weatherData) => {
                this.currentPlanet -= 1
                this.$refs.flickity.next()
                setTimeout(() => {
                  this.loadingPlanet = false
                  this.planetData.name = planetData.name
                  this.$emit('newChartData', weatherData, planetData)
                }, 200)
              })
            })
          }
        }, 2000)
    }
  }
</script>

<style lang="sass">
  .carousel
    position: relative
    *:focus
      border: none
      outline: none
  .carousel__planet-title-wrap
    z-index: 50
    display: inline-block;
    position: absolute;
    width: 300px;
    height: 300px
    left: 0;
    text-align: -webkit-center;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto auto;
    transform: translate3d(-70%, 20%, 0);
    transition: all 0.3s ease-in-out
    border-radius: 50%
    background:
      size: 1%
      repeat: no-repeat
      position: center
  .carousel__planet-title-wrap--loading
    background:
      size: 30%
      color: rgba(black, 0.3)
      image: url(../assets/loading.gif)
  .carousel__planet-title
    font-family: 'Raleway', sans-serif;
    position: relative
    top: 100%
    color: white
    font-size: 4.2rem
    font-weight: 300
    text-shadow: -2px 1px grey
  .carousel__btn-next, .carousel__btn-prev
    cursor: pointer
    position: absolute
    z-index: 100
    width: 65px
    height: 65px
    opacity: 0.7
    transition: opacity 0.2s ease-in-out
    &:hover
      opacity: 1
  .carousel__btn-next
    transform: translate3d(-620%, 85%, 0)
    left: 0
    right: 0
    bottom: 0
    top: 0
    margin: auto auto
    border: none
    background:
      color: transparent
      image: url(../assets/arrow.svg)
      size: contain
      repeat: no-repeat
  .carousel__btn-prev
    background-color: #2398FF
    transform: translate3d(-25%, 85%, 0) rotate(180deg)
    left: 0
    right: 0
    bottom: 0
    top: 0
    margin: auto auto
    border: none
    background:
      color: transparent
      image: url(../assets/arrow.svg)
      size: contain
      repeat: no-repeat
  .carousel__btn--disable
    opacity: 0
    pointer-events: none
    &:hover
      opacity: 0
  @media screen and (min-width: 721px) and (max-width: 900px)
    .carousel
      position: relative
      width: 100%
      margin-bottom: 140px
    .carousel__planet-title-wrap
      transform: translate3d(0, 20%, 0);
    .carousel__btn-next
      transform: translate3d(-320%, 85%, 0)
    .carousel__btn-prev
      transform: translate3d(325%, 85%, 0) rotate(180deg)
  @media screen and (max-width: 720px)
    .carousel__planet-title-wrap--loading
      background:
        size: 20%
        position: center 66%
    .carousel
      position: relative
      width: 100%
      margin-bottom: 48px
    .carousel__planet-title
      font-size: 3rem
      text-shadow: none
      font-weight: 400
    .carousel__planet-title-wrap
      transform: translate3d(0, 0, 0);
    .carousel__btn-next, .carousel__btn-prev
      width: 42px
      height: 42px
    .carousel__btn-next
      transform: translate3d(-320%, 85%, 0)
    .carousel__btn-prev
      transform: translate3d(325%, 85%, 0) rotate(180deg)
</style>
