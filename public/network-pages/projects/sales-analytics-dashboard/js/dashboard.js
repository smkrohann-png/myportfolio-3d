let salesData = [];
let filteredData = [];

document.addEventListener("DOMContentLoaded", async () => {

    await loadData();

    setupButtons();

});

async function loadData() {

    try {

        const response = await fetch("./data/sales-data.json");

        salesData = await response.json();

        filteredData = [...salesData];

        initializeFilters();

        updateDashboard();

    }
    catch (error) {

        console.error(
            "Error Loading Data:",
            error
        );

    }

}

function updateDashboard() {

    updateKPIs();

    if (typeof destroyCharts === "function") {

        destroyCharts();

    }

    if (typeof initializeCharts === "function") {

        initializeCharts();

    }

    renderTables();

    renderRecentOrders();
}

function updateKPIs() {

    const totalRevenue =
        filteredData.reduce(
            (sum, item) =>
                sum + item.sales,
            0
        );

    const totalProfit =
        filteredData.reduce(
            (sum, item) =>
                sum + item.profit,
            0
        );

    const totalOrders =
        filteredData.length;

    const profitMargin =
        totalRevenue > 0
            ? (
                totalProfit /
                totalRevenue
            ) * 100
            : 0;

    document.getElementById(
        "totalRevenue"
    ).textContent =
        formatCurrency(
            totalRevenue
        );

    document.getElementById(
        "totalProfit"
    ).textContent =
        formatCurrency(
            totalProfit
        );

    document.getElementById(
        "totalOrders"
    ).textContent =
        totalOrders.toLocaleString();

    document.getElementById(
        "profitMargin"
    ).textContent =
        profitMargin.toFixed(1) + "%";

}
function formatCurrency(value) {

    return "₹" +
        value.toLocaleString(
            "en-IN"
        );

}

/* -------------------------
   TOP PRODUCTS
------------------------- */

function renderTopProducts() {

    const products = {};

    filteredData.forEach(item => {

        products[item.product] =
            (products[item.product] || 0)
            + item.sales;

    });

    const sortedProducts =
        Object.entries(products)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(0, 5);

    const table =
        document.getElementById(
            "topProductsTable"
        );

    table.innerHTML = "";

    sortedProducts.forEach(product => {

        table.innerHTML += `
            <tr>
                <td>${product[0]}</td>
                <td>${formatCurrency(product[1])}</td>
            </tr>
        `;

    });

}

/* -------------------------
   TOP CUSTOMERS
------------------------- */

function renderTopCustomers() {

    const customers = {};

    filteredData.forEach(item => {

        customers[item.customer] =
            (customers[item.customer] || 0)
            + item.sales;

    });

    const sortedCustomers =
        Object.entries(customers)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(0, 5);

    const table =
        document.getElementById(
            "topCustomersTable"
        );

    table.innerHTML = "";

    sortedCustomers.forEach(customer => {

        table.innerHTML += `
            <tr>
                <td>${customer[0]}</td>
                <td>${formatCurrency(customer[1])}</td>
            </tr>
        `;

    });

}

function renderTables() {

    renderTopProducts();

    renderTopCustomers();

}
 /* -------------------------
   RECENT ORDERS
------------------------- */

function renderRecentOrders() {

    const table =
        document.getElementById(
            "recentOrdersTable"
        );

    if (!table) return;

    table.innerHTML = "";

    const latestOrders =
        [...filteredData]
        .sort(
            (a, b) =>
                new Date(b.orderDate)
                -
                new Date(a.orderDate)
        )
        .slice(0, 10);

    latestOrders.forEach(order => {

        table.innerHTML += `

            <tr>

                <td>
                    ${order.orderDate}
                </td>

                <td>
                    ${order.customer}
                </td>

                <td>
                    ${order.region}
                </td>

                <td>
                    ${order.state}
                </td>

                <td>
                    ${order.category}
                </td>

                <td>
                    ${order.product}
                </td>

                <td>
                    ${formatCurrency(
                        order.sales
                    )}
                </td>

                <td>
                    ${formatCurrency(
                        order.profit
                    )}
                </td>

            </tr>

        `;

    });

}

/* -------------------------
   EXPORT CSV
------------------------- */

function exportCSV() {

    if (!filteredData.length)
        return;

    const headers =
        Object.keys(
            filteredData[0]
        );

    const csvRows = [];

    csvRows.push(
        headers.join(",")
    );

    filteredData.forEach(row => {

        csvRows.push(

            headers
                .map(
                    field =>
                        row[field]
                )
                .join(",")

        );

    });

    const csv =
        csvRows.join("\n");

    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
    "india-sales-report.csv";

    document.body.appendChild(
        a
    );

    a.click();

    document.body.removeChild(
        a
    );

}

/* -------------------------
   BUTTON EVENTS
------------------------- */

function setupButtons() {

    const exportBtn =
        document.getElementById(
            "exportBtn"
        );

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            exportCSV
        );

    }

    const refreshBtn =
    document.getElementById(
        "refreshBtn"
    );

    if (refreshBtn) {
refreshBtn.addEventListener(
    "click",
    () => {

        document.getElementById(
            "regionFilter"
        ).value = "all";

        document.getElementById(
            "stateFilter"
        ).value = "all";

        document.getElementById(
            "categoryFilter"
        ).value = "all";

        document.getElementById(
            "yearFilter"
        ).value = "all";

        filteredData =
            [...salesData];

        updateDashboard();

    }
);

    }

}