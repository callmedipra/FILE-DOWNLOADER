let inputfield=document.querySelector("input");
let downloadbtn=document.querySelector("button");

downloadbtn.addEventListener("click",(e)=>{
    e.preventDefault(); //preventing form from submitting.
    downloadbtn.innerText="Downloading file...";
    fetchfile(inputfield.value);
    inputfield.innerText="";
});

function fetchfile(url){
    //fetching file and returing response as blob.
    fetch(url).then(res=>res.blob()).then(file=>{

        //URL.createObjectURL creates a url of passed object.
        let temporaryUrl= URL.createObjectURL(file);

        //creating a <a> tag and storing it inside the aTag.
        let aTag=document.createElement("a");

        //passing temporaryURl as href value of <a> tag.
        aTag.href=temporaryUrl;

        //passing file last name and extension as download value of <a> tag.
        aTag.download=url.replace(/^.*[\\\/]/, '');

        //adding <a> tag inside the body
        document.body.appendChild(aTag);
        
        aTag.click(); //clicking <a> tag so the file gets download.
        aTag.remove(); //removing <a> tag once file gets download.

        URL.revokeObjectURL(temporaryUrl);//removing temporaryurl form the document.

        downloadbtn.innerText="Download File";
    }).catch(()=>{
        //catch method will get called if some errors occur.
        downloadbtn.innerText="Download File";
        alert("Failed to download file!");
    })
}
