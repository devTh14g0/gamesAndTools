const vagancys=[]

function vagancyList() {
  const vagancysNotext=vagancys.reduce(function(finalText,vagancys,index){
   finalText = index + ". "
   finalText+=  vagancys.name;
   finalText+= "(" + vagancys.candidates.length + "cadidates)\n"
   return finaltext
  },"")
  alert(vagancysNotext)
}
function VagancyNew() {
  const name=prompt("say the name to the vagancy")
  const description=prompt("say the descripition to the vagancy")
  const limiteDate =prompt("say the limite date dd /mm/aaaa to the vagancy")

  const confirm=confirm("do you want create a new vagancy with these informations" + 
  "name:" + 
  name + 
  "\nDescription:" + 
  description +
  "\nLimiteDate:" + 
  limiteDate)

  if(confirm) {
    const newVagancy= {
      name,description,limiteDate,candidates: [] 
    }
    vagancys.push(newVagancy)
    alert("new vagancy created")
  }
}
function showVagancy() {
  const index=prompt("say the index of the vagancy what you want show")
  const vagancy=vagancys[index]

  const NoNameCandidates=vagancy.candidates.reduce(function(finalText,
    cadidate){
      return finalText + "\n - " +
      candidate
    },
    "")
    alert("vagancy n" + index + "\nName:" + vagancy.name + "\nDescription:" + vagancy.description + "limite Date:" + limiteDate + "\nCadidates quantity:" + vagancy.candidates.length + "\nCandidates subscribed:"+ NoNameCandidates)
}
function SubscribeCanditite() {
  const candidate=prompt("shapeless the name of candidate")
  const index=prompt("shapeless the vagancy index what the candidate want to subscribe ")
  const vagancy=vagancys[index]
  const confirm=confirm("do you want to subscribe the candidate:" + candidate + "in the vagancy" + index + "\n?" + "name:" + vagancy.name + 
  "\nDescription:"+
  vagancy.description +
  "\nLimite date:" + 
  vagancy.limiteDate)
    if (confirm) {
      vagancy.candidates.push(candidate)
      alert("registration completed")
    }  
}
function Vagancydelete() {
  const index=prompt("shapeless the vagancy what you want delete")
  const vagancy=vagancys[index]

  const confirm=confirm("do you really want delete the vagancy" +
  index + "\n?" + 
  "name:" + vagancy.name + "\ndescripition:" + vagancy.description + "\nLimite Date:" + vagancy.limiteDate)

  if(confirm) {
    vagancy.splice(index,1)
    alert("vagancy deleted with sucess")
  }
  
}
function showMain() {
  const option =prompt(" vagancy job system" + "choose some option" +
  "\n1.vagancy list available" +
  "\n2.create a new vagancy"+
  "\n3.see a vagancy" +
  "\n4.subscribe a candidate" +
  "\n5.Delete vagancy" + 
  "\n6.go out")

  return option 
}

function execute() {
  let option=""

  do {
    option=showMain()

    switch (option) {
      case "1":
        vagancyList()
        break;
      case "2":
        newVagancy()
        break
      case "3":
        showVagancy()
      break
      case "4":
        SubscribeCanditite()
      break
      case "5":Vagancydelete()
      break
      case "6":
        alert("leaving")
        default:
          alert("invalited option,please,choose some option in the form")
    }
  }while(option !=="6")
}
execute()