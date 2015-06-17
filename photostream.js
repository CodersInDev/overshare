
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
     alert('dropped')
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
    $("#previewArea").append(img); 
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { 
    	return function(e) { 
    		aImg.src = e.target.result; 
    	}; 
    })(img);
    reader.readAsDataURL(file);
  }
}

$("#uploadForm").submit(function(){
	//post to server
})

function uploadFile() {
	// send files to server
}