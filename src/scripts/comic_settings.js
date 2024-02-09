// comic_settings.js created by geno7, w/ help from Dannarchy

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

// COMIC PAGE SETTINGS
const image = "pg"; //what you'll name all your comic pages

//THUMBNAIL SETTINGS
const thumbFolder = "/comics" //directory of the folder where you keep all the thumbnail images for the comics, in case you want the archive page to use thumbnails.
const thumbExt = "png" //file extension of thumbnails
const thumbDefault = "default" //name of the default thumbnail that displays when no thumbnail is set, located in the directory you set thumbFolder to.

//NAVIGATION SETTINGS
const navText = ["First","Previous","Next","Last"]; //alt text for your nav images, or just the text that shows up if you're not using images
const navFolder = "/comicnav"; //directory where nav images are stored
const navExt = "png" //file extension of nav images
const navScrollTo = "#comic"; //id of the div you want the page to automatically scroll to when you click to the next comic. will turn off if you delete text between quotation marks

if (pg == 0) {pg = 1;}

if (!$(".subPage")) {
    document.querySelector("html").classList.add(`p${pg}`);

    $.ajax({
        url: "./src/styles/comic.css",
        dataType: "text",
        success: function(cssText) {
            registerPageRanges(cssText);
        }
    });

    function registerPageRanges (cssString) {
        var findPageRanges = /\.p(\d+-(?:\d+)?)/g;
        var pageRangeMatch;
        while (pageRangeMatch = findPageRanges.exec(cssString)) {
            var pageRange = pageRangeMatch[1].split("-");
            pageRange[0] = parseInt(pageRange[0]);
            pageRange[1] = parseInt(pageRange[1]) || maxpg;
            if (pg >= pageRange[0] && pg <= pageRange[1]) {
                document.querySelector("html").classList.add("p" + pageRangeMatch[1]);
            }
        }
    }

    const shakeText = (a) => {
        let shakeElements = document.querySelectorAll(a);

        for (let i = 0; i < shakeElements.length; i++) {
            let text = shakeElements[i].textContent;
            shakeElements[i].textContent = '';
            for (let char of text) {
                if (char === ' ') char = ' ';
                let newSpan = document.createElement('span');
                newSpan.className = a;
                newSpan.textContent = char;
                shakeElements[i].appendChild(newSpan);
            }
        }
    }

    const generateDistance = (intensity) => {
        if (isNaN(intensity)) intensity = 3;
        return Math.floor(Math.random()*intensity-intensity/2)*0.5;
    }
    setInterval(() => {
        document.querySelectorAll('.shake').forEach(elm => {
            let intense = elm.parentNode.getAttribute('intensity');
            elm.style = `transform: translate(${generateDistance(parseInt(intense))}px, ${generateDistance(parseInt(intense))}px);`
        });
    }, 35);
}

//below is a function you dont rly need to mess with but if you're more experienced with js you can

function findGetParameter(parameterName) { //function used to write a parameter to append to the url, to give each comic page its own unique url
    let result = null,
    tmp = []; 
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function writeDate(year,month,day) { //write date of comic page
    const date = new Date(year,month-1,day)
    .toDateString() //format date as Day Month Date Year
    .toString() //convert it to a string
    .slice(4) //remove the Day
    return date
}

// COMMENTARY

function updateCommentary() {
    if (!!$.cookie("commentary")) {
        $(".commentaryButton").prop("checked", true);
        return document.querySelector(".writeCommentary").innerHTML = `<div class=spoilers><p class=commentary></p></div>`;
    } else {
        $(".commentaryButton").prop("checked", false);
        return document.querySelector(".writeCommentary").innerHTML = '';
    }
}

function toggleCommentary() {
    if ($(".commentaryButton").is(":checked")) {
        $.cookie("commentary", true, {expires: 20*365});
    } else {
        $.removeCookie("commentary");
    }
    updateCommentary();
}

updateCommentary();