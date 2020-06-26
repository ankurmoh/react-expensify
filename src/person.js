const isAdult = (x) => {
    if (x<18)
    {
        return false;
    }
    return true;
}

const canDrink = (x) => {
    if(x<21)
    {
        return false;
    }
    return true;
}

const isSenior = (x) => {
    if(x<65) {
        return false
    }
    return true;
}
export default isSenior;
export {isAdult, canDrink};