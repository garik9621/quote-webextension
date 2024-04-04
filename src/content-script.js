const cssURL = chrome.runtime.getURL('content-script.css');

const body = document.querySelector('body');

const requestQuote = async () => {
    try {
        const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json');

        return response.json();
    } catch (e) {
        console.log(e);
    }
}

const showQuote = async () => {
    const {
        quoteAuthor,
        quoteText
    } = await requestQuote();

    const root = document.createElement('div');

    const shadowRoot = root.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssURL}" />`

    const quoteElement = document.createElement('blockquote');
    quoteElement.innerText = quoteText;

    shadowRoot.append(quoteElement)

    body?.append(root);

    setTimeout(() => root.remove(), 5000);
}

setInterval(showQuote, 10000);