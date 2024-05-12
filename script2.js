const tbody = document.querySelector("tbody");
const addForm = document.querySelector("#addForm");
const updateForm = document.querySelector("#updateForm");

const url = "http://localhost:3000/products";

const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
                const data = JSON.parse(xhr.responseText);
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
        } 
    };
    xhr.open("GET", url);
    xhr.send();
};


addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const price = parseFloat(document.querySelector("#price").value);
    const stock = parseInt(document.querySelector("#stock").value);
        const newProduct = { name, price, stock };
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Product added:', data);
                    fetchData();
            }
        };
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(newProduct));
});

const deleteProduct = async (id) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
                const data = JSON.parse(xhr.responseText);
                console.log('Product deleted:', data);
                fetchData();
            
        }
    };
    xhr.open("DELETE", `${url}/${id}`);
    xhr.send();
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

        const updatedProduct = { name, price, stock };
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Product updated:', data);
                    fetchData();
                    document.querySelector("#updateFormContainer").style.display = "none";
            }
        };
        xhr.open("PATCH", `${url}/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(updatedProduct));
});
function cancelUpdate() {
    document.querySelector("#updateFormContainer").style.display = "none";
}

fetchData();
