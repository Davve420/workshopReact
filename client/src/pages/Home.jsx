import data from "../public/data.js"
import PlushieList from "../Components/PlushList.jsx"

export default function Home() {
    return <section className="page">
        <h1>PTC Seller</h1>
        <PlushieList listOfPlushies={data} />
    </section>
}