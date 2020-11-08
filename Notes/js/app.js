showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
  let addTxt = document.getElementById('addTxt');
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  content = addTxt.value

  let addTitle = document.getElementById('cardTitle');
  let  title = localStorage.getItem('title');
  if (title == null) {
    titleObj = [];
  }
  else {
    titleObj = JSON.parse(title);
  }
  titleContent = addTitle.value

  if ((content != "") && (titleContent != "")){
    notesObj.push(content)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = ''
    titleObj.push(addTitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addTitle.value = "";
  }
  else {
    let warning = document.getElementById('warning')
    warning.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Error</strong> Your note is empty can't add this empty note Add some content in it!.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  }

  setTimeout(function () {
    warning.innerHTML = ''
  }, 5000);
  showNotes()
})


function showNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let  title = localStorage.getItem('title');
  if (title == null) {
    titleObj = [];
  }
  else {
    titleObj = JSON.parse(title);
  }
  let html = '';
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${titleObj[index]}</h5>
                  <p class="card-text">${element}</p>
                  <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
             </div> `;
  })
  
  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `<div class="container alert alert-warning">
                                <strong>Warning!</strong> Nothing to show! Use "Add Note" section above to add notes.
                          </div>`
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let  title = localStorage.getItem('title');
  if (title == null) {
    titleObj = [];
  }
  else {
    titleObj = JSON.parse(title);
  }
  notesObj.splice(index, 1);
  titleObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  localStorage.setItem('title', JSON.stringify(titleObj));
  showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
  let inputVal = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName('noteCard');
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }

  })
})
