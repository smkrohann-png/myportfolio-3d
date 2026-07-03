function initializeFilters() {

    populateFilter(
        "categoryFilter",
        [
            ...new Set(
                inventoryData.map(
                    item =>
                    item.category
                )
            )
        ]
    );

    populateFilter(
        "supplierFilter",
        [
            ...new Set(
                inventoryData.map(
                    item =>
                    item.supplier
                )
            )
        ]
    );

    populateFilter(
        "statusFilter",
        [
            ...new Set(
                inventoryData.map(
                    item =>
                    item.status
                )
            )
        ]
    );

    attachFilterEvents();

}

function populateFilter(
    id,
    values
) {

    const select =
        document.getElementById(
            id
        );

    if (!select) return;

    values.sort();

    values.forEach(value => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            value;

        option.textContent =
            value;

        select.appendChild(
            option
        );

    });

}

function attachFilterEvents() {

    document
        .getElementById(
            "categoryFilter"
        )
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById(
            "supplierFilter"
        )
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById(
            "statusFilter"
        )
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById(
            "searchInput"
        )
        .addEventListener(
            "input",
            applyFilters
        );

}

function applyFilters() {

    const category =
        document.getElementById(
            "categoryFilter"
        ).value;

    const supplier =
        document.getElementById(
            "supplierFilter"
        ).value;

    const status =
        document.getElementById(
            "statusFilter"
        ).value;

    const search =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();

    filteredData =
        inventoryData.filter(
            item => {

                const categoryMatch =
                    category === "all" ||
                    item.category === category;

                const supplierMatch =
                    supplier === "all" ||
                    item.supplier === supplier;

                const statusMatch =
                    status === "all" ||
                    item.status === status;

                const searchMatch =

                    item.product
                    .toLowerCase()
                    .includes(
                        search
                    )

                    ||

                    item.sku
                    .toLowerCase()
                    .includes(
                        search
                    );

                return (

                    categoryMatch
                    &&

                    supplierMatch
                    &&

                    statusMatch
                    &&

                    searchMatch

                );

            }
        );

    updateDashboard();

}