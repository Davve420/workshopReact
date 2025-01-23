import data from "../public/data.js"
import PlushieList from "../Components/PlushList.jsx"
import { useState } from "react"

export default function Home() {
    const [cart,setCart] = useState([])

    function addToCart(name){
        if(!cart.find(item => item.name == name)){
            setCart([...cart,{"name": name,"amount": 1}])
        } else{
            const tempCart = [...cart]
            const index = tempCart.findIndex(item => item.name == name)
            tempCart[index].amount += 1
            setCart(tempCart)
        }
    }

    return<> <section className="plushList">
        <h1>PTC Seller</h1>
        <PlushieList listOfPlushies={data} />
    </section>
    <section id="PlushieCart">
        {
            cart.length == 0 ?
            <p>Cart is empty</p> 
            :
            cart.map(
                (item, index) => {return <div id="cartItem"><p key= {item + "-" + index}>{item.name}{item.amount}</p><button id="removeButton" onClick={() => removeFromCart(item.name)}>🗑️</button></div>}
            )
        }
    </section>
    </>
}

