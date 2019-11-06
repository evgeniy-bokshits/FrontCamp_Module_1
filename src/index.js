import newsApiServiceFactory from '@services/newsApiServiceFactory';
import './css/index.scss';

renderMainContent();
runCall();

function renderMainContent(){
    const content = 
    `<div id="colorlib-main">
        <section class="ftco-section">
            <div class="container" id="containerID">
                ${setupSource(['ru','ua','us'])}
            </div>
            <div class="row px-md-4" id="list-news">
            </div>
        </section>
    </div>`;
    document.body.innerHTML = content;
    document.getElementById('source').addEventListener("change", runCall);
}

function runCall(){
    const newsService = new newsApiServiceFactory();
    newsService.createService('GET').getTopNewsForCountry(document.getElementById('source').value).then(value => {
        generateNewsList(value.articles);
    });
}

function setupSource(countries) {
    let options = ``;
    countries.forEach(obj => {
        options = options +
        `<option value=${obj}>${obj}</option>`;
    });
    const selection = 
    `<select class="browser-default custom-select" id="source">
        ${options}
    </select>
    `;
    return selection;
};

function generateNewsList(articles) {
    let listDiv = document.getElementById('list-news');
    listDiv.innerHTML = "";
    articles.forEach(obj => {
        const listNews = 
        `<div class="col-md-12">
            <div class="blog-entry">${generateNewsItem(obj.title, obj.url, obj.publishedAt, obj.author, obj.description, obj.urlToImage)}</div>
        </div>`;
        listDiv.innerHTML = listDiv.innerHTML + listNews;
    });
}

function generateNewsItem(title, url, publishedAt, author, description, imgUrl) {
    const columnContentContainer = 
    `<a class="img img-2" style="background-image: url('${imgUrl}');"></a>
    <div class="text text-2 pl-md-4">
        <h3 class="mb-2">
            <a href=${url}>${title}</a>
        </h3>
        <div class="meta-wrap">
            <p class="meta">
                <span>
                    <i class="icon-calendar mr-2">${publishedAt + " by " + author}</i>
                </span>
            </p>
        </div>
        <p class="mb-4">${description}</p>
        <a href=${url}>
            "Read More"
            <span class="ion-ios-arrow-forward"></span>
        </a>
    </div>`;
    return columnContentContainer;
}