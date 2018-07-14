function darkmode() {
  if (!document.getElementById('container').style.filter) {
    document.getElementById('container').style.filter = 'grayscale(1) invert(1)';
    document.getElementById('boon-300').style.backgroundColor = '#000';
  } else {
    document.getElementById('container').style.filter = '';
    document.getElementById('boon-300').style.backgroundColor = '';
  }
}