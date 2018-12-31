'use strict'

class Product {
    constructor (name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UserInterface {
    constructor(){
        this.getProducts();
    }

    addProduct(product){
        this.addHTMLProduct(product);
        // Save on LocalStorage
        if(localStorage.getItem('Products') === null){
            let products = [];
            products.push(product);
            localStorage.setItem('Products', JSON.stringify(products));
        }else{
            let products = JSON.parse(localStorage.getItem('Products'));
            products.push(product);
            localStorage.setItem('Products', JSON.stringify(products));
        }
        this.showMsj('Added Product Success in Storage','success');
        this.resetForm();
    }
/**
 * Hay arreglar el metodo DeleteProduct
 *  */
    deleteProduct(element){
        const products = JSON.parser(localStorage.getItem('Products'));
        for(let i = 0; i < products.length; i ++){
            if(products[i].name == element){
                products.splice(i,1);
            }
        }
        localStorage.setItem('Products',JSON.stringify(products));
        if(element.id === 'btnDelete'){
            element.parentElement.parentElement.remove();
            this.showMsj('Product Deleted Success', 'success');
        }
    }

    addHTMLProduct(product){
        const productList = document.getElementById('product-list');
        const productHTML = document.createElement('div');
        productHTML.className = 'card border-primary mb-3';
        productHTML.setAttribute('style','max-width: 20rem');
        productHTML.innerHTML = `
            <div class="card-header">${product.name}</div>
            <div class="card-body">
            <h4 class="card-title">L. ${product.price}</h4>
            <p class="card-text">Some quick example text to build on the card title 
            and make up the bulk of the card's content. Año ${product.year}</p>
            <a class="btn btn-danger" id="btnDelete" >Delete</a>
            </div>`;
        productList.appendChild(productHTML);
    }
    getProducts(){
        if(!(localStorage.getItem('Products') == null)){
            let products = JSON.parse(localStorage.getItem('Products'));
            console.log(products);
            let palabra = (products.length > 1) ? 'Products' : 'Product';
            this.showMsj(`We have ${products.length} ${palabra} in localstorage`,'success');
            products.forEach(product =>{
                this.addHTMLProduct(product);
            });
        }
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    showMsj(msj,cssClass){
        const aler = document.createElement('div');
        aler.className = `alert alert-dismissible alert-${cssClass} mt-4`;
        aler.innerHTML = `
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>${msj}</strong>.
        `;
        const container = document.querySelector('.container');
        const app = document.getElementById('App');
        container.insertBefore(aler, app);
        setTimeout(()=>{
            aler.remove();
        },4000);
    }

}

// DOM Events
const ui = new UserInterface();
// Form Events
document.getElementById('product-form')
    .addEventListener('submit', event =>{
        const name = document.getElementById('name').value;
        const price = parseInt(document.getElementById('price').value);
        const year = document.getElementById('year').value;

        if(name === '' || price === undefined || year === ''){
            return ui.showMsj('Error! - Tiene que llenar todos los campos!','danger');
        }
        console.log(name,price,year);
            const product = new Product(name, price, year);    
            ui.addProduct(product);
        event.preventDefault();
    });
document.getElementById('product-list')
    .addEventListener('click',(e)=>{
        ui.deleteProduct(e.target);
    });
