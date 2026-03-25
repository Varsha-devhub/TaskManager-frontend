export const checkStrength=(pwd)=>{
    let score=0;
    if(pwd.length>=6) score++;
    if(/[A-Z]/.test(pwd)) score++;
    if(/[0-9]/.test(pwd)) score++;
    if(/[^A-Za-z0-9]/.test(pwd)) score++;

    if(score<=1) return "Weak";
    if(score===2 || score===3) return "Medium";
    return"Strong";
}