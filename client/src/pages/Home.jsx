import data from "../public/data.js"
import PlushieList from "../Components/PlushList.jsx"
import { useState, useEffect } from "react"

export default function Home() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    // Spara kundvagnen i localStorage när den uppdateras
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(name){
        const plushie = data.find(p => p.name === name)
        if(!cart.find(item => item.name == name)){
            setCart([...cart,{"name": name, "amount": 1, "price": plushie.price}])
        } else{
            const tempCart = [...cart]
            const index = tempCart.findIndex(item => item.name == name)
            tempCart[index].amount += 1
            setCart(tempCart)
        }
    }

    function removeFromCart(name) {
        const tempCart = [...cart]
        const index = tempCart.findIndex(item => item.name === name)
        
        if (index !== -1) {
            if (tempCart[index].amount > 1) {
                tempCart[index].amount -= 1
                setCart(tempCart)
            } else {
                setCart(tempCart.filter(item => item.name !== name))
            }
        }
    }

    function handleCheckout() {
        setShowConfirmation(true)
        setCart([])
        setIsCartOpen(false)
        setTimeout(() => setShowConfirmation(false), 3000)
    }

    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0)
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.amount), 0)

    return <> 
        <div className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒 {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
        
        {isCartOpen && (
            <div className="cart-dropdown">
                <h3>Din kundvagn</h3>
                {cart.length === 0 ? (
                    <p>Kundvagnen är tom</p>
                ) : (
                    <>
                        {cart.map((item, index) => (
                            <div className="cart-item" key={item.name + "-" + index}>
                                <span>{item.name} <span className="amount">× {item.amount}</span></span>
                                <div className="cart-item-right">
                                    <span className="price">{item.price * item.amount} kr</span>
                                    <button className="remove-button" onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(item.name);
                                    }}>🗑️</button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            <span>Totalt:</span>
                            <span className="total-price">{totalPrice} kr</span>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Betala nu 🎉
                        </button>
                    </>
                )}
            </div>
        )}

        {showConfirmation && (
            <div className="confirmation-popup">
                <div className="confirmation-content">
                    <h2>Tack för ditt köp! 🎈</h2>
                    <p>Dina gosedjur är på väg till dig</p>
                    <span className="emoji-rain">🧸✨🎉</span>
                </div>
            </div>
        )}

        <section className="plushList">
            <PlushieList listOfPlushies={data} addToCart={addToCart} />
        </section>
    </>
}

