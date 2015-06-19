var currentFile;
var currentStreamArray = [];

// $("document").ready(appendPhotos())

// Make upload area drag and droppable
var uploadArea = $("#uploadArea");
uploadArea.on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
});
uploadArea.on('dragover', function (e) {
     e.stopPropagation();
     e.preventDefault();
});
uploadArea.on('drop', function (e) {
    e.preventDefault();
    var fileNo = 0;
    var files = e.originalEvent.dataTransfer.files;
    if(!files[0].type.match(/image.*/)) {
    	fileNo += 1;
     	alert("Only images can be overshared!");
    } else {
	    currentFile = files[0];
	    previewFiles(currentFile);
	}
});


// Prevent drag and drop on whole page
$(document).on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function (e) {
  e.stopPropagation();
  e.preventDefault();
});
$(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
});


function previewFiles(file) {
    var img = document.createElement("img");
    img.classList.add("thumb");
    img.file = file;
    $("#previewArea").html(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) {
    	return function(e) {
    		aImg.src = e.target.result;
    	};
    })(img);
    reader.readAsDataURL(file);
  }


$("#file").on("change", function(){
	currentFile = $("#file").get(0).files[0];
	previewFiles(currentFile);
});

$("#uploadForm").submit(function(e){
	e.preventDefault();
	console.log("submit");
	get_signed_request(currentFile);
});

function get_signed_request(file){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/sign_s3?file_name="+randomID()+"&file_type="+file.type);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        upload_file(file, xhr.responseText);
      }
      else{
        alert("Could not get signed URL.");
      }
    }
  };
  xhr.send();
}

function upload_file(file, data){
	console.log(data);
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", data);
  xhr.setRequestHeader('x-amz-acl', 'public-read');
  xhr.onerror = function() {
      alert("Could not upload file.");
  };
  console.log(xhr) ;
  xhr.send(file);
}

//  function uploadFile() {
//     var fd = new FormData();
//     fd.append("filename", $("#fileName").val());
//     fd.append("description", $("#fileDesc").val());
//     fd.append("image", currentFile);
//     fd.append("id", randomID());
//     fd.append("userId", //TODO send username)
//     console.log(fd)
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "/upload");
//     xhr.send(fd);
// }

function randomID(){
	return Math.random().toString().split(".")[1];
}

// get photos, add them to DOM
function getAllPhotos(){
	$.get("/view", function(res){
		$("#photoList").prepend(res);
	});
}
