<template lang="pug">
  div.planet
    div.planet-container
      div.planet__outline
        div.planet__surface(:style="{ 'background-image': 'url(../static/planets/' + image + ')' }")
        div.planet__atmosphere
      div.planet__overlay
</template>
<script>
  export default {
    props: ['planetName'],
    data () {
      return {
        image: `${this.planetName}.png`
      }
    }
  }
</script>
<style lang="sass">
  $planet: 300px
  // $planet: calc(6vw + 6vh + 6vmin);
  .planet
    pointer-events: none
    // transform: scale(1.6)
    width: 100%
    height: $planet
    position: relative

  .planet-container
    position: absolute
    margin: 0 auto
    width: $planet
    height: $planet
    border-radius: 50%
    overflow: hidden
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto auto
    transform: translate3d(-70%, 20%, 0)

    .planet__overlay
      width: $planet
      height: $planet
      position: absolute
      box-shadow: inset -10px -10px 40px #251303, inset 10px 10px 30px -10px rgba(255, 204, 159, 0.6)
      border-radius: 50%

    .planet__surface
      animation: translateBG 40s infinite linear
      background:
        image: url(../assets/bg2.png)
        repeat: repeat-x
      width: $planet
      height: $planet
      position: absolute
      border-radius: 50%

    .planet__atmosphere
      background:
        image: url(http://artem.anmedio.ru/dev/planet/clouds.png)
        repeat: repeat-x
      width: $planet
      height: $planet
      position: absolute
      border-radius: 50%
      animation: translateBG 30s infinite linear
      opacity: 0.3

    .planet__outline
      width: $planet
      height: $planet
      position: absolute
      border-radius: 50%

  @keyframes translateBG
    0%
      background-position-x: 0
    100%
      background-position-x: -600px

  @keyframes rotatePlanet
    0%
      transform: rotateZ(0)
    100%
      transform: rotateZ(-360deg)

  @media screen and (min-width: 721px) and (max-width: 900px)
    .planet-container
      transform: translate3d(0, 20%, 0)
  @media screen and (max-width: 720px)
    .planet
      transform: scale(0.7)
    .planet-container
      transform: translate3d(0, 20%, 0)
</style>
