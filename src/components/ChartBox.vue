<script>
import {Line} from 'vue-chartjs'

export default {
  props: ['chartData'],
  extends: Line,
  data () {
    return {
      gradient: null
    }
  },
  watch: {
    chartData () {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          { // REFACTORATE: remove repetition!
            label: 'Average Temperature',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: this.gradient,
            data: this.chartData
          }]
      })
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0,0.15)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.02)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0.01)')

    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Annual Temperature',
          borderColor: '#FC2525',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white',
          backgroundColor: this.gradient,
          data: this.chartData
        }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
          labels: {
              fontColor: "white",
              fontSize: 14
          },
          onClick: function (e) {
              e.stopPropagation();
          }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: true,
            color: 'rgba(200, 200, 200, 0.2)',
            lineWidth: 1
          }
        }],
        yAxes: [{
          scaleLabel: {
            fontColor: 'white',
            display: true,
            labelString: 'Temperature [ K ]'
          },
          gridLines: {
            display: true,
            color: 'rgba(200, 200, 200, 0.2)',
            lineWidth: 1
          }
        }]
      },
      tooltips: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
      }
    })
  }
}
</script>
