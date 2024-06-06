// Get a reference to the file input element
const inputElement = document.querySelector('input[type="file"]');
const fileList = document.querySelector('#fileList');
const displayBox = document.querySelector('#displayBox'); 
const toggleBtn = document.querySelector("#toggleHeader");
const fileContainer = document.querySelector('#fileContainer');

// Create a FilePond instance
const pond = FilePond.create(inputElement);

pond.setOptions({
    server: "/upload"
});

pond.on('processfile', (error, file) => {
   fileList.innerHTML = '';
   updateFileList();
});


const updateFileList = async ()=> {
    filesReq = await fetch('/fileList');

    if (filesReq.ok){
        const files = await filesReq.json();
        displayBox.src = `/Upload/${files[0]}`;
        files.forEach(file => {
            let div = document.createElement('div');
            div.innerHTML = `<div onclick="frameUpdate(this)">${file}</div>`
            fileList.appendChild(div);
        });
    }
}

const frameUpdate = (element) => {
    displayBox.classList.remove('hidden');
    displayBox.src = `/Upload/${element.innerHTML}`;
}

toggleBtn.addEventListener('click', () => {
    // displayBox.classList.remove('hidden');
    // check if classlist include  hidden
    if(fileContainer.classList.contains('hidden')){
        toggleBtn.innerHTML = 'See less';
        fileContainer.classList.remove('hidden');
    } else {
        toggleBtn.innerHTML = 'See more';
        fileContainer.classList.add('hidden');
    }
});
updateFileList();