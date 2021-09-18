$(document).ready(function () {

    var person_id = $("#person_id").val();

    if (person_id > -1)
    {
        $("#staff_form input, textarea, select").prop("disabled", true);
        $("#btn-save").hide();

        $("#btn-edit").click(function () {
            $("#btn-save").show();
            $(this).hide();
            $("#staff_form input, textarea, select").prop("disabled", false);
        });

    }else{

        $("#btn-edit").hide();

    }

    init_profile_uploader();

    init_attachment_uploader();

});

function init_profile_uploader()
{
    // Uploader scripts
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'pickfiles', // you can pass in id...
        container: document.getElementById('container'), // ... or DOM Element itself
        url: $("#site_url").val() + '/staff/upload_profile_pic',
        unique_names: true,
        resize: {width: 500, height: 500, quality: 100},
        max_retries: 3,
        flash_swf_url: 'Moxie.swf',
        silverlight_xap_url: 'Moxie.xap',
        multipart_params: {
            user_id: $("#pickfiles").data("person-id"),
            softtoken: $("#token_hash").val()
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [
                {title: "Image files", extensions: "jpg,gif,png"},
                {title: "Zip files", extensions: "zip"}
            ]
        },
        init: {
            PostInit: function () {
                document.getElementById('filelist').innerHTML = '';
            },
            FilesAdded: function (up, files) {
                $(".progress").hide();
                $(".progress-bar").width(0);
                up.start();
            },
            UploadProgress: function (up, file) {
                $(".progress").show();
                $(".progress-bar").width(file.percent);
            },
            UploadComplete: function (up, files) {
                plupload.each(files, function (file) {
                    var src = BASE_URL + "/uploads/profile-" + $("#pickfiles").data("person-id") + "/" + file.target_name;
                    $("#img-pic").attr("src", src);
                });
            },
            Error: function (up, err) {
                document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
            }
        }
    });

    uploader.init();
}

function init_attachment_uploader()
{
    // Uploader scripts
    var uploader_a = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'pickfiles_a', // you can pass in id...
        container: document.getElementById('container_a'), // ... or DOM Element itself
        url: $("#site_url").val() + 'people/upload_attachment',
        unique_names: true,
        resize: {width: 500, height: 500, quality: 100},
        max_retries: 3,
        flash_swf_url: 'Moxie.swf',
        silverlight_xap_url: 'Moxie.xap',
        multipart_params: {
            member_id: $("#pickfiles_a").data("member-id"),
            softtoken: $("#token_hash").val(),
            linker: $("#linker").val()
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [
                {title: "All files", extensions: "jpg,gif,png,xls,xlsx,csv,doc,docx,pdf"},
            ]
        },
        init: {
            FilesAdded: function (up, files) {
                $(".progress").hide();
                $(".progress-bar").width(0);
                up.start();
            },
            UploadProgress: function (up, file) {
                $(".progress").show();
                $(".progress-bar").width(file.percent);
            },
            Error: function (up, err) {
                console.log("\nError #" + err.code + ": " + err.message);
            }
        }
    });

    uploader_a.bind('FileUploaded', function (upldr, file, object) {
        var myData;
        try {
            myData = eval(object.response);
        } catch (err) {
            myData = eval('(' + object.response + ')');
        }

        $("#filelist_a").append("<li><a href=\"uploads/member-" + myData.member_id + "/" + myData.filename + "\" target=\"_blank\" title=\"" + myData.filename + "\"><img src=\"" + myData.icon + "\" /></a><span class=\"close remove-file\" data-file-id=\"" + myData.id + "\" title=\"Remove this file\"><i class=\"fe fe-times-circle\"></i></span></li>");
    });

    uploader_a.init();
}


