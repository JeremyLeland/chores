//
// State
//
const StateKey = 'lastDone_chores';

function loadState() {
  return JSON.parse( localStorage.getItem( StateKey ) );
}

function saveState() {
  localStorage.setItem( StateKey, JSON.stringify( items ) );
}

const items = loadState() ?? {
  [ crypto.randomUUID() ]: { lastDone: '2026-04-05', label: 'Kitchen Chair Covers' },
  [ crypto.randomUUID() ]: { lastDone: '2026-04-01', label: 'Couch Covers' },
}; /*[
  { label: 'Kitchen Chair Covers' },
  { label: 'Couch Covers' },
  { label: 'Kitchen Ruggables' },
  { label: 'Front Room Ruggable' },
  { label: 'Living Room Ruggable' },
  { label: 'JBL Bedding' },
  { label: 'JBL Ruggable' },
  { label: 'Olivia Bedding' },
  { label: 'Olivia Ruggable' },
];*/

//
// Table
//
const table = document.createElement( 'table' );
document.body.appendChild( table );

function update() {
  table.innerHTML = getInnerHtml( items );
  saveState();
}
update();

table.addEventListener( 'change', e => {
  if ( e.target.tagName == 'INPUT' ) {
    items[ e.target.dataset.id ].lastDone = e.target.value;
    update();
  }
} );

table.addEventListener( 'focusout', e => {
  if ( e.target.tagName == 'TD' ) {
    items[ e.target.dataset.id ].label = e.target.innerText;
    update();
  }
} );

//
// Build table from items
//
function getInnerHtml( items ) {
  let html = '<thead><tr><th>When</th><th>What</th></tr></thead>';

  html += '<tbody>';

  const sorted = Object.entries( items ).sort( ( [ , a ], [ , b ] ) => a.lastDone.localeCompare( b.lastDone ) );

  sorted.forEach( ( [ id, item ] ) => {
    html += `<tr><td><input type="date" style="background: ${ getColorForDate( item.lastDone ) }" value="${ item.lastDone }" data-id="${ id }"></td>`;

    html += `<td contenteditable data-id="${ id }">${ item.label }</td></tr>`;
  } );

  html += '</tbody>';

  return html;
}

function getColorForDate( date ) {
  if ( date ) {
    const lastDone = new Date( date );
    const MillisecondPerDay = 1000 * 60 * 60 * 24;
    const daysAgo = ( Date.now() - lastDone ) / MillisecondPerDay;

    const red = Math.min( 256, 7 * daysAgo );
    const green = 7 * 256 / Math.max( 0.01, daysAgo );

    return `rgb( ${ red }, ${ green }, 0 )`;
  }
  else {
    return 'red';
  }
}