<template lang="pug">
  div.planet-table
    h2 Planet Information
    table
      tbody
        tr
          td Rotation Period
          td {{planetData.rotation_period}}
        tr
          td Orbital Period
          td {{planetData.orbital_period}}
        tr
          td Diameter
          td {{planetData.diameter}}
        tr
          td Climate
          td {{planetData.climate}}
        tr
          td Gravity
          td {{planetData.gravity}}
        tr
          td Terrain
          td {{planetData.terrain}}
        tr
          td Surface Water
          td {{planetData.surface_water}}
        tr
          td Population
          td {{planetData.population}}
</template>
<script>
  export default {
    props: ['planetData']
  }
</script>
<style lang="sass">
  .planet-table
    color: white
    position: absolute
    z-index: 100
    display: inline-block
    right: 4vw
    top: 60%
    width: 36vw
    background:
      color: transparent
    h2
      margin-bottom: 6px
      padding-left: 4px
    table
      width: 100%
    thead
      width: 100%
      text-align: left
    tbody
      tr
        &:nth-child(2n + 1)
          background-color: rgba(#FC2525, 0.1)
    td
      padding: 2px 0
      padding-left: 4px
      font-weight: light
  @media screen and (min-width: 721px) and (max-width: 900px)
    .planet-table
      position: relative
      margin: 0 auto
      left: 0
      right: 0
      width: 100%
  @media screen and (max-width: 720px)
    .planet-table
      position: relative
      margin: 0 auto
      left: 0
      right: 0
      width: 100%
</style>
