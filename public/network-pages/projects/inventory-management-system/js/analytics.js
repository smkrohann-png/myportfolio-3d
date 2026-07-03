let categoryChart;
let statusChart;
let valueChart;
let topProductsChart;

/* =========================
DESTROY CHARTS
========================= */

function destroyCharts() {

    if (categoryChart)
        categoryChart.destroy();

    if (statusChart)
        statusChart.destroy();

    if (valueChart)
        valueChart.destroy();

    if (topProductsChart)
        topProductsChart.destroy();

}

/* =========================
INITIALIZE
========================= */

function initializeCharts() {

    renderCategoryChart();

    renderStatusChart();

    renderValueChart();

    renderTopProductsChart();

}

/* =========================
COMMON OPTIONS
========================= */

function getChartOptions() {

    return {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                labels: {

                    color: "#d1d5db"

                }

            },

            tooltip: {

                backgroundColor:
                    "#111827",

                titleColor:
                    "#ffffff",

                bodyColor:
                    "#ffffff"

            }

        }

    };

}

/* =========================
CATEGORY CHART
========================= */

function renderCategoryChart() {

    const categoryData = {};

    filteredData.forEach(item => {

        categoryData[item.category] =

            (categoryData[item.category] || 0)

            +

            item.stock;

    });

    const ctx =
        document.getElementById(
            "categoryChart"
        );

    categoryChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels:
                Object.keys(
                    categoryData
                ),

            datasets: [

                {

                    label:
                        "Stock Units",

                    data:
                        Object.values(
                            categoryData
                        ),

                    backgroundColor:
                        "#7c5cff",

                    borderRadius: 10

                }

            ]

        },

        options: {

            ...getChartOptions(),

            scales: {

                x: {

                    ticks: {

                        color:
                            "#9ca3af"

                    }

                },

                y: {

                    ticks: {

                        color:
                            "#9ca3af"

                    }

                }

            }

        }

    });

}

/* =========================
STATUS CHART
========================= */

function renderStatusChart() {

    const statusData = {

        "In Stock": 0,

        "Low Stock": 0,

        "Out Of Stock": 0

    };

    filteredData.forEach(item => {

        statusData[item.status]++;

    });

    const ctx =
        document.getElementById(
            "statusChart"
        );

    statusChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels:
                Object.keys(
                    statusData
                ),

            datasets: [

                {

                    data:
                        Object.values(
                            statusData
                        ),

                    backgroundColor: [

                        "#22c55e",

                        "#f59e0b",

                        "#ef4444"

                    ]

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "60%"

        }

    });

}

/* =========================
VALUE CHART
========================= */

function renderValueChart() {

    const valueData = {};

    filteredData.forEach(item => {

        valueData[item.category] =

            (valueData[item.category] || 0)

            +

            (item.stock * item.price);

    });

    const ctx =
        document.getElementById(
            "valueChart"
        );

    valueChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels:
                Object.keys(
                    valueData
                ),

            datasets: [

                {

                    data:
                        Object.values(
                            valueData
                        ),

                    backgroundColor: [

                        "#7c5cff",

                        "#3b82f6",

                        "#22c55e",

                        "#f59e0b",

                        "#ef4444"

                    ]

                }

            ]

        },

        options: getChartOptions()

    });

}

/* =========================
TOP PRODUCTS
========================= */

function renderTopProductsChart() {

    const products = [];

    filteredData.forEach(item => {

        products.push({

            name:
                item.product,

            value:
                item.stock

        });

    });

    products.sort(
        (a, b) =>
            b.value - a.value
    );

    const top =
        products.slice(0, 5);

    const ctx =
        document.getElementById(
            "topProductsChart"
        );

    topProductsChart =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels:
                    top.map(
                        p => p.name
                    ),

                datasets: [

                    {

                        label:
                            "Stock",

                        data:
                            top.map(
                                p => p.value
                            ),

                        backgroundColor:
                            "#3b82f6",

                        borderRadius: 10

                    }

                ]

            },

            options: {

                ...getChartOptions(),

                indexAxis: "y",

                plugins: {

                    legend: {

                        display: false

                    }

                }

            }

        });

}