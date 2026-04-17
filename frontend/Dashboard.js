const API = "http://localhost:3000/ads";

async function fetchAds() {
    const res = await fetch(API);
    const data = await res.json();
    renderTable(data);
}

function renderTable(data) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    data.forEach(ad => {
        const row = `
        <tr>
            <td><a href="${ad.link}" target="_blank">View</a></td>
            <td>${ad.product}</td>
            <td>${ad.sales}</td>
            <td>
                <span class="status ${ad.active ? 'on' : 'off'}"
                onclick="toggleStatus('${ad._id}', ${ad.active})">
                ${ad.active ? 'ON' : 'OFF'}
                </span>
            </td>
            <td>
    <div class="actions">
        <button class="add" onclick="updateSales('${ad._id}', ${ad.sales + 1})">+</button>
        <button class="minus" onclick="updateSales('${ad._id}', ${Math.max(0, ad.sales - 1)})">-</button>
    </div>
</td>

        </tr>
        `;
        table.innerHTML += row;
    });
}

async function addRow() {
    const link = document.getElementById("link").value;
    const product = document.getElementById("product").value;

    if (!link || !product) return alert("Fill all fields");

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link, product })
    });

    fetchAds();
}

async function updateSales(id, sales) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sales })
    });

    fetchAds();
}

async function toggleStatus(id, current) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !current })
    });

    fetchAds();
}

// Load data
fetchAds();
