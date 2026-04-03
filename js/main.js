const { createApp } = Vue;

createApp({
    data() {
        return {
            products: [
                { id: 1, title: "Гала", short_text: "Солодке та хрустке", image: "images/apple1.jpg", desc: "Яблука сорту Гала мають чудовий солодкий смак." },
                { id: 2, title: "Фуджі", short_text: "Велике та соковите", image: "images/apple2.jpg", desc: "Сорт Фуджі відрізняється твердою текстурою." },
                { id: 3, title: "Голден", short_text: "Жовте з м'яким смаком", image: "images/apple3.jpg", desc: "Класичний сорт жовтих яблук." },
                { id: 4, title: "Гренні Сміт", short_text: "Зелене з кислинкою", image: "images/apple4.jpg", desc: "Популярний зелений сорт яблук." },
                { id: 5, title: "Ред Делішес", short_text: "Червоне класичне", image: "images/apple5.jpg", desc: "Має темно-червоний колір шкірки." }
            ],
            product: {},
            btnVisible: 0,
            cart: [],
            contactFields: { name: '', email: '', phone: '', message: '' },
            orderSubmitted: false
        }
    },
    methods: {
        getProduct() {
            const hashId = parseInt(window.location.hash.substring(1));
            console.log("ID из адреса:", hashId);
            if (hashId) {
                const found = this.products.find(p => p.id === hashId);
                this.product = found ? found : {};
                console.log("Найденный товар:", this.product);
            }
        },
        getCart() {
            try {
                const rawData = localStorage.getItem('cart');
                const savedIds = JSON.parse(rawData) || [];
                
                // Преобразуем все ID из памяти в числа и фильтруем массив продуктов
                this.cart = this.products.filter(p => {
                    return savedIds.map(Number).includes(Number(p.id));
                });

                console.log("ID в localStorage:", savedIds);
                console.log("Найдено совпадений в products:", this.cart.length);
            } catch (e) {
                console.error("Ошибка при чтении корзины:", e);
                this.cart = [];
            }
        },
        addToCart(id) {
            console.log("Попытка добавить ID:", id);
            if (!id) {
                console.error("Ошибка: ID не передан!");
                return;
            }
            let savedIds = JSON.parse(localStorage.getItem('cart')) || [];
            if (!savedIds.includes(id)) {
                savedIds.push(id);
                localStorage.setItem('cart', JSON.stringify(savedIds));
            }
            this.btnVisible = 1;
            this.getCart();
        },
        checkInCart() {
            const hashId = parseInt(window.location.hash.substring(1));
            const savedIds = JSON.parse(localStorage.getItem('cart')) || [];
            this.btnVisible = (hashId && savedIds.includes(hashId)) ? 1 : 0;
            console.log("Кнопка статус (1-Go, 0-Add):", this.btnVisible);
        },
        removeFromCart(id) {
            let savedIds = JSON.parse(localStorage.getItem('cart')) || [];
            savedIds = savedIds.filter(itemId => itemId !== id);
            localStorage.setItem('cart', JSON.stringify(savedIds));
            this.getCart();
            this.checkInCart();
        },
        makeOrder() {
            this.orderSubmitted = true;
            localStorage.removeItem('cart');
            this.cart = [];
            this.btnVisible = 0;
        }
    },
    mounted() {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    }
}).mount('#app');