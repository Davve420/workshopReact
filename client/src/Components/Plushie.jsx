
export default function Plushy({ plushie }) {
    const { name, image } = plushie

    return <div id="singlePlushy">
        <p>{name}</p>
        <img src={image} />
        <button onClick={() => addToCart(name)}>Add to cart</button>
    </div>
}