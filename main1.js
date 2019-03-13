const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
let getRequested = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        XHR.open("GET", url, true)
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status !== 200) {
                    reject('Error')
                } else {
                    resolve(xhr.responseText)
                }
            }
        }
        xhr.send()
    })
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container
        this.goods = []
        this.allProducts = []
        this._fetchProducts()
    }
    getJson(url){
        return fetch(url ? url :`${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            })
    }
    render(){
        const block = document.querySelector(this.container)
        for (let product of this.goods) {
            const productObj = new ProductItem(product)
            this.allProducts.push(productObj)
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
    calcSumCost() {
        let result = 0;
        for (let i = 0; i < this.allProducts.length; i++) {
            result += this.allProducts[i].price;
        }
        return result  
    }
}

class CartList extends ProductsList{
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container)
        this.cart = cart
        this.getJson(url)
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target)
            }
        })
    }
}

class Item {
    constructor(element, img = 'https://school.dreamstudy.ru/proxy/file/images/products/tovar-5-magazin.jpg') {
        this.product_title = element.product_title
        this.price = element.price
        this.id_product = element.id_product
        this.img = img
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Item">
                <div class="description">
                    <h3>${this.title}</h3>
                    <p>${this.price}£</p><br>
                    <button class="buy-btn">Купить</button>
                </div>
        </div>`
    }
}

    class ProductItem extends Item{}

class Cart extends ProductsList {
    constructor(container = ".product-cart", url = "/getBasket.json") {
        super(url, container)
    }

    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
        if(){
            let productId = +element.dataset['id']
            let find = this.allProducts.find(product => product.id_product === productId)
            if(find){
                find.quantity++
            } else {
                let product = {
                    id_product: productId,
                    price: +element.dataset['price'],
                    product_name: element.dataset['name'],
                    quantity:1
                }
                this.render()
            }
        }
    }
    removeProduct(element){
        if(){
            let productId = +element.dataset['id']
            let find = this.allProducts.find(product => product.id_product === productId)
            if(find){
                find.quantity--
            } else {
                this.allProducts.splice(this.allProducts.indexOf(find), 1)
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
                }
                this.render()
            }
        }
        _init(){
                document.querySelector('.btn-cart').addEventListener('click', () => {
                document.querySelector(this.container).classList.toggle('invisible')
            })
            document.querySelector(this.container).addEventListener('click', e => {
                if(e.target.classList.contains('del-btn')){
                    this.removeProduct(e.target)
                }
            })
        }
}

class CartElement extends  Item{
    constructor(element, img = 'https://school.dreamstudy.ru/proxy/file/images/products/tovar-5-magazin.jpg'){
        super(el,img)
        this.quantity = element.quantity
    }
    render(){
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Item">
                <div class="description">
                    <h3>${this.title}</h3>
                    <p>${this.price}£</p><br>
                    <p class="product-quantity">Quantity: ${this.quatity}</p>
                    <button class="del-btn">Удалить</button>
                </div>
        </div>`
    }
}

let Cartlist = new ProductsList()
list.render()