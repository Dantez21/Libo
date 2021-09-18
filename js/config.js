$(document).ready(function () {

    // Uploader scripts
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'browsefile', // you can pass in id...
        container: document.getElementById('container'), // ... or DOM Element itself
        url: $("#site_url").val() + '/config/upload',
        unique_names: true,
        resize: {width: 500, height: 500, quality: 100, crop: true},
        max_retries: 3,
        flash_swf_url: 'Moxie.swf',
        silverlight_xap_url: 'Moxie.xap',
        multipart_params: {
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
                    var src = BASE_URL + "/uploads/logo/" + file.target_name;
                    $("#img-pic").attr("src", src);
                });
            },
            Error: function (up, err) {
                document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
                console.log(err);
            }
        }
    });


    uploader.init();
});


