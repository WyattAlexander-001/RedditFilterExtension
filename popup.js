document.addEventListener('DOMContentLoaded', function() {
    const addPhraseButton = document.getElementById('addPhrase');
    const saveButton = document.getElementById('save');
    const newPhraseInput = document.getElementById('newPhrase');
    const phraseListDiv = document.getElementById('phraseList');
    const clearAllButton = document.getElementById('clearAll');
    const form = document.getElementById('phraseForm');
    
    // Event listener for form submission (Enter key or Add button)
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission
        addPhrase();
    });

    // Function to add a new phrase
    function addPhrase() {
        const phrase = newPhraseInput.value.trim();
        if (phrase) {
            addPhraseToDisplay(phrase);
            newPhraseInput.value = '';
        }
    }

    // Load and display the stored phrases
    chrome.storage.sync.get('filteredPhrases', function(data) {
        if (data.filteredPhrases) {
            data.filteredPhrases.forEach(phrase => addPhraseToDisplay(phrase));
        }
    });

    // Add phrase to the display list
    function addPhraseToDisplay(phrase) {
        const phraseDiv = document.createElement('div');
        phraseDiv.textContent = phrase;
        phraseListDiv.appendChild(phraseDiv);
    }

    // Save the updated list
    saveButton.addEventListener('click', function() {
        const phrases = Array.from(phraseListDiv.children).map(div => div.textContent);
        chrome.storage.sync.set({ 'filteredPhrases': phrases }, function() {
            alert('Phrases saved!');
        });
    });

    // Event listener for the Clear All button
    clearAllButton.addEventListener('click', function() {
        phraseListDiv.innerHTML = '';
        chrome.storage.sync.set({ 'filteredPhrases': [] }, function() {
            console.log('All phrases cleared');
        });
    });   
});
