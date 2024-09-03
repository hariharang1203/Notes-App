
        const container = document.getElementById('container');
        const btn = document.getElementsByClassName('btn')[0];

        // Accessing Storage 
        function getAppStorage() {
            return JSON.parse(localStorage.getItem("notes-app") || "[]");
        }

        getAppStorage().forEach((values) => {
            const textElement = createTextElement(values.id, values.content);
            container.insertBefore(textElement, btn);
        });

        // Create Element
        function createTextElement(id, content) {
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('note-container');

            const textElement = document.createElement("textarea");
            textElement.classList.add("note");
            textElement.placeholder = "Enter The Information";
            textElement.value = content;

            const xicon = document.createElement('i');
            xicon.classList.add('material-icons', 'icon');
            xicon.innerText = "clear";

           

            textElement.addEventListener("change", () => {
                updateNote(id, textElement.value);
            });

            xicon.addEventListener("click", () => {
                const check = confirm("Do You Want To Delete");
                if (check) {
                    deleteNote(id, containerDiv);
                }
            });

            containerDiv.appendChild(textElement);
            containerDiv.appendChild(xicon);
            return containerDiv;
        }

        // Add Notes
        function addNotes() {
            const notes = getAppStorage();
            const newNote = {
                id: Math.floor(Math.random() * 100000),
                content: ''
            }
            const textElement = createTextElement(newNote.id, newNote.content);
            container.insertBefore(textElement, btn);
            notes.push(newNote);
            saveNotes(notes);
        }

        btn.addEventListener("click", () => addNotes());

        // Save Notes
        function saveNotes(notes) {
            localStorage.setItem("notes-app", JSON.stringify(notes));
        }

        // Update Note
        function updateNote(id, content) {
            const notes = getAppStorage();
            const updatevalue = notes.filter(note => note.id == id)[0];
            updatevalue.content = content;
            saveNotes(notes);
        }

        // Delete Note
        function deleteNote(id, containerDiv) {
            const notes = getAppStorage().filter(note => note.id != id);
            saveNotes(notes);
            container.removeChild(containerDiv);
        }
    