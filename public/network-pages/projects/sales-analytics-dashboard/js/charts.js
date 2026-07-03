let revenueChart;
let regionChart;
let categoryChart;
let profitChart;

/* =========================
   DESTROY ALL CHARTS
========================= */

function destroyCharts() {

    if (revenueChart)
        revenueChart.destroy();

    if (regionChart)
        regionChart.destroy();

    if (categoryChart)
        categoryChart.destroy();

    if (profitChart)
        profitChart.destroy();

}

/* =========================
   INITIALIZE
========================= */

function initializeCharts() {

    renderRevenueTrend();

    renderRegionChart();

    renderCategoryChart();

    renderProfitChart();

}

/* =========================
   COMMON OPTIONS
========================= */

function getChartOptions() {

    return {

        responsive: true,

        maintainAspectRatio: false,

        animation: {
            duration: 1200
        },

        plugins: {

            legend: {
                labels: {
                    color: "#d1d5db"
                }
            },

            tooltip: {

                backgroundColor: "#111827",

                titleColor: "#ffffff",

                bodyColor: "#ffffff",

                borderColor: "#7c5cff",

                borderWidth: 1

            }

        },

        scales: {

            x: {

                ticks: {
                    color: "#9ca3af"
                },

                grid: {
                    color: "rgba(255,255,255,.05)"
                }

            },

            y: {

                ticks: {
                    color: "#9ca3af"
                },

                grid: {
                    color: "rgba(255,255,255,.05)"
                }

            }

        }

    };

}

/* =========================
   REVENUE TREND
========================= */

function renderRevenueTrend() {

    const monthlySales = {};

    filteredData.forEach(item => {

        const month =
            new Date(item.orderDate)
                .toLocaleString(
                    "default",
                    { month: "short" }
                );

        monthlySales[month] =
            (monthlySales[month] || 0)
            + item.sales;

    });

    const ctx =
        document.getElementById(
            "revenueTrendChart"
        );

    revenueChart = new Chart(ctx, {

        type: "line",

        data: {

            labels:
                Object.keys(monthlySales),

            datasets: [

                {

                    label: "Revenue",

                    data:
                        Object.values(
                            monthlySales
                        ),

                    borderColor:
                        "#7c5cff",

                    backgroundColor:
                        "rgba(124,92,255,.18)",

                    fill: true,

                    tension: 0.45,

                    borderWidth: 3,

                    pointRadius: 4,

                    pointHoverRadius: 7

                }

            ]

        },

        options: {

            ...getChartOptions(),

            plugins: {

                ...getChartOptions()
                    .plugins,

                legend: {
                    display: false
                }

            }

        }

    });

}

/* =========================
   REGION SALES
========================= */

function renderRegionChart() {

    const regionSales = {};

    filteredData.forEach(item => {

        regionSales[item.region] =
            (regionSales[item.region] || 0)
            + item.sales;

    });

    const ctx =
        document.getElementById(
            "regionChart"
        );

    regionChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels:
                Object.keys(
                    regionSales
                ),

            datasets: [

                {

                    label: "Revenue",

                    data:
                        Object.values(
                            regionSales
                        ),

                    backgroundColor:
                        "#7c5cff",

                    borderRadius: 10

                }

            ]

        },

        options: {

            ...getChartOptions(),

            plugins: {

                ...getChartOptions()
                    .plugins,

                legend: {
                    display: false
                }

            }

        }

    });

}

/* =========================
   CATEGORY CHART
========================= */

function renderCategoryChart() {

    const categorySales = {};

    filteredData.forEach(item => {

        categorySales[item.category] =
            (categorySales[item.category] || 0)
            + item.sales;

    });

    const ctx =
        document.getElementById(
            "categoryChart"
        );

    categoryChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels:
                Object.keys(
                    categorySales
                ),

            datasets: [

                {

                    data:
                        Object.values(
                            categorySales
                        ),

                    backgroundColor: [

                        "#7c5cff",
                        "#22c55e",
                        "#f59e0b",
                        "#ef4444",
                        "#06b6d4"

                    ],

                    borderWidth: 2,

                    borderColor:
                        "#0a0a0a"

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "55%",

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        color:
                            "#d1d5db"

                    }

                }

            }

        }

    });

}

/* =========================
   PROFIT CHART
========================= */

function renderProfitChart() {

    const sales =
        filteredData.reduce(

            (sum, item) =>
                sum + item.sales,

            0

        );

    const profit =
        filteredData.reduce(

            (sum, item) =>
                sum + item.profit,

            0

        );

    const ctx =
        document.getElementById(
            "profitChart"
        );

    profitChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Sales",
                "Profit"

            ],

            datasets: [

                {

                    data: [

                        sales,
                        profit

                    ],

                    backgroundColor: [

                        "#7c5cff",
                        "#22c55e"

                    ],

                    borderRadius: 10

                }

            ]

        },

        options: {

            ...getChartOptions(),

            plugins: {

                ...getChartOptions()
                    .plugins,

                legend: {
                    display: false
                }

            }

        }

    });

}