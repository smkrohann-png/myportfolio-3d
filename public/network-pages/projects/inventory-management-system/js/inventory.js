let inventoryData = [];
let filteredData = [];

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadInventoryData();

        setupButtons();

    }
);

async function loadInventoryData() {

    try {

        const response =
            await fetch(
                "./data/inventory-data.json"
            );

        inventoryData =
            await response.json();

        filteredData =
            [...inventoryData];

        initializeFilters();

        updateDashboard();

    }

    catch (error) {

        console.error(
            "Inventory Load Error:",
            error
        );

    }

}

function updateDashboard() {

    updateKPIs();

    renderInventoryTable();

    renderRecentActivity();

    if (
        typeof initializeCharts ===
        "function"
    ) {

        destroyCharts();

        initializeCharts();

    }

}

/* =========================
KPI SECTION
========================= */

function updateKPIs() {

    const totalProducts =
        filteredData.length;

    const totalStock =
        filteredData.reduce(

            (sum, item) =>
                sum + item.stock,

            0

        );

    const lowStock =
        filteredData.filter(

            item =>
                item.status ===
                "Low Stock"

        ).length;

    const inventoryValue =
        filteredData.reduce(

            (sum, item) =>

                sum +
                (
                    item.stock *
                    item.price
                ),

            0

        );

    document.getElementById(
        "totalProducts"
    ).textContent =
        totalProducts;

    document.getElementById(
        "totalStock"
    ).textContent =
        totalStock.toLocaleString();

    document.getElementById(
        "lowStock"
    ).textContent =
        lowStock;

    document.getElementById(
        "inventoryValue"
    ).textContent =
        formatCurrency(
            inventoryValue
        );

}

function formatCurrency(
    value
) {

    return (
        "₹" +
        value.toLocaleString(
            "en-IN"
        )
    );

}

/* =========================
INVENTORY TABLE
========================= */

function renderInventoryTable() {

    const table =
        document.getElementById(
            "inventoryTable"
        );

    if (!table) return;

    table.innerHTML = "";

    filteredData.forEach(item => {

        let statusClass =
            "status-in";

        if (
            item.status ===
            "Low Stock"
        ) {

            statusClass =
                "status-low";

        }

        if (
            item.status ===
            "Out Of Stock"
        ) {

            statusClass =
                "status-out";

        }

        table.innerHTML += `

        <tr>

            <td>
                ${item.id}
            </td>

            <td>
                ${item.product}
            </td>

            <td>
                ${item.sku}
            </td>

            <td>
                ${item.category}
            </td>

            <td>
                ${item.stock}
            </td>

            <td>
                ${formatCurrency(
                    item.price
                )}
            </td>

            <td>
                ${item.supplier}
            </td>

            <td>

                <span
                    class="
                    status-badge
                    ${statusClass}
                    "
                >

                    ${item.status}

                </span>

            </td>

        </tr>

        `;

    });

}

/* =========================
RECENT ACTIVITY
========================= */

function renderRecentActivity() {

    const table =
        document.getElementById(
            "recentActivityTable"
        );

    if (!table) return;

    table.innerHTML = "";

    const latest =
        filteredData
        .slice(0, 10);

    latest.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>
                ${item.product}
            </td>

            <td>
                ${item.category}
            </td>

            <td>
                ${item.supplier}
            </td>

            <td>
                ${item.stock}
            </td>

            <td>
                ${item.status}
            </td>

        </tr>

        `;

    });

}
/* =========================
EXPORT CSV
========================= */

function exportCSV() {

    if (
        !filteredData.length
    ) return;

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
        "inventory-report.csv";

    document.body
        .appendChild(a);

    a.click();

    document.body
        .removeChild(a);

}

/* =========================
BUTTONS
========================= */

function setupButtons() {

    const exportBtn =
        document.getElementById(
            "exportBtn"
        );

    if (exportBtn) {

        exportBtn
        .addEventListener(
            "click",
            exportCSV
        );

    }

    const refreshBtn =
        document.getElementById(
            "refreshBtn"
        );

    if (refreshBtn) {

        refreshBtn
        .addEventListener(
            "click",
            () => {

                const category =
                    document.getElementById(
                        "categoryFilter"
                    );

                const supplier =
                    document.getElementById(
                        "supplierFilter"
                    );

                const status =
                    document.getElementById(
                        "statusFilter"
                    );

                const search =
                    document.getElementById(
                        "searchInput"
                    );

                if (category)
                    category.value =
                        "all";

                if (supplier)
                    supplier.value =
                        "all";

                if (status)
                    status.value =
                        "all";

                if (search)
                    search.value =
                        "";

                filteredData =
                    [
                        ...inventoryData
                    ];

                updateDashboard();

            }
        );

    }

}