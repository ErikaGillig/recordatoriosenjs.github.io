// To do List //
const form = document.querySelector('form');
const newTaskInput = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function showClock() {
  console.log('showClock() called');
  const clockContainer = document.getElementById('clock');

  setInterval(() => {
    const now = luxon.DateTime.now();
    clockContainer.textContent = now.toLocaleString(luxon.DateTime.TIME_SIMPLE);
  }, 1000);
}


function showWeather() {
  const weatherContainer = document.createElement('div');
  weatherContainer.setAttribute('id', 'weather');
  document.getElementById('header-container').appendChild(weatherContainer);

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const apiKey = '8a6c33fed71b2e2af93f9e782e9bf589';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const location = data.name;
        const temperature = data.main.temp.toFixed(1);
        const description = data.weather[0].description;

        if (description.includes('cloud')) {
          weatherContainer.classList.add('cloudy');
        } else if (description.includes('sun')) {
          weatherContainer.classList.add('sunny');
        } else if (description.includes('rain')) {
          weatherContainer.classList.add('rainy');
        }

        weatherContainer.textContent = `${location}: ${temperature}°C, ${description}`;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherContainer.textContent = 'Error fetching weather data';
      });
  });
}

window.addEventListener('load', () => {
  showClock();
  showWeather();
});


// Renderizar la lista de tareas
function renderTasks() {
  taskList.innerHTML = '';

  // Filtrar tareas completadas
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  // Ordenar tareas completadas arriba
  tasks = [...completedTasks, ...incompleteTasks];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement('li');

    // Añadir span con la tarea para poder tacharla
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.addEventListener('click', () => {
      toggleTaskCompleted(i);
    });
    li.appendChild(taskText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => {
      deleteTask(i);
    });
    li.appendChild(deleteButton);

    // Tachar tarea completada
    if (task.completed) {
      taskText.style.textDecoration = 'line-through';
    }

    taskList.appendChild(li);
  }
}

// Añadir tarea nueva
function addTask(event) {
  event.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    tasks.push({text: taskText, completed: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTaskInput.value = '';
    renderTasks();
  }
}

// Borrar Tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Cambiar estado de tarea completada
function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener('submit', addTask);

renderTasks();



// NOTAS  //
function addNote() {
  const noteInput = document.getElementById('note');
  const note = noteInput.value;
  
  if (note.trim() === '') {
    return;
  }
  
  // Crear un objeto para representar la nota
  const noteObject = {
    id: Date.now(),
    text: note
  };
  
  let notes = localStorage.getItem('notes');
  
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  
  // Añadir la nueva nota al array
  notes.push(noteObject);
  
  localStorage.setItem('notes', JSON.stringify(notes));
  
  // Limpiar el formulario
  noteInput.value = '';
  
  // Actualizar la lista de notas en la página
  updateNotes();
}

function deleteNote(noteId) {
  let notes = localStorage.getItem('notes');
  
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  
  notes = notes.filter(note => note.id !== noteId);
  
  // Guardar el nuevo array de notas en el Local Storage
  localStorage.setItem('notes', JSON.stringify(notes));
  
  // Actualizar la lista de notas en la página
  updateNotes();
}

function updateNotes() {
  // Obtener el contenedor de notas en la página
  const notesContainer = document.getElementById('notes-container');
  
  // Obtener las notas almacenadas en el Local Storage
  let notes = localStorage.getItem('notes');
  
  if (notes === null) {
    // Si no hay notas almacenadas, no hacer nada
    return;
  } else {
    // Si hay notas almacenadas, convertir la cadena JSON a un array
    notes = JSON.parse(notes);
  }
  
  // Crear un elemento para cada nota y sumarla al contenedor
  notesContainer.innerHTML = '';
  for (const noteObject of notes) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = '<p>' + noteObject.text + '</p><button onclick="deleteNote(' + noteObject.id + ')">Eliminar</button>';
    notesContainer.appendChild(noteElement);
  }
}

// Actualizar la lista de notas al cargar la página
updateNotes();


const btn = document.getElementById('changeColorBtn');
const container = document.querySelector('.container');

btn.addEventListener('click', function() {
  container.classList.toggle('dark'); // cambia la clase del contenedor al esquema de color oscuro
});

function irAPagina() {
  window.location.href = "https://www.linkedin.com/in/erika-gillig";
}


