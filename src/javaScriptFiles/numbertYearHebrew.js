
 const numberYearHebrew = (number) => {
    switch (number) {
    case 5773:
      return 'תשע"ג';
    case 5774:
      return 'תשע"ד';
    case 5775:
      return 'תשע"ה';
    case 5776:
      return 'תשע"ו';
    case 5777:
      return 'תשע"ז';
    case 5778:
      return 'תשע"ח';
    case 5779:
     return 'תשע"ט';
    case 5780:
     return 'תש"פ';
    case 5781:
      return 'תשפ"א';
    case 5782:
     return 'תשפ"ב' ;
    case 5783:
     return 'תשפ"ג';
    case 5784:
     return 'תשפ"ד';
    case 5785:
     return 'תשפ"ה';       
    default:
     return number;
    }
}

export default numberYearHebrew;