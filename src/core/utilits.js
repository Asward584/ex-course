export function capitalize(string){
if (typeof string === 'string' ){
string = string.charAt(0).toLocaleUpperCase() + string.slice(1)
}
else {
    string = ''
}
return string

}