async function fetchCryptoData() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

function updateTable(data) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

async function updateCryptoPrices() {
    const cryptoData = await fetchCryptoData();
    updateTable(cryptoData);
}

// Update every minute
setInterval(updateCryptoPrices, 60000);

// Initial load
updateCryptoPrices();
