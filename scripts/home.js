const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Body Weight (Kg)',
      data: [68.4, 68.2, 67.8, 67.6, 67.6, 67.4],
      borderWidth: 2,
      borderColor: '#10b981',
      backgroundColor: '#ecfdf5',
      radius: 4,
      lineTension: 0.4
    }]
  },
  options: {
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 14,
                  family: "'Poppins', san-serif"
              }
          }
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1
        },
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
});