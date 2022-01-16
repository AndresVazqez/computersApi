const div$$ = document.querySelector(".hola");
const h1$$ = document.createElement("h1")
h1$$.innerHTML = "Hola mundo";
div$$.appendChild(h1$$);

const print = async () => {
    const pet = await fetch("http://localhost:7500/api/computers")
    const res = await pet.json();
    console.log(res);
}

print();