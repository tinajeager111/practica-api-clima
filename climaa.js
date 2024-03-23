//creando selectores
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//detectando eventos //con nuevo evento llamado load //window el evento tambien

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    console.log('buscarClima')
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    if (ciudad === '' || pais === '') {
        //hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700",
            "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6",
            "text-center");

        alerta.innerHTML = `
        <strong class= "font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;

        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {
    //consultar la API e imprimir

    //leer la url y agregar el API key que se creo en nuestra cuenta
    const appID = 'cbd355913118188b74aa0991b7f93a88';

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    Spinner();

    //query con fecth api
    fetch(url) //la url de la api
        .then(respuesta => {
            console.log("respuesta")
            return respuesta.json();
        })
        .then(datos => {
            console.log(datos);
            limpiarHTML();
            if (datos.cod === "404") {
                mostrarError('Ciudad No Encontrada')
            } else {
                mostrarClima(datos)

            }
        })
        //catch captura exepciones o errores
        .catch(error => {
            console.log(error)
        });
}

function mostrarClima(datos) {
    //console.log("datos")
    //formatear el clima...
    const { name, main: { temp, temp_max, temp_min } } = datos;
    //const grados = kelvinacentigrados(temp);
    const grados = parseInt(temp - 273.15);
    const min = kelvinacentigrados(temp_max);
    const max = kelvinacentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`; //ese es el codigo de grados centigrados en aski
    actual.classList.add('font-bold', 'text-6xl')

    const tempmaxima = document.createElement('p');
    tempmaxima.innerHTML = `Max: ${max} &#8451;`;
    tempmaxima.classList.add('text-xl')

    const tempminima = document.createElement('p');
    tempminima.innerHTML = `Min: ${min} &#8451;`;
    tempminima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempmaxima);
    resultadoDiv.appendChild(tempminima);

    resultado.appendChild(resultadoDiv)
}

function kelvinacentigrados(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();
    const divSpinnner = document.createElement('div');
    divSpinnner.classList.add('sk-fading-circle');

    divSpinnner.innerHTML = `
    <div class="sk-circle1 sk-circle"</div>
    <div class="sk-circle2 sk-circle"</div>
    <div class="sk-circle3 sk-circle"</div>
    <div class="sk-circle4 sk-circle"</div>
    <div class="sk-circle5 sk-circle"</div>
    <div class="sk-circle6 sk-circle"</div>
    <div class="sk-circle7 sk-circle"</div>
    <div class="sk-circle8 sk-circle"</div>
    <div class="sk-circle9 sk-circle"</div>
    <div class="sk-circle10 sk-circle"</div>
    <div class="sk-circle11 sk-circle"</div>
    <div class="sk-circle12 sk-circle"</div>
    `;
    resultado.appendChild(divSpinnner);
}
