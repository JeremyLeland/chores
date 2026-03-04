const chores = [
  { label: 'Kitchen Chair Covers', lastDone: Date.now() },
  { label: 'Couch Covers', lastDone: Date.now() - 1000000000 },
  { label: 'Kitchen Ruggables', lastDone: Date.now() - 2000000000 },
  { label: 'Front Room Ruggable', lastDone: Date.now() - 3000000000 },
  { label: 'Living Room Ruggable', lastDone: Date.now() - 4000000000 },
];

let html = '<table><thead><tr><th>Last Done</th><th>Chore</th></tr></thead><tbody>';

chores.forEach( chore => {
  const lastDone = new Date( chore.lastDone );

  const daysAgo = ( Date.now() - lastDone ) / 86400000;

  const red = Math.min( 256, 7 * daysAgo );
  const green = 7 * 256 / Math.max( 0.01, daysAgo );

  html += `<tr><td style="background: rgb( ${ red }, ${ green }, 0 )">${ lastDone.toLocaleDateString() }</td><td>${ chore.label }</td></tr>`;
} );

html += '</tbody></table>';

const table = document.getElementById( 'chores' ).innerHTML = html;