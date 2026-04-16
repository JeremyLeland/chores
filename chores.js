const chores = [
  { label: 'Kitchen Chair Covers', lastDone: Date.now() },
  { label: 'Couch Covers', lastDone: Date.now() - 1000000000 },
  { label: 'Kitchen Ruggables', lastDone: Date.now() - 2000000000 },
  { label: 'Front Room Ruggable', lastDone: Date.now() - 3000000000 },
  { label: 'Living Room Ruggable', lastDone: Date.now() - 4000000000 },
];

const thead = document.createElement( 'thead' );
thead.innerHTML = '<tr><th>Last Done</th><th>Chore</th></tr>';

const tbody = document.createElement( 'tbody' );

chores.forEach( chore => {
  const lastDone = new Date( chore.lastDone );
  const daysAgo = ( Date.now() - lastDone ) / 86400000;

  const red = Math.min( 256, 7 * daysAgo );
  const green = 7 * 256 / Math.max( 0.01, daysAgo );

  const lastDoneTD = document.createElement( 'td' );
  lastDoneTD.style.background = `rgb( ${ red }, ${ green }, 0 )`;
  lastDoneTD.innerText = lastDone.toLocaleDateString();

  const labelTD = document.createElement( 'td' );
  labelTD.contentEditable = true;
  labelTD.innerText = chore.label;

  const row = document.createElement( 'tr' );
  row.appendChild( lastDoneTD );
  row.appendChild( labelTD );
  tbody.appendChild( row );
} );

const table = document.createElement( 'table' );
table.appendChild( thead );
table.appendChild( tbody );
document.body.appendChild( table );
