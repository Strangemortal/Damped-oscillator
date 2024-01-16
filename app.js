document.addEventListener('DOMContentLoaded', function () {
  const amplitudeInput = document.getElementById('amplitude');
  const frequencyInput = document.getElementById('frequency');
  const dampingRatioInput = document.getElementById('dampingRatio');
  const ctx = document.getElementById('oscillatorChart').getContext('2d');

  let oscillatorChart;

  function updateChart() {
    const amplitude = parseFloat(amplitudeInput.value);
    const frequency = parseFloat(frequencyInput.value);
    const dampingRatio = parseFloat(dampingRatioInput.value);

    if (oscillatorChart) {
      oscillatorChart.destroy();
    }

    oscillatorChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 100 }, (_, i) => i),
        datasets: [{
          label: 'Damped Oscillator',
          borderColor: 'rgba(21, 18, 20, 1)', 
          backgroundColor: 'rgba(239, 222, 231, 1)', 
          data: Array.from({ length: 100 }, (_, i) => amplitude * Math.exp(-dampingRatio * i / 10) * Math.cos(2 * Math.PI * frequency * i / 10)),
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            grid: {
              color: 'rgba(0, 0, 0, 0.5)', 
            },
            ticks: {
              color: 'rgba(16, 12, 13, 0.85)', 
            }
          },
          y: {
            min: -amplitude,
            max: amplitude,
            grid: {
              color: 'rgba(0, 0, 0, 0.5)', 
            },
            ticks: {
              color: 'rgba(16, 12, 13, 0.85)', 
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgba(16, 12, 13, 0.85)' 
            }
          }
        }
      }
    });
  }

  amplitudeInput.addEventListener('input', updateChart);
  frequencyInput.addEventListener('input', updateChart);
  dampingRatioInput.addEventListener('input', updateChart);

  updateChart();
});
