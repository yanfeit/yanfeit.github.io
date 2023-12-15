const generateButton = document.getElementById('generate-button');
const outputField = document.getElementById('output-field');
const stopWords = ["a", "and", "of", "the", "during"];
const keywordCount = 7;

function removeStopWords(words, stopWords) {
    return words.filter(word => !stopWords.includes(word.toLowerCase()) && word !== "");
}

// Function to pick first N words without stop words
function firstNWordsWithoutStopWords(strArray, count, stopWords) {
    const cleanArray = removeStopWords(strArray, stopWords);
    return cleanArray.slice(0, Math.min(count, cleanArray.length)); // Ensure we don't go beyond array length
}

generateButton.addEventListener('click', function () {
    const bibtexInput = document.getElementById('bibtex-input').value;

    // Extract relevant information from the BibTex context
    const authorRegex = /author\s*=\s*{([^,]+),.*/;
    const authorMatch = bibtexInput.match(authorRegex);
    let authorLastName = "";
    if (authorMatch) {
        const authorParts = authorMatch[1].split(" and ");
        authorLastName = authorParts[0].split(" ")[authorParts[0].split(" ").length - 1].trim();
    }

    console.log(authorLastName);

    const yearRegex = /year\s*=\s*{(\d{4})}/;
    const yearMatch = bibtexInput.match(yearRegex);
    let year = "";
    if (yearMatch) {
        year = yearMatch[1];
    }

    const journalRegex = /journal\s*=\s*{(.*)},.*/;
    const journalMatch = bibtexInput.match(journalRegex);

    console.log(journalMatch[1]);

    let journalShortcut = "";
    let journalShortcutfull = "";
    if (journalMatch) {
        const journalTitleWords = journalMatch[1].trim().split(/\s+/);
        for (const word of journalTitleWords) {
            journalShortcut += word.substr(0, 3).toUpperCase(); // Extract first letter of each word
            journalShortcutfull += word
        }
    }


    const titleRegex = /title\s*=\s*{(.*)/;
    const titleMatch = bibtexInput.match(titleRegex);
    let title = "";
    if (titleMatch) {
        title = titleMatch[1].replace(/,/g, "."); // Replace commas with periods
    }
    let titleWords = title.split(/\W+/);

    titleWords = firstNWordsWithoutStopWords(titleWords, keywordCount, stopWords);

    const finalTitle = titleWords.join("."); // Join words with periods

    // Generate the output string
    const outputString = `${authorLastName}${year}.${journalShortcut}.${finalTitle}` + ` \n ` + `${authorLastName} et al., ${journalShortcutfull} (${year})`;

    // Update the output field
    outputField.textContent = outputString;
});