
export default function Plushy({ plushie }) {
    const { name, image } = plushie

    return <div>
        <p>{name}</p>
        <img src={image} />
        <button onClick={() => addToCart(name)}>Add to cart</button>
        <button onClick={() => removeFromCart(name)}>Remove from cart</button>
    </div>
}