const StateKey = 'lastDone_chores';

const chores = JSON.parse( localStorage.getItem( StateKey ) ) ?? [
  { label: 'Kitchen Chair Covers', lastDone: Date.now() },
  { label: 'Couch Covers', lastDone: Date.now() - 1000000000 },
  { label: 'Kitchen Ruggables', lastDone: Date.now() - 2000000000 },
  { label: 'Front Room Ruggable', lastDone: Date.now() - 3000000000 },
  { label: 'Living Room Ruggable', lastDone: Date.now() - 4000000000 },
  { label: 'JBL Bedding', lastDone: Date.now() - 5000000000 },
  { label: 'JBL Ruggable', lastDone: Date.now() - 5500000000 },
  { label: 'Olivia Bedding', lastDone: Date.now() - 6000000000 },
  { label: 'Olivia Ruggable' },
];

const thead = document.createElement( 'thead' );
thead.innerHTML = '<tr><th>Last Done</th><th>Chore</th></tr>';

const tbody = document.createElement( 'tbody' );

chores.forEach( chore => {
  const lastDoneTD = document.createElement( 'td' );

  if ( chore.lastDone ) {
    const lastDone = new Date( chore.lastDone );
    const MillisecondPerDay = 1000 * 60 * 60 * 24;
    const daysAgo = ( Date.now() - lastDone ) / MillisecondPerDay;

    const red = Math.min( 256, 7 * daysAgo );
    const green = 7 * 256 / Math.max( 0.01, daysAgo );

    lastDoneTD.style.background = `rgb( ${ red }, ${ green }, 0 )`;
    lastDoneTD.innerText = lastDone.toLocaleDateString();
  }
  else {
    lastDoneTD.style.background = 'red';
    lastDoneTD.innerText = 'Never!';
  }

  const labelTD = document.createElement( 'td' );
  labelTD.contentEditable = true;
  labelTD.innerText = chore.label;
  labelTD.chore = chore;

  const row = document.createElement( 'tr' );
  row.appendChild( lastDoneTD );
  row.appendChild( labelTD );
  tbody.appendChild( row );
} );

const table = document.createElement( 'table' );
table.appendChild( thead );
table.appendChild( tbody );
document.body.appendChild( table );

// Keep chores model in sync with edited table
table.addEventListener( 'input', e => {
  e.target.chore.label = e.target.innerText;

  localStorage.setItem( StateKey, JSON.stringify( chores ) );
} );
