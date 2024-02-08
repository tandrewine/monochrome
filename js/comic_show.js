writeNav(true); //show navigation for comic pages. to toggle either images or text for nav, set this to true or false.

writeBookmark(".writeBookmark");

writePageTitle(".writePageTitle", false, " - "); //write title of page. true/false

writePageClickable(".writePageClickable", false); //show the current page. to toggle whether pages can be clicked to move to the next one, set this to true or false.

writeCommentary(".writeCommentary");

shakeText('shake');

keyNav();

// BOOKMARKS

function updateBookmark() {
    if (!!$.cookie(`${pg}`)) {
        return $(".bookmark").prop("checked", true);
    } else {
        return $(".bookmark").prop("checked", false);
    }
}

function toggleBookmark() {
    if ($(".bookmark").is(":checked")) {
        $.cookie(`${pg}`, true, {expires: 20*365});
    } else {
        $.removeCookie(`${pg}`);
    }
    return updateBookmark();
}

updateBookmark();

function writeBookmark(div) {
    return document.querySelector(div).innerHTML = `<div align="right"><input class="bookmark" type="checkbox" onclick="toggleBookmark()"/></div>`;
}

//SHOW COMIC PAGE, with clickable link
function writePageClickable(div,clickable) {
    if (!clickable) {
        document.querySelector(div).innerHTML = `<div class="comicPage">${writePage()}</div>`; //display comic page without link
    } else if (pg < maxpg) {
        //check whether comic is on the last page
        document.querySelector(div).innerHTML = `<div class="comicPage"><a href="?pg=${pg + 1}"/>${writePage()}</a></div>`; //display comic page and make it so that clicking it will lead you to the next page
    } else {
        document.querySelector(div).innerHTML = `<div class="comicPage">${writePage()}</div>`; //display comic page without link
    }
}

function writePageTitle(div,toggleNum, char) {
  if (pgData.length >= pg) {
    //display title of current page
    document.querySelector(div).innerHTML = `<h2>${pgData[pg - 1].title}</h2>`;
    if (toggleNum) {
        //toggle whether you want to display the page number
        document.querySelector(div).innerHTML = `<h1>${pgData[pg - 1].pgNum + char + pgData[pg - 1].title}</h1>`; //char denotes a separating character between the number and the title
    }
  }
}

//function used to split pages into multiple images if needed, and add alt text
function writePage() {
  return pgData[pg-1].content;
}

function imgOrText(setImg,navTextSet) { //function that writes the indicated nav button as either an image or text

  if (setImg) { //if its an image
    return `<img draggable="false" src="` + navFolder + `/nav_` + navText[navTextSet].toLowerCase() + `.` + navExt + `" alt="` + navText[navTextSet] + `" />`;
  } else {
    return navText[navTextSet];
  }
}

// NAVIGATION

function writeNav(imageToggle) {
    let writeNavDiv = document.querySelectorAll(".writeNav");
    writeNavDiv.forEach(function(element) {
      element.innerHTML = `<div class="comicNav">
        ${firstButton()}
        ${divider()}
        ${prevButton()}
        ${divider()}
        ${nextButton()}
        ${divider()}
        ${lastButton()}
        </div>
        `;})

    function firstButton() {
        //FIRST BUTTON
        if (pg > 1) {
            //wait until page 2 to make button active
            return `<a href="./?pg=` + 1 + navScrollTo + `"/>` + imgOrText(imageToggle, 0) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 0);
            } else {
                return ``;
            }
        }
    }

    function divider() {
        //divider
        if (!imageToggle) {
            return ` | `;
        }
        return ``;
    }

    function prevButton() {
        //PREV BUTTON
        if (pg > 1) {
            //wait until page 2 to make button active
            return `<a href="./?pg=` + (pg - 1) + navScrollTo + `"/>` + imgOrText(imageToggle, 1) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 1);
            } else {
                return ``;
            }
        }
    }

    function nextButton() {
        //NEXT BUTTON
        if (pg < maxpg) {
            //only make active if not on the last page
            return `<a href="./?pg=` + (pg + 1) + navScrollTo + `"/>` + imgOrText(imageToggle, 2) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 2);
            } else {
                return ``;
            }
        }
    }

    function lastButton() {
        //LAST BUTTON
        if (pg < maxpg) {
            //only make active if not on last page
            return `<a href="./?pg=` + maxpg + navScrollTo + `"/>` + imgOrText(imageToggle, 3) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 3);
            } else {
                return ``;
            }
        }
    }
}

function writeCommentary(p) {
    if (pgData.length >= pg) {
        return document.querySelector(p).innerHTML = `${pgData[pg-1].authorNotes}`;
    }
}

//KEYBOARD NAVIGATION
function keyNav() {
  document.addEventListener("keydown", (e) => {
  if ((e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') && pg < maxpg) { //right arrow or D goes to next page
    window.location.href = "./?pg=" + (pg + 1) + navScrollTo;
  } else if ((e.key == "ArrowLeft" || e.key.toLowerCase() == "a") && pg > 1) { //left arrow or A goes to previous page
    window.location.href = "./?pg=" + (pg - 1) + navScrollTo;
  } else if (e.key.toLowerCase() == "w") { //W scrolls up
    window.scrollBy({ top: -30 });
  } else if (e.key.toLowerCase() == "s") { //S scrolls down
    window.scrollBy({ top: 30 });
  }
});};
