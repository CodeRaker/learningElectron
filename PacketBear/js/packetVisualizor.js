// Depends upon to be included as well: <script src="js/materialize.js"></script>

const ul = document.querySelector('ul');

$('.collapsible').collapsible();
$('.collapsible.expandable').collapsible({
  accordion: false
});

//print packet data from python
ipcRenderer.on('results', function(event, results){
    const pyout = results.split(',|,'); 
    ul.className = 'collapsible collapsible-accordion';
    const li = document.createElement('li');
    const divHeader = document.createElement('div');
    divHeader.className = 'collapsible-header';
    divHeader.tabIndex = 0;
    const i = document.createElement('i')
    i.className = 'material-icons'
    const iText = document.createTextNode('filter_drama');
    i.appendChild(iText);
    const divHeaderText = document.createTextNode(pyout[0]);
    divHeader.appendChild(divHeaderText);
    //const itemText = document.createTextNode(results);
    const divBody = document.createElement('div');
    divBody.className = 'collapsible-body'
    //const span = document.createElement('span');
    const span = document.createElement('p');
    const spanText = document.createTextNode(pyout[1]);

    divHeader.appendChild(i);
    li.appendChild(divHeader);
    span.appendChild(spanText);
    divBody.appendChild(span);
    li.appendChild(divBody);
    ul.appendChild(li);
});