import Plushie from "./Plushie"

export default function PlushieList({ listOfPlushies }) {
    return <section id="cardList">
        {
            listOfPlushies.map(
                (plushie, index) => <Plushie
                    key={plushie.name + "-" + index}
                    plushie={plushie}
                />
            )
        }
    </section>
}