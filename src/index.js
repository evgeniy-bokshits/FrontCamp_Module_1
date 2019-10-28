import getPost from './message';
import './index.scss';


const listNews = document.createElement('div');
listNews.setAttribute("id", "list-news");
document.body.prepend(listNews);

getPost().then(value => {
    let articles = value.articles;
    var listDiv = document.getElementById('list-news');
    var ul=document.createElement('ul');
    articles.forEach(obj => {
        var li=document.createElement('li');
        li.innerHTML = obj.title;
        ul.appendChild(li); 
    });
    listDiv.appendChild(ul);

    // for (var i = 0; i < articles.length; ++i) {
    //     var li=document.createElement('li');
    //     li.innerHTML = articles[title];   // Use innerHTML to set the text
    //     ul.appendChild(li);                                 
    // }
    // listDiv.appendChild(ul);    // Note here
});

document.body.prepend(listNews);

