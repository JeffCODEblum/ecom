var URL = $("#url-div").data("url");
$( document ).ready(function() {
    console.log("foo");
    $("#save-btn").click(function(e) {
        e.preventDefault();
        var title = $("#title-input").val();
        var description = $("#description-input").val();
        var originalPrice = $("#original-price-input").val();
        var price = $("price-input").val();
        var payload = {};
        payload.title = title;
        payload.description = description;
        payload.originalPrice = originalPrice;
        payload.price = price;

        var url = URL + '/save-post';
        console.log(payload);
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(payload),
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            console.log(data);
            $.ajax({
                type: 'GET',
                url: URL + '/admin',
                contentType: 'html',
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();
                window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
            });
        });
    });

    $("#cancel-btn").click(function(e) {
        e.preventDefault();
        $("#post-form").hide(); $.ajax({
            type: 'GET',
            url: URL + '/admin',
            contentType: 'html',
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            var newDoc = document.open("text/html", "replace");
            newDoc.write(data);
            newDoc.close();
            window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
        });
    });
});