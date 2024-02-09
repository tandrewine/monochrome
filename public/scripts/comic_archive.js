writeArchive("stage1", 1, 120);

writeArchive("stage2", 121, 352);

writeArchive("prelude2", 353, 625);

writeArchive("stage3", 626, maxpg);

function isBookmarked(page) {
    if (!!$.cookie(`${page}`)) {
        return true;
    } else { 
        return false;
    }
}

function writeArchive(divClass, min, max, reverseOrder=-1, useThumbs=false,useNums=false) {
    let archiveTable = document.createElement("TABLE");
    archiveTable.setAttribute("class", "archiveTable");
    let getDiv = document.getElementsByClassName(divClass)[0];
    getDiv.appendChild(archiveTable);
    for (i = min; i <= max; i++) {
        let row = archiveTable.insertRow(reverseOrder);

        let cellBookmark = row.insertCell();
        let cellThumb = useThumbs ? row.insertCell() : 0;
        let cellNum = useNums ? row.insertCell() : 0;

        let cellTitle = row.insertCell();
        let cellDate = row.insertCell();

        let pgTitle = "Page " + i;
        let pgDate = "";
        let pgNum = "";

        let pgThumb = thumbFolder + "/" + image + i + "." + thumbExt;
        let pgThumbDefault = thumbFolder + "/" + thumbDefault + "." + thumbExt;

        if (pgData.length >= i) {
            if (pgData[i - 1].title) {
                pgTitle = pgData[i - 1].title;
            }
            if (pgData[i - 1].date) {
                pgDate = pgData[i - 1].date;
            }
            if (pgData[i - 1].date) {
                pgDate = pgData[i - 1].date;
            }
        }

        if (isBookmarked(i)) {
            row.setAttribute("class", "bookmarkedRow");
        } else {
            row.setAttribute("class", `archiveRow`);
        }

        let linkToComic = `./?pg=${i + navScrollTo}`;

        row.addEventListener("click", () => {
            window.location.href = linkToComic;
        });

        if (isBookmarked(i)) {
            cellBookmark.innerHTML = `<img src="/comicnav/bookmark_on.png" width=20px>`;
            cellBookmark.setAttribute("class", "archiveCellBookmark");
        }

        if (useThumbs) {
            cellThumb.innerHTML = `<img alt="${pgTitle}" title="${pgTitle}" src="${pgThumb}" onerror="javascript:this.src='${pgThumbDefault}'"/>`;
            cellThumb.setAttribute("class", "archiveCellThumb");
        }

        if (useNums) {
            cellNum.innerHTML = `<span><strong>${pgNum}</strong></span>`;
            cellNum.setAttribute("class", "archiveCellNum");
        }

        cellTitle.innerHTML = `<span><strong>${pgTitle}</strong></span>`;
        cellTitle.setAttribute("class", "archiveCellTitle");
        cellDate.innerHTML = "<span> " + pgDate + " </span>";
        cellDate.setAttribute("class", "archiveCellDate");

        cellTitle.className += " leftAlignTableText";
    }
}