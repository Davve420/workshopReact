import { useOutletContext } from "react-router-dom"
import { useState } from "react"

export default function Plushy({ plushie, addToCart }) {
    const { wishlist, addToWishlist, removeFromWishlist } = useOutletContext()
    const isInWishlist = wishlist.some(item => item.name === plushie.name)
    const [showHeart, setShowHeart] = useState(false)

    const handleAddToCart = () => {
        addToCart(plushie.name)
        setShowHeart(true)
        setTimeout(() => setShowHeart(false), 1000)
    }

    return <div id="singlePlushy">
        <button 
            className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`}
            onClick={() => isInWishlist ? removeFromWishlist(plushie.name) : addToWishlist(plushie)}
        >
            {isInWishlist ? '⭐' : '☆'}
        </button>
        {showHeart && <div className="floating-heart">❤️</div>}
        <img src={plushie.image} alt={plushie.name} />
        <p>{plushie.name}</p>
        <p className="price">{plushie.price} kr</p>
        <button onClick={handleAddToCart}>Lägg i kundvagn</button>
    </div>
}