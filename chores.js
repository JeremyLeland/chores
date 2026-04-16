const StateKey = 'lastDone_chores';

// TODO: Would it make more sense to have dictionary of label to date?
//        - what if we try to set two labels to the same? (could auto append a 2 or something)

const chores = JSON.parse( localStorage.getItem( StateKey ) ) ?? [
  { label: 'Kitchen Chair Covers' },
  { label: 'Couch Covers' },
  { label: 'Kitchen Ruggables' },
  { label: 'Front Room Ruggable' },
  { label: 'Living Room Ruggable' },
  { label: 'JBL Bedding' },
  { label: 'JBL Ruggable' },
  { label: 'Olivia Bedding' },
  { label: 'Olivia Ruggable' },
];

const thead = document.createElement( 'thead' );
thead.innerHTML = '<tr><th>Last Done</th><th>Chore</th></tr>';

const tbody = document.createElement( 'tbody' );

chores.forEach( chore => {
  const lastDoneTD = document.createElement( 'td' );

  const lastDoneInput = document.createElement( 'input' );
  lastDoneInput.type = 'date';
  lastDoneTD.appendChild( lastDoneInput );

  updateLastDone( lastDoneInput, chore );

  lastDoneInput.addEventListener( 'change', _ => {
    chore.lastDone = lastDoneInput.value;
    updateLastDone( lastDoneInput, chore );
    saveState();
  } );

  const labelTD = document.createElement( 'td' );
  labelTD.contentEditable = true;
  labelTD.innerText = chore.label;
  labelTD.addEventListener( 'input', _ => {
    chore.label = labelTD.innerText;
    saveState();
  } );

  const row = document.createElement( 'tr' );
  row.appendChild( lastDoneTD );
  row.appendChild( labelTD );
  tbody.appendChild( row );
} );

const table = document.createElement( 'table' );
table.appendChild( thead );
table.appendChild( tbody );
document.body.appendChild( table );

function updateLastDone( input, chore ) {
  if ( chore.lastDone ) {
    const lastDone = new Date( chore.lastDone );
    const MillisecondPerDay = 1000 * 60 * 60 * 24;
    const daysAgo = ( Date.now() - lastDone ) / MillisecondPerDay;

    const red = Math.min( 256, 7 * daysAgo );
    const green = 7 * 256 / Math.max( 0.01, daysAgo );

    input.style.background = `rgb( ${ red }, ${ green }, 0 )`;
    input.value = chore.lastDone
  }
  else {
    input.style.background = 'red';
    // input.innerText = 'Never!';
  }
}

function saveState() {
  localStorage.setItem( StateKey, JSON.stringify( chores ) );
}