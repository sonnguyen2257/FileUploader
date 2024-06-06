// Get a reference to the file input element
const inputElement = document.querySelector('input[type="file"]');

// Create a FilePond instance
const pond = FilePond.create(inputElement);

pond.setOptions({
    server: "/upload"
});

// when a file uploades successfully insert a div with fetch response into the DOM
pond.on('processfile', (error, file) => {
    if (!error) {
        const div = document.createElement('div');
        div.textContent = file.filename;
        document.body.appendChild(div);
    }
});