export const prepareEVGrowthData = (data) => {
    const counts = {};
    data.forEach((item) => {
      const year = item["Model Year"];
      if (year && !isNaN(year) && year >= 2010) {
        counts[year] = (counts[year] || 0) + 1;
      }
    });
  
    const sortedYears = Object.keys(counts).sort((a, b) => a - b);
  
    return {
      labels: sortedYears,
      datasets: [
        {
          label: "Number of EVs",
          data: sortedYears.map((year) => counts[year]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };
  
  export const prepareEVTypeData = (data) => {
    const typeCounts = data.reduce((acc, item) => {
      const type = item["Electric Vehicle Type"];
      if (type) {
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {});
  
    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          data: Object.values(typeCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FFCD56",
            "#C9CBCF",
          ],
        },
      ],
    };
  };
  