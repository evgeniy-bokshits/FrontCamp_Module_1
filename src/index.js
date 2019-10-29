import getPost from './message';
import './index.scss';

init()
runCall();

function init(){
    const main = document.createElement('div');
    main.setAttribute("id", "colorlib-main");
    const section = document.createElement('section');
    section.setAttribute("class", "ftco-section");
    const container = document.createElement('div');
    container.setAttribute("class", "container");
    container.setAttribute("id", "containerID");
    setupSource(container,['ru','ua','us']);
    const column = document.createElement('div');
    column.setAttribute("class", "row px-md-4");
    column.setAttribute("id", "list-news");
    container.appendChild(column);
    section.appendChild(container);
    main.appendChild(section);
    document.body.prepend(main);
}

function runCall(){
    getPost(document.getElementById('source').value).then(value => {
        let articles = value.articles;
        let listDiv = document.getElementById('list-news');
        listDiv.innerHTML = "";
        articles.forEach(obj => {
            const listNews = document.createElement('div');
            listNews.setAttribute("class", "col-md-12");
            const columnContent = document.createElement('div');
            columnContent.setAttribute("class", "blog-entry");
            listNews.appendChild(columnContent);
            setupImage(columnContent, obj.urlToImage);
            setupTextContent(columnContent, obj.title, obj.url, obj.publishedAt, obj.author, obj.description)
            listDiv.appendChild(listNews);
        });
    });
}


function setupSource(parent, countries) {
    let selection=document.createElement('select');
    selection.setAttribute("class", "browser-default custom-select");
    selection.setAttribute("id", "source");
    
    countries.forEach(obj => {
        let option=document.createElement('option');
        option.value = option.innerText = obj;
        selection.appendChild(option);
    });
    selection.addEventListener("change", runCall);
    parent.appendChild(selection);
    
};

// temp for count
function setupCount(parent) {
    let selection=document.createElement('input');
    selection.setAttribute("type", "number");
    selection.setAttribute("id", "numberCount");
    selection.value = 4;
    selection.addEventListener("change", runCall);
    parent.appendChild(selection);
    
};

function setupImage(parent, url) {
    var image=document.createElement('a');
    image.href = url;
    image.setAttribute("class", "img img-2");
    image.setAttribute("style", "background-image: url(" + url + ");");
    parent.appendChild(image);
};

function setupTextContent(parent, title, url, publishedAt, author, description) {
    const columnContentContainer = document.createElement('div');
    columnContentContainer.setAttribute("class", "text text-2 pl-md-4");
    const columnContentContainerTitle = document.createElement('h3');
    columnContentContainerTitle.setAttribute("class", "mb-2");
    const columnContentContainerTitleValue = document.createElement('a');
    const columnContentContainerWrap = document.createElement('div');
    columnContentContainerWrap.setAttribute("class", "meta-wrap");
    const columnContentContainerDescription = document.createElement('p');
    columnContentContainerDescription.setAttribute("class", "mb-4");
    const columnContentContainerReadMore = document.createElement('p');
    const readMore=document.createElement('a');
    readMore.innerText = "Read More";
    const spanReadmore =document.createElement('span');
    spanReadmore.setAttribute("class", "ion-ios-arrow-forward");
    readMore.href = url;
    columnContentContainerReadMore.appendChild(readMore);
    readMore.appendChild(spanReadmore);
    columnContentContainerDescription.innerText = description;
    const columnContentContainerWrapText = document.createElement('p');
    columnContentContainerWrapText.setAttribute("class", "meta");
    columnContentContainerWrap.appendChild(columnContentContainerWrapText);
    const columnContentContainerWrapTextSpan = document.createElement('span');
    columnContentContainerWrapText.appendChild(columnContentContainerWrapTextSpan);
    const columnContentContainerWrapTextSpanI = document.createElement('i');
    columnContentContainerWrapTextSpanI.setAttribute("class", "icon-calendar mr-2");
    columnContentContainerWrapTextSpanI.innerText = publishedAt + " by " + author;
    columnContentContainerWrapTextSpan.appendChild(columnContentContainerWrapTextSpanI);
    columnContentContainerTitleValue.href = url;
    columnContentContainerTitleValue.innerText = title;
    columnContentContainer.appendChild(columnContentContainerTitle);
    columnContentContainer.appendChild(columnContentContainerWrap);
    columnContentContainer.appendChild(columnContentContainerDescription);
    columnContentContainer.appendChild(readMore);
    columnContentContainerTitle.appendChild(columnContentContainerTitleValue);
    parent.appendChild(columnContentContainer);
};
