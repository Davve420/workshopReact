import { useOutletContext } from "react-router-dom"

export default function Plushy({ plushie, addToCart }) {
    const { wishlist, addToWishlist, removeFromWishlist } = useOutletContext()
    const isInWishlist = wishlist.some(item => item.name === plushie.name)

    return <div id="singlePlushy">
        <button 
            className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`}
            onClick={() => isInWishlist ? removeFromWishlist(plushie.name) : addToWishlist(plushie)}
        >
            {isInWishlist ? '⭐' : '☆'}
        </button>
        <img src={plushie.image} alt={plushie.name} />
        <p>{plushie.name}</p>
        <p className="price">{plushie.price} kr</p>
        <button onClick={() => addToCart(plushie.name)}>Lägg i kundvagn</button>
    </div>
}