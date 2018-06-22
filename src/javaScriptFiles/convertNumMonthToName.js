

const convertNumMonthToName =  (number) => {
    switch (number){
        case 1:
        return 'תשרי';
        case 2:
        return 'חשוון';
        case 3:
        return 'כסלו';
        case 4:
        return 'טבת';
        case 5:
        return 'שבט';
        case 6:
        return 'אדר-א';
        case 7:
        return 'אדר-ב';
        case 8:
        return 'ניסן';
        case 9:
        return 'אייר';
        case 10:
        return 'סיוון';
        case 11:
        return 'תמוז';
        case 12:
        return 'אב';
        case 13:
        return 'אלול';
        default :
        return number;
    }
}


export default convertNumMonthToName;