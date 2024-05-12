const tbody = document.querySelector("tbody");
const addForm = document.querySelector("#addForm");
const updateForm = document.querySelector("#updateForm");

const url = "http://localhost:3000/products";
const fetchData = async () => {
    const response = await axios.get(url);
    const data = await response.data
    tbody.innerHTML = "";
    data.forEach(product => {
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
        await axios.post(url, { name, price, stock });
        fetchData();
});
const deleteProduct = async (id) => {
    await axios.delete(`${url}/${id}`);
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
        await axios.patch(`${url}/${id}`, { name, price, stock });
        fetchData();
        document.querySelector("#updateFormContainer").style.display = "none";
});

function cancelUpdate() {
    document.querySelector("#updateFormContainer").style.display = "none";
}
fetchData();
