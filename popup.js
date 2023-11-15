document.addEventListener('DOMContentLoaded', function() {
    const addPhraseButton = document.getElementById('addPhrase');
    const saveButton = document.getElementById('save');
    const newPhraseInput = document.getElementById('newPhrase');
    const phraseListDiv = document.getElementById('phraseList');

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

    // Add new phrase to the list
    addPhraseButton.addEventListener('click', function() {
        const phrase = newPhraseInput.value.trim();
        if (phrase) {
            addPhraseToDisplay(phrase);
            newPhraseInput.value = '';
        }
    });

    // Save the updated list
    saveButton.addEventListener('click', function() {
        const phrases = Array.from(phraseListDiv.children).map(div => div.textContent);
        chrome.storage.sync.set({ 'filteredPhrases': phrases }, function() {
            alert('Phrases saved!');
        });
    });
});
