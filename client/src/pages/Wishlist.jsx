import { useOutletContext } from "react-router-dom"

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useOutletContext()

    if (wishlist.length === 0) {
        return (
            <div className="empty-wishlist">
                <h2>Din önskelista är tom</h2>
                <p>Klicka på ⭐ på dina favoritgosedjur för att lägga till dem här!</p>
                <span className="wishlist-emoji">🧸💫</span>
            </div>
        )
    }

    return (
        <section className="wishlist-page">
            <h2>Min önskelista</h2>
            <div className="wishlist-grid">
                {wishlist.map((plushie) => (
                    <div className="wishlist-item" key={plushie.name}>
                        <button 
                            className="wishlist-button in-wishlist"
                            onClick={() => removeFromWishlist(plushie.name)}
                        >
                            ⭐
                        </button>
                        <img src={plushie.image} alt={plushie.name} />
                        <div className="wishlist-content">
                            <h3>{plushie.name}</h3>
                            <p className="plushie-type">Type: {plushie.type}</p>
                            <p className="love-message">{plushie.loveMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
} 