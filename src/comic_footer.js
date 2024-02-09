//the footer of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeFooter"
document.querySelector(".writeFooter").innerHTML = `
    <footer align="center">
        <p>comic by <a href="https://twitter.com/100goatz">mango</a></p>
        <input type="checkbox" class="commentaryButton" onclick="toggleCommentary()"><label for="commentaryButton">enable commentary</label>
        <p>bookmarks use cookies</p>
        <a target="_blank" href="https://rarebit.neocities.org"><img src="/rarebitlogo_small.png" height = "30" /></a>
    </footer>
`;