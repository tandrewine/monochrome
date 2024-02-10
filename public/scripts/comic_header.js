//the header of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeHeader"
document.querySelector(".writeHeader").innerHTML = `
    <header align="center">
        <a href="/"><img src="/logo.png"/></a> 

        <div id="nav">
            <a href="/">HOME</a>
            <a href="/pages/map.html">MAP</a>
            <a href="/pages/archive.html">ARCHIVE</a>
            <a target="_blank" href="https://discord.gg/tTfQbEp">DISCORD</a>
            <a href="/pages/credits.html">CREDITS</a>
        </div>
    </header>
`;