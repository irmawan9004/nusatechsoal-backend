function calculateAverageResponseTime(logs) {
    const total = logs.reduce((sum, log) => sum + log.time, 0);
  
    return logs.length > 0 ? total / logs.length : 0;
  }
  

  const responseTimes = [
    { endpoint: '/api/v1/users', time: 120 },
    { endpoint: '/api/v1/products', time: 80 },
    { endpoint: '/api/v1/orders', time: 150 }
  ];
  
  const averageTime = calculateAverageResponseTime(responseTimes);
  console.log(averageTime); 
  