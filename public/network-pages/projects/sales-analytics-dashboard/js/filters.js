function initializeFilters() {

    populateFilter(
        "regionFilter",
        [...new Set(salesData.map(item => item.region))]
    );

    populateFilter(
        "stateFilter",
        [...new Set(salesData.map(item => item.state))]
    );

    populateFilter(
        "categoryFilter",
        [...new Set(salesData.map(item => item.category))]
    );

    populateFilter(
        "yearFilter",
        [...new Set(
            salesData.map(item =>
                new Date(item.orderDate).getFullYear()
            )
        )]
    );

    attachFilterEvents();
}

function populateFilter(id, values) {

    const select =
        document.getElementById(id);

    values.sort();

    values.forEach(value => {

        const option =
            document.createElement(
                "option"
            );

        option.value = value;

        option.textContent = value;

        select.appendChild(option);

    });

}

function attachFilterEvents() {

    document
        .getElementById("regionFilter")
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById("stateFilter")
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById("categoryFilter")
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById("yearFilter")
        .addEventListener(
            "change",
            applyFilters
        );

}

function applyFilters() {

    const region =
        document.getElementById(
            "regionFilter"
        ).value;

    const state =
        document.getElementById(
            "stateFilter"
        ).value;

    const category =
        document.getElementById(
            "categoryFilter"
        ).value;

    const year =
        document.getElementById(
            "yearFilter"
        ).value;

    filteredData =
        salesData.filter(item => {

            const itemYear =
                new Date(
                    item.orderDate
                ).getFullYear();

            return (

                (region === "all" ||
                    item.region === region)

                &&

                (state === "all" ||
                    item.state === state)

                &&

                (category === "all" ||
                    item.category === category)

                &&

                (year === "all" ||
                    itemYear.toString() === year)

            );

        });

    updateDashboard();

}