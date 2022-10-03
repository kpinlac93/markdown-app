const markdownEditor = document.querySelector(".markdown textarea");
const previewText = document.querySelector(".preview");


function handlePreviewUpdate() {
    attr = "p";
    content = markdownEditor.value.replace(/\n/g, "<br>");
    previewText.innerHTML = `<${attr}>${content}<${attr}>`
}

markdownEditor.addEventListener("input", handlePreviewUpdate2);
handlePreviewUpdate2()


function handlePreviewUpdate2() {
    previewText.innerHTML = "";
    content = markdownEditor.value;
    content = content.split("\n");
    content.slice(0,-1);
    codeBlock = false;
    codeBlockContent = "";
    codeBlockAmt = 0;
    indentLine = false
    content.forEach(element => {
        attr = "p";


        // Check for indent
        if (element[0] == " " && element[1] == " ") {
            indentLine = true;
        }




        // Code block
        if (codeBlockAmt > 1 && element[0] == "`" && element[1] == "`" && element[2] == "`") {
            codeBlock = false;
            codeBlockAmt = 0;
            return;
        }
        if (element[0] == "`" && element[1] == "`" && element[2] == "`" && codeBlock == false) {
            previewText.innerHTML += `<div class="codeblock">${codeBlockContent}`;
            codeBlock = true;
            codeBlockAmt = 0;
            return
        }
        if (codeBlock == true) {
            blockElement = document.createElement("p");
            if (indentLine == true) {
                blockElement.classList.add("indent");
                indentLine = false;
            }
            blockElement.classList.add("code-text");
            text = document.createTextNode(`${element}`);
            blockElement.appendChild(text);
            lastElement = document.querySelectorAll(".codeblock").length-1;
            document.querySelectorAll(".codeblock")[lastElement].appendChild(blockElement);
            codeBlockAmt += 1;
            return
        }







        // Headers
        if (element[0] == "#" && element[5] == "#") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "h6";
            blockElement = document.createElement(attr);
            text = document.createTextNode(`${element.slice(6)}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        } else if (element[0] == "#" && element[4] == "#") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "h5";
            blockElement = document.createElement(attr);
            text = document.createTextNode(`${element.slice(5)}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        } else if (element[0] == "#" && element[3] == "#") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "h4";
            blockElement = document.createElement(attr);
            text = document.createTextNode(`${element.slice(4)}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        } else if (element[0] == "#" && element[2] == "#") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "h3";
            blockElement = document.createElement(attr);
            text = document.createTextNode(`${element.slice(3)}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        } else if (element[0] == "#" && element[1] == "#") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "h2";
            blockElement = document.createElement(attr);
            text = document.createTextNode(`${element.slice(2)}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        } else if (element[0] == "#") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "h1";
            blockElement = document.createElement(attr);
            text = document.createTextNode(`${element.slice(1)}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        } 
        
        
        
        
        // Lists
        else if (element[1] == ".") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "p";
            previewText.innerHTML += `<${attr} class="indent">${element}</${attr}>`
            return
        } else if (element[0] == "-") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "p";
            previewText.innerHTML += `<${attr} class="indent">${element}</${attr}>`
            return
        } 
        
        
        
        // Blockquote
        else if (element[0] == ">") {
            if (indentLine == true) {
                indentLine = false
            }
            attr = "p";
            previewText.innerHTML += `<${attr} class="blockquote">${element.slice(1)}</${attr}>`
            return
        }





        // Default
        else {
            blockElement = document.createElement(attr);
            if (indentLine == true) {
                indentLine = false
                blockElement.classList.add("indent")
            }
            text = document.createTextNode(`${element}`);
            blockElement.appendChild(text);
            document.querySelector(".preview").appendChild(blockElement);
            return
        }

    });
}