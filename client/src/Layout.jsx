import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const plushieMessages = {
    "bear": [
        "Jag är en kramgo björn som alltid finns här för dig! 🐻",
        "Redo att ge dig världens bästa björnkramar! 🤗",
        "En mysig vän som värmer ditt hjärta 💝"
    ],
    "cat": [
        "Spinnande mjuk och alltid redo för mys! 😺",
        "En gosig kattkomis som älskar dig! 🐱",
        "Kommer att vara din trognaste vän 💕"
    ],
    "dog": [
        "En valpvän som alltid är glad att se dig! 🐶",
        "Redo för kramar och bus dygnet runt! 🐕",
        "Din mest lojala kompis i alla lägen 🦮"
    ],
    "bunny": [
        "Hoppar av glädje när du kommer! 🐰",
        "En fluffig vän med stora öron och stort hjärta 🌸",
        "Mysigaste kaninkompisen du kan tänka dig! 🥕"
    ],
    "unicorn": [
        "Sprider magi och glädje varje dag! 🦄",
        "Din magiska vän som gör vardagen till ett äventyr ✨",
        "Tillsammans kan vi göra det omöjliga! 🌈"
    ],
    "dragon": [
        "En modig vän som skyddar dina drömmar! 🐲",
        "Tillsammans kan vi flyga mot nya äventyr! ✨",
        "Din magiska beskyddare, dag som natt 🔮"
    ],
    "default": [
        "Din nya bästa vän väntar på dig! ✨",
        "Redo att ge dig massor av kramar! 🌟",
        "Kommer finnas där för dig när du behöver en vän 💕",
        "Den perfekta vännen för alla äventyr 🌈",
        "Extra kramgo och mysig! 🤗"
    ]
}

function getPlushieMessage(plushie) {
    const messages = plushieMessages[plushie.type.toLowerCase()] || plushieMessages.default
    // Använd plushiens namn som seed för att alltid få samma meddelande för samma plushie
    const index = plushie.name.length % messages.length
    return messages[index]
}

export default function Layout(){
    const [wishlist, setWishlist] = useState(() => {
        // Hämta sparad önskelista från localStorage när komponenten laddas
        const savedWishlist = localStorage.getItem('wishlist')
        return savedWishlist ? JSON.parse(savedWishlist) : []
    })

    // Spara önskelistan i localStorage när den uppdateras
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    function addToWishlist(plushie) {
        if (!wishlist.find(item => item.name === plushie.name)) {
            const message = getPlushieMessage(plushie)
            setWishlist([...wishlist, { ...plushie, loveMessage: message }])
        }
    }

    function removeFromWishlist(name) {
        setWishlist(wishlist.filter(item => item.name !== name))
    }

    return <>
    <header id="Wrapper">
        <div className="header-content">
            <h1>Plushie World</h1>
            <nav id="navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/wishlist">Önskelista {wishlist.length > 0 && <span className="wishlist-count">{wishlist.length}</span>}</NavLink>
            </nav>
        </div>
    </header>
    <main>
        <Outlet context={{ wishlist, addToWishlist, removeFromWishlist }} />
    </main>
    </>
}