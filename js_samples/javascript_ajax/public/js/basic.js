/**
 * Created by patrick on 15/10/1.
 */
function createXHR(){
    return new XMLHttpRequest();
}

function createXHR2(){
    var xhr=null;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        try{
            xhr=new ActiveXObject('Msxml2.XMLHTTP');
        }catch(e){
           try{
               xhr=new ActiveXObject('Microsoft.XMLHTTP');
           }catch(e){}
        }
    }

    return xhr;
}