var headerEl = document.querySelector('.header');
var preFix = `https://spreadsheets.google.com/feeds/list/`;
var sheetID = `1eGaFYfqvsWLKqLN-qZizKHEavs9Igg8QbCNM5gscVnk`;
var postFix = `/od6/public/values?alt=json`;
var data;
var spreadsheet = preFix + sheetID + postFix;

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)

            setTimeout(function () {
                var d = JSON.parse(xmlHttp.responseText);
                $('.number').html(d.feed.entry.length)
                var amount = 0;
                $('#title').html(d.feed.title.$t)
                $('#goal').html(d.feed.entry[0].gsx$goal.$t)
                $('#date').html(d.feed.entry[1].gsx$goal.$t)
                $('#info').html(d.feed.entry[0].gsx$info.$t)
                
                console.log(d)

                for (i = 0; i < d.feed.entry.length; i++) {

                    var company = d.feed.entry[i].gsx$company.$t
                    var donation = d.feed.entry[i].gsx$donation.$t
                    var location = d.feed.entry[i].gsx$location.$t
                    var org = d.feed.entry[i].gsx$org.$t
                    var row = '<tr><td>' + company + '</td>' +
                        '<td class="tableMobile">' + location + '</td>' +
                        '<td>' + org + '</td></tr>'

                    $('#table > tbody:last-child').append(row);
                }

                var total = d.feed.entry[0].gsx$total.$t

                $('.amount').html(total)

                var buttonNumber = parseInt(d.feed.entry[0].gsx$number.$t)



                for (i = 0; i < buttonNumber; i++) {
                    var buttonHTML = "<a href='" + d.feed.entry[i].gsx$name.$t + "' target=blank_>↳ " + d.feed.entry[i].gsx$buttons.$t + "</a>"
                    $("#links").append(buttonHTML);
                }





                $("table")
                    .tablesorter()
                    .bind("sortStart", function () {
                        var hasRowspans = false;

                        $("[rowspan]", this).each(function () {
                            hasRowspans = true;

                            var rowspan = parseInt($(this).attr("rowspan"));

                            // remove the rowspan attribute
                            $(this).removeAttr("rowspan");

                            var trIndex = $(this)
                                .parentsUntil("table")
                                .children("tr")
                                .index($(this).parent());

                            var tdIndex = $(this)
                                .parent()
                                .children("td")
                                .index(this);

                            // traverse each row, and repopulate / reclone the values for rows with rowspan
                            for (var tr = trIndex + 1; tr < trIndex + rowspan; ++tr) {
                                var $row = $(this)
                                    .parentsUntil("table")
                                    .children("tr")
                                    .eq(tr);

                                if (tdIndex == 0) $row.prepend($(this).clone());
                                else
                                    $row
                                    .children("td")
                                    .eq(tdIndex - 1)
                                    .after($(this).clone());
                            }
                        });

                        if (hasRowspans) $(this).trigger("update");
                    });

            }, 200)


        setTimeout(function () {
            $('#container').fadeIn();
        }, 1000)


    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync(spreadsheet, data => console.log(JSON.parse(data)))



$(window).scroll(function () {
    if ($(this).scrollTop() > 1) { // this refers to window
        $('nav').css('bottom', '0')
    } else {
        $('nav').css('bottom', '-200px')
    }
});
