/**
 * Created by patrick on 15/8/24.
 */
window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    pad.addEventListener('keydown',function(e){
        if(e.keyCode===9){
            var start = this.selectionStart;
            var end= this.selectionEnd;

            var target= e.target;
            var value=target.value;

            target.value=value.substring(0,start)+"\t"
                +value.substring(end);
            e.preventDefault();
        }
    });

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue=markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur=function(){
      if(previousMarkdownValue!=pad.value){
          return true;
      }

      return false;
    };


    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown()
        }
    },1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
};