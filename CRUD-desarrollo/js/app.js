var firebaseConfig = {
    apiKey: "AIzaSyCCDBRYuIA3voRn4YSPOJ_rhu-onaZYW2M",
    authDomain: "crud-desarrollo.firebaseapp.com",
    projectId: "crud-desarrollo",
    storageBucket: "crud-desarrollo.appspot.com",
    messagingSenderId: "171465051434",
    appId: "1:171465051434:web:c1415c33e2980fdc622253"
}

const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const updateModal = document.getElementById('modal-update')
const updateForm = document.getElementById('update-form')
const closeUpdateModal = document.getElementById('closeUpdateModal')
const closeModal = document.getElementById('closeRegisterModal')
const registerForm = document.getElementById('register-form')
const moviesTable = document.getElementById('movies-table')
firebase.initializeApp(firebaseConfig)
const movieRef = firebase.database().ref('movies')

const showRegisterModal = () => {
    modal.classList.toggle('is-active')
}

openModal.addEventListener('click', showRegisterModal)
closeModal.addEventListener('click', showRegisterModal)

const deleteMovies = (uid) => {
    firebase.database().ref(`movies/${uid}`).remove()
}

const showUpdateModal = () => {
    updateModal.classList.toggle('is-active')
}

closeUpdateModal.addEventListener('click', showUpdateModal)

window.addEventListener('DOMContentLoaded', async(e) => {
    await movieRef.on('value', (movies) => {
        moviesTable.innerHTML = ''
        movies.forEach((movie) => {
            const movieData = movie.val()
            moviesTable.innerHTML += `
        <tr>
	        <th>1</th>
          <th>${movieData.Titulo}</th>
          <td>${movieData.Ano_lanzamiento}</td>
          <td>${movieData.Duracion}</td>
	      <td>${movieData.Genero}</td>
          <td>${movieData.Reparto_principal}</td>
          <td>${movieData.Director}</td>
          <td>${movieData.Guion}</td>
          <td>${movieData.Sinopsis}</td>
		      <td>
			      <button class="button is-warning" data-id="${movieData.Uid}">
				      <i class="fas fa-pencil-alt"></i>
			      </button>
			      <button class="button is-danger" data-id="${movieData.Uid}">
				      <i class="fas fa-trash"></i>
			      </button>
		      </td>
        </tr>`

            const updateButtons = document.querySelectorAll('.is-warning')
            updateButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    showUpdateModal()
                    firebase.database()
                        .ref(`movies/${e.target.dataset.id}`)
                        .once('value')
                        .then((movie) => {
                            const data = movie.val()
                            updateForm['titulo'].value = data.Titulo
                            updateForm['lanzamiento'].value = data.Ano_lanzamiento
                            updateForm['duracion'].value = data.Duracion
                            updateForm['genero'].value = data.Genero
                            updateForm['repartoprincipal'].value = data.Reparto_principal
                            updateForm['director'].value = data.Director
                            updateForm['guion'].value = data.Guion
                            updateForm['sinopsis'].value = data.Sinopsis
                        })
                    const uid = e.target.dataset.id
                    updateForm.addEventListener('submit', (e) => {
                        e.preventDefault()

                        const titulo = updateForm['titulo'].value
                        const anolanzamiento = updateForm['lanzamiento'].value
                        const duracion = updateForm['duracion'].value
                        const genero = updateForm['genero'].value
                        const repprincipal = updateForm['repartoprincipal'].value
                        const director = updateForm['director'].value
                        const guion = updateForm['guion'].value
                        const sinop = updateForm['sinopsis'].value

                        firebase.database().ref(`movies/${uid}`).update({
                            Titulo: titulo,
                            Ano_lanzamiento: anolanzamiento,
                            Duracion: duracion,
                            Genero: genero,
                            Reparto_principal: repprincipal,
                            Director: director,
                            Guion: guion,
                            Sinopsis: sinop,
                        })
                        showUpdateModal()
                    })
                })
            })

            const deleteButtons = document.querySelectorAll('.is-danger')
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    deleteMovies(e.target.dataset.id)
                })
            })
        })
    })
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const titulo = registerForm['titulo'].value
    const anolanzamiento = registerForm['lanzamiento'].value
    const duracion = registerForm['duracion'].value
    const genero = registerForm['genero'].value
    const repprincipal = registerForm['repartoprincipal'].value
    const director = registerForm['director'].value
    const guion = registerForm['guion'].value
    const sinop = registerForm['sinopsis'].value

    const registerMovie = movieRef.push()
    registerMovie.set({
        Uid: registerMovie.path.pieces_[1],
        Titulo: titulo,
        Ano_lanzamiento: anolanzamiento,
        Duracion: duracion,
        Genero: genero,
        Reparto_principal: repprincipal,
        Director: director,
        Guion: guion,
        Sinopsis: sinop,
    })
    showRegisterModal()
})