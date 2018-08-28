export function offStyleH(y, row, th) { //Official Style Header
	switch (y){
	  case 0:
	    th.colSpan = 2;
	    th.innerHTML = 'Name';
	    break;
	  case 1:
	    th.title = 'Initial Price';
	    th.innerHTML = 'Price';
	    break;
	  case 2:
	    th.title = 'Damage';
	    th.innerHTML = 'Damage';
	    break;
	  case 3:
	    th.title = 'Penetration Value';
	    th.innerHTML = 'Armor Pen';
	    break;
	  case 4:
	    th.title = 'Projectile speed (m/s)';
	    th.innerHTML = 'Speed';
	    break;
	  case 5:
	    th.title = 'Richochet Percentage / Chance';
	    th.innerHTML = 'Richochet %';
	    break;
	  case 6:
	    th.title = 'Fragmentaiton Percentage / Chance';
	    th.innerHTML = 'Frag %';
	    break;
	  case 8:
	    th.title = 'Usefulness Meta Value';
	    th.innerHTML = 'Usefullness';
	    break;
	  default:
	    th.innerHTML = row[y];
	}
}

export function offStyleR(y, row, td) { //Official Style Row
	switch (y) {
	  case 0:
	    td.colSpan = 2;
	    td.title = row[y];
	    let name = nameClean(row[y]);
	    td.innerHTML = '<a target="_blank" href="https://escapefromtarkov.gamepedia.com/'+name+'">'+name+'</a>'; //Swap Item to row 1
	    break;
	  case 1:
	    td.innerHTML = row[y] + '₽';
	    break;
	  default:
	    td.innerHTML = row[y];
	}
}

export function uOffStyleH(y, row, th) { //Unofficial Style Header
	switch (y){
	  case 0:
	    th.innerHTML = 'Name';
	    th.colSpan = 2;
	    break;
	  case 5:
	    th.title = 'Armor Penetration Power';
	    th.innerHTML = 'Penetration';
	    break;
	  case 7:
	    th.title = 'Armor Damage';
	    th.innerHTML = 'Armor Dmg';
	    break;
	  case 9:
	    th.title = 'Tracer Round';
	    th.innerHTML = 'Tracer';
	    break;
	  case 10:
	    th.innerHTML = 'Misfire Chance';
	    break;
	  default:
	    th.innerHTML = row[y];
	}
}

export function uOffStyleR(y, row, td) { //Unofficial Style Row
	switch (y) {
	  case 0:
	    td.colSpan = 2;
	    td.title = row[1] + ' / ' + row[2];
	    td.innerHTML = '<a target="_blank" href="https://escapefromtarkov.gamepedia.com/'+row[y]+'">'+row[y]+'</a>';
	    break;
	  case 5:
	    td.title ='Armor Penetration Power';
	    td.innerHTML = row[y] + ' <span class="alert-info" title="Max Armor Penetration Class">(' + row[6] + ')</span>'+
	      ' <span class="alert-warning" title="Penetration Power Deveation">' + row[11] + '</span>';
	    break;
	  case 9:
	    if (row[y] == 'TRUE') {
	      td.className = 'success';
	      td.innerHTML = '✓';
	      break;
	    } else {
	      td.className = 'danger';
	      td.innerHTML = '<b>X</b>';
	      break;
	    }
	  default:
	    td.innerHTML = row[y];
	}

}

export function nameClean(name) {

  name = name.replace(/_/gi,' ');

  switch (name.charAt(0)) {
    case '3':
      name = "." + name;
      break;
    case '5':
    case '7':
      name = name.charAt(0) + "." + name.slice(1);
      if (name.includes('tt') == true) { name = name.replace('tt', 'mm TT'); } else { name = name.replace(' ', ' mm '); }
      break;
    case '9':
      if (name.includes('pm') == true) { name = name.replace('pm', ' mm PM'); } else { name = name.replace(' ', ' mm '); }
    default:
  }

  return name;
}