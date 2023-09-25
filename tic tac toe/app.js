const cellboxs = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winmsg=document.getElementById("winingmessage");
const winmsgtext=document.querySelector("[data-wining-message-text]")
const reset=document.getElementById("reset");
let circleturn
let x_class="x";
let o_class="o";
const wincomb=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]


startgame();

reset.addEventListener("click",startgame);

function startgame(){
    circleturn=false;
   
cellboxs.forEach(function(cellbox){
    cellbox.classList.remove(x_class);
    cellbox.classList.remove(o_class);
    cellbox.removeEventListener("click",handleclick)
    cellbox.addEventListener("click",handleclick,{once:true})

})
setboardhoverclass();
winmsg.classList.remove("show");
}


function handleclick(e){
    const cell=e.target;
    const currentclass=circleturn?o_class:x_class;

    placemark(cell,currentclass)
    if(checkwin(currentclass)){
        endgame(false)
    }else if(isdraw()){
        endgame(true)
    }else{
        swapturn()
        setboardhoverclass()
    }  
}
 function isdraw(){
    return [...cellboxs].every(cell =>{
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
 }

function placemark(cell,currentclass){
    cell.classList.add(currentclass)
}

function swapturn(){
    circleturn=!circleturn;
}

function setboardhoverclass(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if(circleturn){
        board.classList.add(o_class)
    }else{
        board.classList.add(x_class);
    }
}

function checkwin(currentclass){
    return wincomb.some(function(combination){
        return combination.every(function(index){
            return cellboxs[index].classList.contains(currentclass)
        
        })
    })

}

function endgame(draw){
    if(draw){
        winmsgtext.innerText="DRAW"
    }else{
        winmsgtext.innerText=`${circleturn ? "o's":"x's"} WINS!`
    }
    winmsg.classList.add("show");
}