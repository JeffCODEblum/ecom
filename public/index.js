$( document ).ready(function() {
    var stars = 5;
    var URL = $("#url-div").data("url");
    console.log($("#url-div"));
    console.log("url", URL);
    $(".nav-link").click(function(e) {

    });

    $(".img-thmb").click(function(e) {
        $(".main-img").attr("src", URL + "/" + $(e.target).data("src"));
    });

    $("#comment-btn").click(function(e) {
        console.log("comment btn clicked");
        var name = $("#name-input").val();
        var email = $("#email-input").val();
        var comment = $("#comment-input").val();
        var id = $("#id-div").data("id");

        if (!(name && email && comment && id)) {
            return;
        }
        var payload = {
            name: name,
            email: email,
            stars: stars,
            comment: comment
        };

        $.ajax({
            type: 'POST',
            url: URL + '/post-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            },
            data: JSON.stringify(payload)
        }).done(function(data) {
            $('#review-form-div').hide();
            $('#review-success-div').show();
        });
    });

    $(".star-btn").click(function(e) {
        e.preventDefault();
        var index = $(e.target).data('index');
        console.log("index", index);
        stars = index;
        for (var i = 1; i < 6; i++) {
            $("#star-btn-" + i).removeClass("checked");
        }
        for (var i = 1; i <= index; i++) {
            $("#star-btn-" + i).addClass("checked");
        }
    });
    
    $("#leave-review-btn").click(function(e) {
        e.preventDefault();
        $("#leave-review-div").hide();
        $("#review-form-div").show();
    });
});

