
const generateHTML = () => {
    return `<div id = "principal">
                <h1> No puedes entrar lo siento ve a estudiar </h1>
            </div>`
}

const generateStyle = () => {
    return `body {
                background : white;
            }
            .principal {
                align-items: center;
                justify-content: center;
                display: flex;
                color : black ;
                font-family: Arial, Helvetica, sans-serif;
            }`
}
switch (window.location.hostname){
    case "www.youtube.com":
        document.body.innerHTML = generateHTML();
        document.head.innerHTML = generateStyle();
        break;
    case "www.facebook.com":
        document.body.innerHTML = generateHTML();
        document.head.innerHTML = generateStyle();
        break;
    case "www.instagram.com":
        document.body.innerHTML = generateHTML();
        document.head.innerHTML = generateStyle();
        break;
    
    
    
        
}