import Plushie from "./Plushie"

export default function PlushieList({ listOfPlushies, addToCart }) {
    return <section id="plushView">
        {
            listOfPlushies.map(
                (plushie, index) => <Plushie
                    key={plushie.name + "-" + index}
                    plushie={plushie}
                    addToCart={addToCart}
                />
            )
        }
    </section>
}