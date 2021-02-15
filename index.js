let modules = new Map()
function propertyParse(str,m){

  let module;
  if(m){
    module = m;
  }else if(modules.get(str.split(" ")[0])){
   module = modules.get(str.split(" ")[0])
 }else if(modules.get(str.split("->")[0])){
   module = modules.get(str.split("->")[0])
 }
 
 if(typeof module == 'object'){
   let p = str.split("->")[1]
   p = p.split(" ")[0]
   propertyParse(str.split("->").slice(1).join("->"),module[p])
 }
 
 if(typeof module == 'function'){
   return module(str.split(" ").slice(1).join().split(","))
 }
}
module.exports = (code) => {
  code = code.split("\n")
  code.forEach(str => {
    let arr = str.split(" ")
    if(arr[0] == "import"){
      let mname = arr.slice(1).join().split("/")
      mname = mname[mname.length - 1]
      if(mname.endsWith(".js")){
        mname = mname.split("").reverse().slice(3).reverse().join("")
      }
      modules.set(mname,require(arr.slice(1).join()))
    }
    if(modules.get(str.split(" ")[0]) || modules.get(str.split("->")[0])){
      propertyParse(str)
    }
    
  })
}