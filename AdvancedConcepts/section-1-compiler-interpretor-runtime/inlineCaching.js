
const anand = {
    firstName :'Anand',
    lastName: 'Ujjwal'
}
const fullName = (person)=>{
    return `fullName : ${person.fullName} ${person.lastName}`
};

fullName(anand);
fullName(anand);
fullName(anand);
fullName(anand);


/*
fullName(anand); cached to `fullName : Anand Ujjwal`
*/


