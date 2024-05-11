const tbody = document.querySelector("tbody");
const addForm = document.querySelector("#addForm");
const updateForm = document.querySelector("#updateForm");

const url = "http://localhost:3000/products";

const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        renderTable(data);
};

const renderTable = (products) => {
    tbody.innerHTML = "";
    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="deleteProduct('${product.id}')">Sil</button>
                    <button onclick="showUpdateForm('${product.id}', '${product.name}', ${product.price}, ${product.stock})">Düzəliş et</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
};

addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const price = parseFloat(document.querySelector("#price").value);
    const stock = parseInt(document.querySelector("#stock").value);

    if (name && !isNaN(price) && !isNaN(stock)) {
        const newProduct = { name, price, stock };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            console.log('Product added:', data);
            fetchData();
        } 
});

const deleteProduct = async (id) => {

        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Product deleted:', data);
        fetchData();
    
};

const showUpdateForm = (id, name, price, stock) => {
    document.querySelector("#updateId").value = id;
    document.querySelector("#updateName").value = name;
    document.querySelector("#updatePrice").value = price;
    document.querySelector("#updateStock").value = stock;
    document.querySelector("#updateFormContainer").style.display = "block";
};

updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.querySelector("#updateId").value;
    const name = document.querySelector("#updateName").value;
    const price = parseFloat(document.querySelector("#updatePrice").value);
    const stock = parseInt(document.querySelector("#updateStock").value);

    if (name && !isNaN(price) && !isNaN(stock)) {
        const updatedProduct = { name, price, stock };
            const response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            const data = await response.json();
            console.log('Product updated:', data);
            fetchData();
            document.querySelector("#updateFormContainer").style.display = "none";
    }
});

fetchData();
