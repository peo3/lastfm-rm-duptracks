// ==UserScript==
// @name          lastfm_rm_duptracks
// @namespace     http://github.com/peo3/
// @description	  Last.fm: remove duplicated listened tracks
// @include       http://www.last.fm/user/*/tracks*
// ==/UserScript==

(function () {
var xpath='//table[@id="deletablert"]';
var table = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var dups = new Array();

function collect_duplicated_tracks() {
    var prevdate = null;
    var len = table.rows.length;

    for(var i=0; i < len-1; i++) {
        var row = table.rows.item(i);
        if (row == null) {continue;}
        var cell = row.cells.item(4);
        var curdate = cell.childNodes[1].title;

        if (curdate == prevdate) {
            var dup = row.cells.item(5).childNodes[1];
            //console.log(curdate+dup.title);
            dups.push(dup);
        }
        prevdate = curdate;
    }
}

collect_duplicated_tracks();


var i = 0;
var num = dups.length;
var e = document.createEvent('MouseEvents');
e.initEvent('click', true, false);

function delete_one() {
    if (dups[i]) {
        // == dups[i].onclick();
        dups[i].dispatchEvent(e);
    }
    if (i < num) {
        i++;
        window.setTimeout(delete_one, 5000);
    } else {
        console.log('finished, then reloading the page...');
        location.href = location;
    }
}

console.log(num);
if (num > 0) {
    window.setTimeout(delete_one, 3000);
} else {
    alert('No duplicated track.');
}
}) ();
