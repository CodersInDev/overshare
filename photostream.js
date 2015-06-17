
var currentFile;

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
     var files = e.originalEvent.dataTransfer.files;
     currentFile = files[0];
     previewFiles(files)
     //Do upload stuff here
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


// if(!file.type.match(/image.*/))

function previewFiles(fileArray) {
  for (var i = 0; i < fileArray.length; i++) {
    var file = fileArray[i];
    
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
}

$("#file").on("change", function(){
	currentFile = $("#file").get(0).files[0]
	previewFiles([currentFile])
})

$("#uploadForm").submit(function(e){
	e.preventDefault();
	uploadFile()
	console.log("submit")
})


 function uploadFile() {
    var fd = new FormData();
    fd.append("filename", $("#fileName").val());
    fd.append("description", $("#fileDesc").val());
    fd.append("image", currentFile);
    fd.append("id", randomID())
    console.log(fd)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");
    xhr.send(fd);
}

function randomID(){
return Math.random().toString().split(".")[1]
}
