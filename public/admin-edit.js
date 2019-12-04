var URL = $("#url-div").data("url");
$( document ).ready(function() {
    $("#upload-btn").click(function(e) {
        e.preventDefault();
        var file = $("#file-input")[0].files[0];
        var fr = new FileReader();
        var id = $("#file-input").data("id");
        fr.onload = function() {
            var payload = {};
            payload.file = fr.result;
            payload.id = id;
            console.log("payload", payload);
            $.ajax({
                type: 'POST',
                url: URL + '/upload-image',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(payload),
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                console.log('done');
                $.ajax({
                    type: 'GET',
                    url: URL + '/admin/' + id,
                    contentType: 'html',
                    beforeSend: function (xhr) { 
                        xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                    }
                }).done(function(data) {
                    var newDoc = document.open("text/html", "replace");
                    newDoc.write(data);
                    newDoc.close();
                    window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin/" + id);
                });
            });
        }; 
        fr.readAsDataURL(file);
    });

    $(".shift-img-btn").click(function(e) {
        e.preventDefault();
        var id = $("#id-div").data('id');
        var file = $(e.target).data('url').replace('.png', '').replace('/uploads/', '');
        $.ajax({
            type: 'POST',
            url: URL + '/shift-image/' + id + '/' + file,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            $.ajax({
                type: 'GET',
                url: URL + '/admin/' + id,
                contentType: 'html',
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();
                window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin/" + id);
            });
        }).fail(function(e) {
            console.log(e);
        });
    });

    $(".delete-img-btn").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this image?")) {
            var file = $(e.target).data('url').replace('/uploads/', '').replace('.png', '');
            var id = $('#id-div').data('id');
            $.ajax({
                type: 'DELETE',
                url: URL + '/delete-image/' + id + '/' + file ,
                contentType: 'application/json; charset=utf-8',
                beforeSend: function (xhr) {  
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                $.ajax({
                    type: 'GET',
                    url: URL + '/admin/' + id,
                    contentType: 'html',
                    beforeSend: function (xhr) { 
                        xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                    }
                }).done(function(data) {
                    var newDoc = document.open("text/html", "replace");
                    newDoc.write(data);
                    newDoc.close();
                    window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin/" + id);
                });
            }).fail(function(e) {
                console.log(e);
            });
        }
    });

    $("#save-btn").click(function(e) {
        e.preventDefault();
        var title = $("#title-input").val();
        var description = $("#description-input").val();
        var originalPrice = $("#original-price-input").val();
        var price = $("#price-input").val();
        var payload = {};
        payload.title = title;
        payload.description = description;
        payload.originalPrice = originalPrice;
        payload.price = price;

        var url = URL + '/save-post';
        var id = $("#id-div").data('id');   
        $.ajax({
            type: 'POST',
            url: url + '/' + id,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(payload),
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
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

    $(".hide-comment-btn").click(function(e) {
        e.preventDefault();
        var id = $(e.target).data("id");

        $.ajax({
            type: 'POST',
            url: URL + '/hide-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
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
        }).fail(function(e) {
            console.log(e);
        });
    });

    $(".show-comment-btn").click(function(e) {
        e.preventDefault();
        var id = $(e.target).data("id");

        $.ajax({
            type: 'POST',
            url: URL + '/show-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
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
        }).fail(function(e) {
            console.log(e);
        });
    });

    $(".delete-comment-btn").click(function(e) {
        e.preventDefault();
        var id = $(e.target).data("id");

        $.ajax({
            type: 'DELETE',
            url: URL + '/delete-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
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
        }).fail(function(e) {
            console.log(e);
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